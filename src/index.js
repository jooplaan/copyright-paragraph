import './variation.js';
import { createElement } from '@wordpress/element';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { store as coreDataStore } from '@wordpress/core-data';
import { registerBlockBindingsSource } from '@wordpress/blocks';

registerBlockBindingsSource({
  name: 'copyright-paragraph/copyright',
  label: __('Copyright Info', 'copyright-paragraph'),
  usesContext: ['postType', 'postId', 'post'],

  getValues({ select, context, sourceArgs }) {
  if (!sourceArgs || typeof sourceArgs.startYear === 'undefined') {
    try {
      const block = context?.block;
      const maybeArgs = block?.attributes?.metadata?.bindings?.content?.args;
      if (maybeArgs?.startYear) {
        sourceArgs = maybeArgs;
      }
    } catch (e) {
      console.warn('⛔ Can\'t deduct sourceArgs from block context:', e);
    }
  }

  const {
    getEntityRecord,
    getIsResolving,
  } = select(coreDataStore);

  const isResolving = getIsResolving('root', 'site');
  if (isResolving) return {};

  const site = getEntityRecord('root', 'site');
  const siteTitle = site?.title || __('Site title', 'copyright-paragraph');

  const currentYear = new Date().getFullYear();
  const startYear = parseInt(sourceArgs?.startYear, 10);

  const year =
    startYear && startYear < currentYear
      ? `${startYear} – ${currentYear}`
      : currentYear;

  return {
    content: `© ${year} ${siteTitle}`,
  };
},

});


