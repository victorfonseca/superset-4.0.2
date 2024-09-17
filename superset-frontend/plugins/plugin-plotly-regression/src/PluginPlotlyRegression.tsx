import { styled } from '@superset-ui/core';
import React from 'react';
import Plot from 'react-plotly.js';
import {
  PluginPlotlyRegressionProps,
  PluginPlotlyRegressionStylesProps,
} from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<PluginPlotlyRegressionStylesProps>`
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function PluginPlotlyRegression(
  props: PluginPlotlyRegressionProps,
) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { height, width } = props;
  // const rootElem = createRef<HTMLDivElement>();

  return (
    <Styles height={height} width={width}>
      <Plot
        data={[
          {
            x: [1, 2, 3, 4],
            y: [2, 6, 3, 5],
            type: 'scatter',
            mode: 'lines+markers',
            // eslint-disable-next-line theme-colors/no-literal-colors
            marker: { color: 'red' },
          },
          { type: 'bar', x: [1, 2, 3, 4], y: [2, 5, 3, 7] },
        ]}
        layout={{ autosize: true, title: 'A Fancy Plot' }}
        style={{ width: '100%', height: '100%' }}
      />
    </Styles>
  );
}
