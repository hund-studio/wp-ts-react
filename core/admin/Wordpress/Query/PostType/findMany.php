<?php

namespace WPReact\Wordpress\Query\PostType;

use WPReact\Helpers;

function findMany(string $label)
{
    $args = ['post_type' => $label];
    $query = new \WP_Query($args);

    if (!$query->have_posts())
        return [];

    $posts = $query->get_posts();
    $posts = array_map(function ($post) {
        $post->url = Helpers::makeRelativeUrl(get_permalink($post->ID));

        if (function_exists('get_fields'))
            $post->acf = get_fields($post->ID);

        return $post;
    }, $posts);

    return  $posts;
}
