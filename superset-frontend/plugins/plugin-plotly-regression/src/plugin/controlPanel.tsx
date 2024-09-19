import { ControlPanelConfig } from '@superset-ui/chart-controls';
import { t } from '@superset-ui/core';
import { dndXAxisControl } from 'packages/superset-ui-chart-controls/src/shared-controls/dndControls';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'regression_type',
            config: {
              type: 'SelectControl',
              label: t('Regression'),
              description: t('Select the type of regression to perform'),
              default: 'linear',
              choices: [
                ['linear', t('Linear')],
                ['polynomial', t('Polynomial')],
              ],
            },
          },
        ],
        [
          {
            name: 'polynomial_order',
            config: {
              type: 'SelectControl',
              label: t('Choose Polynomial order'),
              description: t('description'),
              visibility: ({ controls }) =>
                Boolean(controls?.regression_type.value === 'polynomial'),
              default: 'quadratic',
              choices: [
                ['quadratic', t('2nd order (Quadratic)')],
                ['cubic', t('3nd order (Cubic)')],
              ],
            },
          },
        ],
        ['x_axis'],
        [
          {
            name: 'y_axis',
            config: {
              ...dndXAxisControl,
              label: t('Y-Axis'),
              description: t('Dimension to use on the Y axis'),
            },
          },
        ],
        ['adhoc_filters'],
        ['row_limit'],
      ],
    },
  ],
};
export default config;
