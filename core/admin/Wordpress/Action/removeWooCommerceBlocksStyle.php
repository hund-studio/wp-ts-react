<?php

//Remove Woocommerce Block Library CSS from loading on the frontend
add_action('wp_enqueue_scripts', function () {
    wp_dequeue_style('wc-blocks-style');
}, 100);
