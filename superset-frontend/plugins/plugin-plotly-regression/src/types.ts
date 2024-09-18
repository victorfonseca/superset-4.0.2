import { QueryFormData } from '@superset-ui/core';

export interface PluginPlotlyRegressionStylesProps {
  height: number;
  width: number;
}

interface PluginPlotlyRegressionCustomizeProps {
  mark: boolean; // Example prop
}

export type PluginPlotlyRegressionQueryFormData = QueryFormData &
  PluginPlotlyRegressionStylesProps &
  PluginPlotlyRegressionCustomizeProps;

export type PluginPlotlyRegressionProps = PluginPlotlyRegressionStylesProps &
  PluginPlotlyRegressionCustomizeProps & {
    data: any; // add a typing for the real data
    // add typing here for the props you pass in from transformProps.ts!
  };
