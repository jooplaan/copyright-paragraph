import { addFilter } from '@wordpress/hooks';
import { createElement } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { RichText } from '@wordpress/block-editor';

const withCopyrightEditPreview = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes } = props;

		if (name !== 'core/paragraph') {
			return <BlockEdit {...props} />;
		}

		const binding = attributes?.metadata?.bindings?.content;
		if (!binding || binding.source !== 'copyright-paragraph/copyright') {
			return <BlockEdit {...props} />;
		}

		const args = binding.args || {};
		const startYear = parseInt(args.startYear, 10);
		const customName = args.customName?.trim();

		const currentYear = new Date().getFullYear();
		const year = startYear && startYear < currentYear
			 ? `${startYear} – ${currentYear}`
		 : currentYear;

		const siteTitle = useSelect((select) => {
			const site = select('core').getEntityRecord('root', 'site');
			return site?.title || __('Site Title', 'copyright-paragraph');
		}, []);

		const nameToUse = customName || siteTitle;
		const content = `© ${year} ${nameToUse}`;

		// Always show the preview (even when the block is selected)
		return (
			<div {...props}>
				<RichText
					tagName="p"
					value={content}
					readOnly
				/>
			</div>
		);
	};
}, 'withCopyrightEditPreview');

addFilter(
	'editor.BlockEdit',
	'copyright-paragraph/edit-preview',
	withCopyrightEditPreview
);
