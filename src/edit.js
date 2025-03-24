import { addFilter } from '@wordpress/hooks';
import { createElement, Fragment, useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	useBlockProps,
	InspectorControls,
	RichText
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const withCopyrightEnhancement = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, clientId } = props;

		if (name !== 'core/paragraph') return <BlockEdit {...props} />;

		const binding = attributes?.metadata?.bindings?.content;
		if (!binding || binding.source !== 'copyright-paragraph/copyright') {
			return <BlockEdit {...props} />;
		}

		const args = binding.args || {};
		const [customSymbol, setCustomSymbol] = useState(args.customSymbol || '©');
		const [customName, setCustomName] = useState(args.customName || '');
		const [startYear, setStartYear] = useState(args.startYear || '');

		const currentYear = new Date().getFullYear();
		const start = parseInt(startYear, 10);
		const year = start && start < currentYear ? `${start} – ${currentYear}` : currentYear;

		const siteTitle = useSelect((select) => {
			const site = select('core').getEntityRecord('root', 'site');
			return site?.title || __('Site Title', 'copyright-paragraph');
		}, []);

		const nameToUse = customName || siteTitle;
		const content = `${customSymbol} ${year} ${nameToUse}`;

		const { updateBlockAttributes } = useDispatch('core/block-editor');
		const updateArgs = (field, value) => {
			const newArgs = {
				customSymbol,
				customName,
				startYear,
				[field]: value,
			};

			// Update state
			if (field === 'customSymbol') setCustomSymbol(value);
			if (field === 'customName') setCustomName(value);
			if (field === 'startYear') setStartYear(value);

			updateBlockAttributes(clientId, {
				metadata: {
					...attributes.metadata,
					bindings: {
						...attributes.metadata.bindings,
						content: {
							...attributes.metadata.bindings.content,
							args: newArgs,
						},
					},
				},
			});
		};

		const overrideAttributes = {
			...attributes,
			content,
		};

		return (
			<>
				<BlockEdit {...props} attributes={overrideAttributes} />

				<InspectorControls>
					<PanelBody title={__('Copyright Settings', 'copyright-paragraph')} initialOpen={true}>
						<TextControl
							label={__('Custom Symbol', 'copyright-paragraph')}
							value={customSymbol}
							onChange={(value) => updateArgs('customSymbol', value)}
							placeholder={__('Leave empty to use ©', 'copyright-paragraph')}
						/>
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
							onChange={(value) => updateArgs('startYear', value.replace(/\D/g, ''))}
							placeholder={new Date().getFullYear()}
							min="1900"
							max={new Date().getFullYear()}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withCopyrightEnhancement');

addFilter(
	'editor.BlockEdit',
	'copyright-paragraph/enhancement',
	withCopyrightEnhancement
);
