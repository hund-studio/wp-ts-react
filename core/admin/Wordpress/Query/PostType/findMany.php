<?php

namespace WPReact\Wordpress\Query\PostType;

use WPReact\Helpers;

function findMany(string $label, ?array $whereTaxonomy = null, ?string $whereTaxonomyRelation = 'AND')
{
    if ($whereTaxonomy)
        $taxonomyQuery = [
            'tax_query' => [
                'relation' => $whereTaxonomyRelation,
                array_map(
                    fn ($slug, $terms) =>
                    [
                        "taxonomy" => $slug,
                        "field" => 'slug',
                        "terms" => $terms
                    ],
                    array_keys($whereTaxonomy),
                    $whereTaxonomy
                )
            ]
        ];

    $args = array_merge(
        ['post_type' => $label,],
        $taxonomyQuery ?: []
    );

    $query = new \WP_Query($args);

    if (!$query->have_posts())
        return [];

    $posts = $query->get_posts();

    $posts = array_map(function ($post) {
        /* [ENHANCE] Add URL property */
        $post->url = Helpers::makeRelativeUrl(get_permalink($post->ID));

        /* [ACF] add acf to post */
        if (function_exists('get_fields'))
            $post->acf = get_fields($post->ID);

        return $post;
    }, $posts);

    return  $posts;
}
