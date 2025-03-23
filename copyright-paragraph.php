<?php
/**
 * Plugin Name: Copyright paragraph
 * Description: Add copyright with current year and site title.
 * Version: 1.0.3
 * Text Domain: copyright-paragraph
 * Author: Joop Laan
 *
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

define( 'COPYRIGHT_PARAGRAPH_VERSION', '1.0.3' );

add_action( 'init', function () {

	register_block_bindings_source( 'copyright-paragraph/copyright', array(
		'label'              => __( 'Copyright Info', 'copyright-paragraph' ),
		'get_value_callback' => function( $source_args, $block_context ) {
			$current_year = wp_date( 'Y' );
			$start_year   = isset( $source_args['startYear'] ) ? (int) $source_args['startYear'] : null;
			$symbol       = isset( $source_args['customSymbol'] ) ? $source_args['customSymbol'] : '©';
			if (
				! $start_year &&
				is_object( $block_context ) &&
				isset( $block_context->post['date'] )
			) {
				$start_year = (int) substr( $block_context->post['date'], 0, 4 );
			}

			$site_name = isset( $source_args['customName'] ) && $source_args['customName']
				? $source_args['customName']
				: get_bloginfo( 'name' );

			$year_part = $start_year && $start_year < $current_year
				? "$start_year – $current_year"
				: $current_year;

			// Output with a <p> and class with spans.
			return sprintf(
				'<p class="copyright-paragraph"><span class="copyright-paragraph-s">%1$s</span> <span class="copyright-paragraph-y">%2$s</span> <span class="copyright-paragraph-n">%3$s</span></p>',
				esc_html( $symbol ),
				esc_html( $year_part ),
				esc_html( $site_name )
			);

		},
		'uses_context' => [ 'post' ],
	) );

} );

add_action( 'init', function () {

	load_plugin_textdomain(
		'copyright-paragraph',
		false,
		dirname(plugin_basename(__FILE__)) . '/languages'
	);

} );

add_action( 'enqueue_block_editor_assets', function () {
	wp_enqueue_script(
		'copyright-paragraph',
		plugin_dir_url( __FILE__ ) . 'build/index.js',
		array( 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-core-data' ),
		COPYRIGHT_PARAGRAPH_VERSION,
		true
	);

	wp_set_script_translations(
		'copyright-paragraph',
		'copyright-paragraph',
		plugin_dir_path( __FILE__ ) . 'languages'
	);
} );

add_shortcode( 'copyright_paragraph', function( $atts ) {
	$atts = shortcode_atts( array(
		'symbol'      => null,
		'start_year'  => null,
		'custom_name' => null,
	), $atts, 'copyright_paragraph' );

	$symbol = $atts['symbol'] ?: '©';

	$current_year = wp_date( 'Y' );
	$start_year   = (int) $atts['start_year'] ?: null;

	$site_name = $atts['custom_name'] ?: get_bloginfo( 'name' );

	$year_part = $start_year && $start_year < $current_year
		? "$start_year – $current_year"
		: $current_year;

	// Output with a <p> and class with spans.
	return sprintf(
		'<p class="copyright-paragraph"><span class="copyright-paragraph-s">%1$s</span> <span class="copyright-paragraph-y">%2$s</span> <span class="copyright-paragraph-n">%3$s</span></p>',
		esc_html( $symbol ),
		esc_html( $year_part ),
		esc_html( $site_name )
	);
} );


