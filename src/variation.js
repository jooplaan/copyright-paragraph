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
        },
      },
    },
  },
  scope: ['inserter'],
  icon: 'admin-site-alt3',
});
