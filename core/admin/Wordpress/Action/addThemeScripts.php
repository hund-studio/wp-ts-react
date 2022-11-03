<?php

use WPReact\Helpers;
use WPReact\Theme\Config;

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('style', Helpers::joinPathParts(
        Config::get('uri'),
        'dist',
        'main.css'
    ));

    wp_register_script(
        'client',
        Helpers::joinPathParts(
            Config::get('uri'),
            'dist',
            'client.js'
        ),
        [],
        false,
        true
    );
    wp_enqueue_script('client');
});
