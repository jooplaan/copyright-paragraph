import './variation.js';
import './edit.js';
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
    // Probeer startYear en customName uit metadata te halen als ze nog niet in sourceArgs zitten
    if (!sourceArgs || typeof sourceArgs.startYear === 'undefined' || typeof sourceArgs.customName === 'undefined') {
      try {
        const block = context?.block;
        const maybeArgs = block?.attributes?.metadata?.bindings?.content?.args;
        if (maybeArgs) {
          sourceArgs = {
            ...sourceArgs,
            ...maybeArgs,
          };
        }
      } catch (e) {
        console.warn("⛔ Can't deduct sourceArgs from block context:", e);
      }
    }

    const { getEntityRecord, getIsResolving } = select(coreDataStore);

    const isResolving = getIsResolving('root', 'site');
    if (isResolving) return {};

    const site = getEntityRecord('root', 'site');
    const siteTitle = site?.title || __('Site title', 'copyright-paragraph');

    const currentYear = new Date().getFullYear();
    const startYear = parseInt(sourceArgs?.startYear, 10);
    const customName = sourceArgs?.customName?.trim();

    const year =
      startYear && startYear < currentYear
        ? `${startYear} – ${currentYear}`
        : currentYear;

    const name = customName || siteTitle;

    return {
      content: `© ${year} ${name}`,
    };
  },
});

