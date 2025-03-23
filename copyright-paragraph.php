<?php
/**
 * Plugin Name: Copyright paragraph
 * Description: Add copyright with current year and site title.
 * Version: 1.0.0
 * Text Domain: copyright-paragraph
 * Author: Joop Laan
 *
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

define( 'COPYRIGHT_PARAGRAPH_VERSION', '1.0.0' );

add_action( 'init', function () {

	register_block_bindings_source( 'copyright-paragraph/copyright', array(
		'label'              => __( 'Copyright Info', 'copyright-paragraph' ),
		'get_value_callback' => function( $source_args, $block_context ) {
			$current_year = wp_date( 'Y' );
			$start_year   = isset( $source_args['startYear'] ) ? (int) $source_args['startYear'] : null;

			if ( ! $start_year && isset( $block->context['post']['date'] ) ) {
				$start_year = (int) substr( $block->context['post']['date'], 0, 4 );
			}

			$site_title   = get_bloginfo( 'name' );
			$year_part = $start_year && $start_year < $current_year
				? "$start_year – $current_year"
				: $current_year;

			return sprintf( /* translators: 1: years, 2: site title */ __( '© %1$s %2$s', 'copyright-paragraph' ), $year_part, $site_title );
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
