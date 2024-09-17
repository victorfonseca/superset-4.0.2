import { ControlPanelConfig } from '@superset-ui/chart-controls';
import { t } from '@superset-ui/core';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [['metric'], ['row_limit']],
    },
    {
      label: t('Customize'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'mark',
            config: {
              type: 'CheckboxControl',
              label: t('Change greeting'),
              renderTrigger: true,
              default: false,
              description: t('Change the greeting from Hello to Hi'),
            },
          },
        ],
      ],
    },
  ],
};
export default config;
