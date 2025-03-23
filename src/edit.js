import { addFilter } from '@wordpress/hooks';
import { createElement, Fragment } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

console.log('🧠 edit.js is geladen');

// 🧩 1. Live preview injectie
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

// 🧩 2. Inspector Controls (zijpaneel met inputvelden)
const withCopyrightInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, clientId } = props;

		if (name !== 'core/paragraph') return <BlockEdit {...props} />;

		const binding = attributes?.metadata?.bindings?.content;
		if (!binding || binding.source !== 'copyright-paragraph/copyright') {
			return <BlockEdit {...props} />;
		}

		const args = binding.args || {};
		const startYear = args.startYear || '';
		const customName = args.customName || '';

		const { updateBlockAttributes } = useDispatch('core/block-editor');

		const updateArgs = (field, value) => {
			updateBlockAttributes(clientId, {
				metadata: {
					...attributes.metadata,
					bindings: {
						...attributes.metadata.bindings,
						content: {
							...attributes.metadata.bindings.content,
							args: {
								...args,
								[field]: value,
							},
						},
					},
				},
			});
		};

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__('Copyright Settings', 'copyright-paragraph')} initialOpen={true}>
						<TextControl
							label={__('Custom Name', 'copyright-paragraph')}
							value={customName}
							onChange={(value) => updateArgs('customName', value)}
							placeholder={__('Leave empty to use site title', 'copyright-paragraph')}
						/>
						<TextControl
							label={__('Start Year', 'copyright-paragraph')}
							type="number"
							inputMode="numeric"
							pattern="[0-9]*"
							value={startYear}
							onChange={(value) => {
								const numeric = value.replace(/\D/g, ''); // verwijder niet-cijfers
								updateArgs('startYear', numeric);
							}}
							placeholder={new Date().getFullYear()}
							min="1900"
							max={new Date().getFullYear()}
						/>

					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withCopyrightInspectorControls');

addFilter(
	'editor.BlockEdit',
	'copyright-paragraph/inspector-controls',
	withCopyrightInspectorControls
);
