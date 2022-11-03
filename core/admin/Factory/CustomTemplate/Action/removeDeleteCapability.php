<?php

add_filter('map_meta_cap', function ($capabilities, $capability, $userId, $args) use ($post) {
    if (!array_key_exists(0, $args)) {
        return $capabilities;
    }

    $postId = $args[0];

    if (
        $capability === 'delete_post'
        && $postId === $post->ID
    ) {
        $capabilities[] = 'do_not_allow';
    }

    return $capabilities;
}, 10, 4);
