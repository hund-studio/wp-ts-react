<?php

namespace WPReact\Wordpress\Query\PostType;

use WPReact\Helpers;

function findOne(string $label, string $slug)
{
    $args = [
        'post_type' => $label,
        'name' => $slug
    ];
    $query = new \WP_Query($args);

    if (!$query->have_posts())
        return null;

    $post = $query->get_posts()[0];

    /**
     * Plugin area
     */

    /* [ENHANCE] Add URL property */
    $post->url = Helpers::makeRelativeUrl(get_permalink($post->ID));

    /* [ACF] add acf to post */
    if (function_exists('get_fields'))
        $post->acf = get_fields($post->ID);

    /* [ACF] Do the same for nested relationships */
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

    /* [ACF] iterate post relationships */
    if (is_array($post->acf))
        iterate($post->acf);

    /* [RANKMATH] fetch data */
    $seoRequest = new \WP_REST_Request('GET', '/rankmath/v1/getHead');
    $seoRequest->set_query_params([
        'url' => Helpers::makeRelativeUrl(get_permalink($post->ID))
    ]);
    $post->seo = rest_do_request($seoRequest);

    /* [GRIDDER] add gridder to post */
    if (function_exists('get_laygrid'))
        $post->laygrid = get_laygrid($post->ID);

    /** Plugin end */

    return $post;
}
