<?php

// 📄 https://gist.github.com/miya0001/d6508b9ba52df5aedc78fca186ff6088
add_action(
    "rest_api_init",
    function () {
        add_action("rest_pre_serve_request", function () {
            header(
                "Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Wpml-Language",
                true
            );
            header("Access-Control-Allow-Origin: *");
        });
    },
    15
);

// add_action('rest_api_init', function () {
//     remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
// }, 15);