<?php

//Remove Gutenberg Block Library CSS from loading on the frontend
add_action('wp_enqueue_scripts', function () {
    wp_dequeue_style('global-styles');
    wp_dequeue_style('classic-theme-styles');
}, 100);
