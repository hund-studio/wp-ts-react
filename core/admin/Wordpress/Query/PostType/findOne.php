<?php

namespace WPReact\Wordpress\Query\PostType;

use WPReact\Helpers;

function findOne(string $label, string $slug)
{
    $args = ['post_type' => $label, 'name' => $slug];
    $query = new \WP_Query($args);

    if (!$query->have_posts())
        return null;

    $post = $query->get_posts()[0];

    /**
     * Add acf to post
     */
    if (function_exists('get_fields'))
        $post->acf = get_fields($post->ID);
    $post->url = get_permalink($post->ID);

    function iterate(&$array)
    {
        foreach ($array as $key => $item) {
            if (is_array($item))
                iterate($item);

            if ($item instanceof \WP_Post) {
                $item->url = Helpers::makeRelativeUrl(get_permalink($item->ID));

                if (function_exists('get_fields'))
                    $item->acf = get_fields($item->ID);
            }
        }
    }
    if (is_array($post->acf))
        iterate($post->acf); // add support for nested relationship acf inputs


    /**
     * retrieve rankmat seo post info.
     */
    $seoRequest = new \WP_REST_Request('GET', '/rankmath/v1/getHead');
    $seoRequest->set_query_params(['url' => Helpers::makeRelativeUrl(get_permalink($post->ID))]);
    $post->seo = rest_do_request($seoRequest);

    return $post;
}
