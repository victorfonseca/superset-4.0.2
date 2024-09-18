import { ChartMetadata, ChartPlugin, t } from '@superset-ui/core';
import thumbnail from '../images/thumbnail.png';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';

export default class PluginPlotlyRegression extends ChartPlugin {
  /**
   * The constructor is used to pass relevant metadata and callbacks that get
   * registered in respective registries that are used throughout the library
   * and application. A more thorough description of each property is given in
   * the respective imported file.
   *
   * It is worth noting that `buildQuery` and is optional, and only needed for
   * advanced visualizations that require either post processing operations
   * (pivoting, rolling aggregations, sorting etc) or submitting multiple queries.
   */
  constructor() {
    const metadata = new ChartMetadata({
      description: 'Plotly Regression Chart Description',
      name: t('Plotly Regression Chart'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('../PluginPlotlyRegression'),
      metadata,
      transformProps,
    });
  }
}
