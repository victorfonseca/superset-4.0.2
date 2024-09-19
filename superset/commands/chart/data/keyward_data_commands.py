from superset.commands.chart.data.get_data_command import ChartDataCommand
from superset.commands.chart.data.keyward.regression_data_command import KeywardRegressionChartDataCommand
from superset.common.query_context import QueryContext


def create_command(query_context: QueryContext):
    viz_type = query_context.form_data.get('viz_type', '')

    if not viz_type.startswith('keyward_'):
        return ChartDataCommand(query_context)

    # if viz_type == 'keyward_plotly_regression:
    return KeywardRegressionChartDataCommand(query_context)
