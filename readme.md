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

