import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockVariation('core/paragraph', {
  name: 'copyright-paragraph',
  title: __('Copyright Text', 'copyright-paragraph'),
  description: __('Add © + current year + site title', 'copyright-paragraph'),
  attributes: {
    content: '',
    metadata: {
      bindings: {
        content: {
          source: 'copyright-paragraph/copyright',
          args: {
            startYear: new Date().getFullYear().toString(), // of bijv. '2000'
            customName: '', // leeg laten; dan wordt site title gebruikt
          },
        },
      },
    },
  },
  scope: ['inserter'],
  icon: 'admin-site-alt3',
});
