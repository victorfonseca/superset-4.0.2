import { QueryData, QueryFormData } from '@superset-ui/core';

export interface PluginPlotlyRegressionStylesProps {
  height: number;
  width: number;
}

export type PluginPlotlyRegressionQueryData = QueryData & {
  keyward_data: any;
};
interface PluginPlotlyRegressionCustomizeProps {
  regressionType: 'linear' | 'quadratic' | 'cubic';
}

export type PluginPlotlyRegressionQueryFormData = QueryFormData &
  PluginPlotlyRegressionStylesProps &
  PluginPlotlyRegressionCustomizeProps;

export type PluginPlotlyRegressionProps = PluginPlotlyRegressionStylesProps &
  PluginPlotlyRegressionCustomizeProps & {
    data: any; // add a typing for the real data
    keywardData: any;
  };
