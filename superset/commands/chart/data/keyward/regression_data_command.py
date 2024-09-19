import logging
import requests
from typing import Any

from flask_babel import gettext as _

from flask import current_app

from superset.commands.chart.exceptions import (
    ChartDataCacheLoadError,
    ChartDataQueryFailedError,
)
from superset.common.query_context import QueryContext
from superset.exceptions import CacheLoadError
from superset.commands.chart.data.get_data_command import ChartDataCommand

logger = logging.getLogger(__name__)


class KeywardRegressionChartDataCommand(ChartDataCommand):
    def run(self, **kwargs: Any) -> dict[str, Any]:
        # caching is handled in query_context.get_df_payload
        # (also evals `force` property)
        cache_query_context = kwargs.get("cache", False)
        force_cached = kwargs.get("force_cached", False)

        try:
            payload = self._query_context.get_payload(
                cache_query_context=cache_query_context, force_cached=force_cached
            )

            if len(payload['queries'][0]['data']):
                endpoint = current_app.config["KEYWARD_REGRESSION_PLOT_API"]
                request_payload = _prepare_request_payload(self._query_context, payload)

                result = _call_remote_service(endpoint, request_payload)

                # Attach the service data
                payload['queries'][0]['keyward_data'] = result['data']
                # payload['queries'][0]['data'] = result['data']

        except CacheLoadError as ex:
            raise ChartDataCacheLoadError(ex.message) from ex

        # TODO: QueryContext should support SIP-40 style errors
        for query in payload["queries"]:
            if query.get("error"):
                raise ChartDataQueryFailedError(
                    _("Error: %(error)s", error=query["error"])
                )

        return_value = {
            "query_context": self._query_context,
            "queries": payload["queries"],
        }

        if cache_query_context:
            return_value.update(cache_key=payload["cache_key"])

        return return_value


def _prepare_request_payload(query_context: QueryContext, payload: dict):
    x_column = query_context.form_data.get('x_axis')
    y_column = query_context.form_data.get('y_axis')

    # Create the subsets
    x_subset = {str(i): v.get(x_column) for i, v in enumerate(payload['queries'][0]['data'])}
    y_subset = {str(i): v.get(y_column) for i, v in enumerate(payload['queries'][0]['data'])}

    return {
        'task_name': 'generate_regression_plot',
        'task_parameters': {
            'subset': {
                x_column: x_subset,
                y_column: y_subset,
            },
            'reg_x_col': x_column,
            'reg_y_col': y_column,
            'regression_type': _get_regression_type(query_context),
        }
    }


def _get_regression_type(query_context: QueryContext):
    regression_type = 'linear'

    if query_context.form_data.get('regression_type', 'linear') == 'polynomial':
        regression_type = query_context.form_data.get('polynomial_order', 'quadratic')

    return regression_type


def _call_remote_service(endpoint: str, request_payload: dict):
    logging.info(f"Endpoint: {endpoint}")
    logging.info(f"Request payload: {request_payload}")

    response = requests.post(endpoint, data=request_payload)
    return response.json()