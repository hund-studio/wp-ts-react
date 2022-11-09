<?php

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('laygrid');
    wp_enqueue_script('lg-flexbox-polyfill');
    if (get_option('misc_options_simple_parallax', '') == 'on') {
        wp_enqueue_script('lg-parallax');
    }
});
