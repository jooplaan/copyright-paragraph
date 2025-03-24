## Copyright paragraph

Tags: copyright, footer, year, paragraph
Requires at least: 6.5.0
Tested up to: 6.7.2
Stable tag: 1.0.4
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add copyright with current year and site title.

## Description

Add a paragraph block with '© + current year + site title'

Simplest way to add this copyright text is to add the block from the block
chooser. Look for "Copyright Text". This will add the default paragraph with
the text: © + current year + site title
For instance: © 2025 My Site Title

If you want to add a starting year, you can do this through the code editor.
Add this code, and change the start year to your liking:

```
<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"copyright-paragraph/copyright","args":{"startYear":"2001"}}}}} -->
<p></p>
<!-- /wp:paragraph -->
```

## How to use the block

The easiest way to use the plugin is to add the block from the WordPress block inserter.

Look for the block titled **“Copyright Text”**.

This will insert a regular paragraph block that dynamically shows the copyright text, using the current year and your site title.

You can change the options for this block in the sidebar:

* add a different symbol for the copyright
* add an optional start_year attribute to display a year range (if different from the current year)
* add a custom text to replace the site title.

## Shortcode

The `copyright_paragraph` plugin provides a simple shortcode to display a copyright notice with the current year and your site title. Optionally, you can provide a start year to show a range.

### Usage

You can

* add a different symbol for the copyright
* add an optional start_year attribute to display a year range (if different from the current year)
* add a custom text to replace the site title.

All options:

```
[copyright_paragraph custom_symbol="(c)" start_year="2019" custom_name="My custom name"]
```

## Updating Translations

Whenever you make changes to translatable strings in the plugin:

1. Regenerate the .pot file:

```
wp i18n make-pot . languages/copyright-paragraph.pot
```

2. Update the .po and .mo files for each language using a tool like Poedit or an online service.

3. Generate the JavaScript translation files:

```
wp i18n make-json languages
```

This ensures that both PHP and JavaScript translations are available and up to date.

