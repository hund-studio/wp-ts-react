<?php

//Remove Gutenberg Block Library CSS from loading on the frontend
add_action('wp_enqueue_scripts', function () {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
}, 100);
