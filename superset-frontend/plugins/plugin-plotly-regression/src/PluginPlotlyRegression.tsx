import { styled } from '@superset-ui/core';

import React from 'react';
import Plot from 'react-plotly.js';
import {
  PluginPlotlyRegressionProps,
  PluginPlotlyRegressionStylesProps,
} from './types';

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please check
// packages/superset-ui-core/src/style/index.tsx

const Styles = styled.div<PluginPlotlyRegressionStylesProps>`
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

export default function PluginPlotlyRegression(
  props: PluginPlotlyRegressionProps,
) {
  const { height, width, keywardData, regressionType } = props;
  // const rootElem = createRef<HTMLDivElement>();

  console.log('Regression type', regressionType);

  return (
    <Styles height={height} width={width}>
      <Plot
        data={keywardData}
        layout={{ autosize: true, title: 'Regression Plot' }}
        style={{ width: '100%', height: '100%' }}
      />
    </Styles>
  );
}
