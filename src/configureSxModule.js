define([
	'fontoxml-families/configureAsFrameWithBreakableBlock',
	'fontoxml-families/configureAsInlineFrame',
	'fontoxml-families/configureContextualOperations',
	'fontoxml-families/createIconWidget',
	'fontoxml-families/createMarkupLabelWidget',
	'fontoxml-localization/t'
], function (
	configureAsFrameWithBreakableBlock,
	configureAsInlineFrame,
	configureContextualOperations,
	createIconWidget,
	createMarkupLabelWidget,
	t
	) {
	'use strict';

	return function configureSxModule (sxModule) {
		// menucascade
		//     The <menucascade> element is used to document a series of menu choices. The <menucascade> element
		//     contains one or more user interface control (<uicontrol>) elements, for example: Start > Programs >
		//     Accessories > Notepad. If there is more than one <uicontrol> element, the formatter shows connecting
		//     characters between the menu items to represent the menu cascade. This element is part of the DITA
		//     user interface domain, a special set of DITA elements designed to document user interface tasks,
		//     concepts and reference information. Category: User interface elements
		configureAsInlineFrame(sxModule, 'self::menucascade', t('menu cascade'), {
			defaultTextContainer: 'uicontrol'
		});

		// screen
		//     The <screen> element contains or refers to a textual representation of a computer screen or user
		//     interface panel (window). Category: User interface elements
		configureAsFrameWithBreakableBlock(sxModule, 'self::screen', t('screen'), {
			contextualOperations: [
				{ name: ':contextual-unwrap-screen' }
			],
			emptyElementPlaceholderText: t('type the screen text'),
			withNewlineBreakToken: true,
			visualization: {
				backgroundColor: 'brown',
				blockHeaderLeft: [
					createMarkupLabelWidget()
				],
				isMonospaced: true
			}
		});

		// attributes are not correctly validated yet
		configureContextualOperations(sxModule, 'self::screen[@expanse or @frame or @scale or @spectitle or @xml:space]', []);

		// shortcut
		//     The <shortcut> element identifies a keyboard shortcut for a menu or window action. This element is
		//     part of the DITA user interface domain, a special set of DITA elements designed to document user
		//     interface tasks, concepts and reference information. Category: User interface elements
		configureAsInlineFrame(sxModule, 'self::shortcut', t('shortcut'), {
			emptyElementPlaceholderText: t('type the shortcut')
		});

		// uicontrol
		//     The user interface control (<uicontrol>) element is used to mark up names of buttons, entry fields,
		//     menu items, or other objects that allow the user to control the interface. Use the <uicontrol>
		//     element inside a <menucascade> element to identify a sequence of menu choices in a nested menu, such
		//     as File New. This element is part of the DITA user interface domain, a special set of DITA elements
		//     designed to document user interface tasks, concepts and reference information. Category: User
		//     interface elements
		configureAsInlineFrame(sxModule, 'self::uicontrol', t('UI control'), {
			emptyElementPlaceholderText: t('type the label of the UI control')
		});

		configureAsInlineFrame(sxModule, 'self::uicontrol[parent::menucascade]', t('UI control'), {
			emptyElementPlaceholderText: t('type the label of the UI control'),
			visualization: {
				inlineBefore: [
					createIconWidget('angle-right')
				],
				outputClass: 'element-dita-uicontrol-in-menucascade'
			}
		});

		// wintitle
		//     The window title <wintitle> element can be used to mark up names of windows or dialogs, or other
		//     user interface elements at the same level of grouping, including wizard titles, wizard page titles,
		//     and window pane titles. This element is part of the DITA user interface domain, a special set of
		//     DITA elements designed to document user interface tasks, concepts and reference information.
		//     Category: User interface elements
		configureAsInlineFrame(sxModule, 'self::wintitle', t('window title'), {
			emptyElementPlaceholderText: t('type the window title')
		});
	};
});
