## Copyright paragraph

Tags: copyright, footer, year, paragraph
Requires at least: 6.5.0
Tested up to: 6.7.2
Stable tag: 1.0.0
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

### Add a start year and custom text (via block code)

To display a year range, for example `© 2001 – 2025`, you can edit the block in **code editor** mode and add the `startYear` binding argument like this:

```html
<!-- wp:paragraph {
  "metadata": {
    "bindings": {
      "content": {
        "source": "copyright-paragraph/copyright",
        "args": {
          "startYear": "2001",
          "customName": "My custom name"
        }
      }
    }
  }
} -->
<p></p>
<!-- /wp:paragraph -->
```

## Shortcode

The `copyright_paragraph` plugin provides a simple shortcode to display a copyright notice with the current year and your site title. Optionally, you can provide a start year to show a range.

### Basic Usage

```plaintext
[copyright_paragraph]
```

### With Start Year

You can add an optional start_year attribute to display a year range (if different from the current year):
```
[copyright_paragraph start_year="2019"]
```

### Custom text

You can use your own text to replace the default site title.

```
[copyright_paragraph custom_name="My custom name"]
```

Of course, you can combine both options:

```
[copyright_paragraph start_year="2019" custom_name="My custom name"]
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

