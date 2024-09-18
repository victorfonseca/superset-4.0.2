import { ChartProps, TimeseriesDataRecord } from '@superset-ui/core';

export default async function transformProps(chartProps: ChartProps) {
  /**
   * This function is called after a successful response has been
   * received from the chart data endpoint, and is used to transform
   * the incoming data prior to being sent to the Visualization.
   *
   * The transformProps function is also quite useful to return
   * additional/modified props to your data viz component. The formData
   * can also be accessed from your SupersetPluginChartHelloWorld.tsx file, but
   * doing supplying custom props here is often handy for integrating third
   * party libraries that rely on specific props.
   *
   * A description of properties in `chartProps`:
   * - `height`, `width`: the height/width of the DOM element in which
   *   the chart is located
   * - `formData`: the chart data request payload that was sent to the
   *   backend.
   * - `queriesData`: the chart data response payload that was received
   *   from the backend. Some notable properties of `queriesData`:
   *   - `data`: an array with data, each row with an object mapping
   *     the column/alias to its value. Example:
   *     `[{ col1: 'abc', metric1: 10 }, { col1: 'xyz', metric1: 20 }]`
   *   - `rowcount`: the number of rows in `data`
   *   - `query`: the query that was issued.
   *
   * Please note: the transformProps function gets cached when the
   * application loads. When making changes to the `transformProps`
   * function during development with hot reloading, changes won't
   * be seen until restarting the development server.
   */
  const { width, height, formData, queriesData } = chartProps;
  const { mark } = formData;

  const data = queriesData[0].data as TimeseriesDataRecord[];

  console.log('Transform Props:');
  console.log(formData);
  console.log(queriesData);

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    const result = await response.json();
    console.log('Fetch result', result);
  } catch (e) {
    console.log('Fetch error', e);
  }

  return {
    width,
    height,
    data,
    // and now your control data, manipulated as needed, and passed through as props!
    mark,
  };
}
