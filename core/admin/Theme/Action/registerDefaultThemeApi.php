<?php

use WPReact\Factory\ApiRoute;
use WPReact\Helpers;
use WPReact\Theme\Config;

new ApiRoute('GET', '/menus', function () {
    return  Helpers::arrayFlatten(array_map(function ($menuEntity) {
        return [$menuEntity->getSlug() => $menuEntity->get()];
    }, iterator_to_array(Config::getLoaders()->offsetGet('menus')->getEntities())));
});

new ApiRoute('GET', '/frontpage', function () {
    $frontpageSlug = get_post_field(
        'post_name',
        get_post(get_option('page_on_front'))
    );

    if (!$frontpageSlug)
        return new \WP_Error(
            'frontpage_not_found',
            'No Static Frontpage set',
            ['status' => 404]
        );

    $WP_restResponse = rest_do_request(new \WP_REST_Request(
        'GET',
        Helpers::makeFullUrl(
            Config::get('restNamespace'),
            "post-type",
            "page",
            $frontpageSlug
        )
    ));

    if (empty($WP_restResponse))
        return new \WP_Error(
            'frontpage_not_found',
            'No Static Frontpage set',
            ['status' => 404]
        );

    return $WP_restResponse;
});

new ApiRoute('GET', '/post-types', function () {
    $iterator = Config::getLoaders()
        ->offsetGet('postTypes')
        ->getEntities();

    return new \WP_REST_Response(array_map(function ($instance) {
        return $instance->getWpPostType();
    }, iterator_to_array($iterator)), 200);
});

new ApiRoute(
    'GET',
    '/taxonomies',
    function (\WP_REST_Request $request) {
        $queryParameters = $request->get_query_params();

        $iterator = Config::getLoaders()
            ->offsetGet('taxonomies')
            ->getEntities();

        $taxonomies = array_map(function ($instance) {
            $wpObject =  $instance->getWpTaxonomy();

            $taxonomy = [
                'slug' =>  $wpObject->name,
                'label' => $wpObject->label,
                'available_in' => $wpObject->object_type,
                'terms' => get_terms(
                    $wpObject->name,
                    ['hide_empty' => false,]
                )
            ];

            return $taxonomy;
        }, iterator_to_array($iterator));

        if (isset($queryParameters['post_type'])) {
            $queriedPostTypes = is_array($queryParameters['post_type'])
                ? $queryParameters['post_type']
                : [$queryParameters['post_type']];
            $taxonomies = array_filter(
                $taxonomies,
                fn ($taxonomy) => !array_diff(
                    $queriedPostTypes,
                    $taxonomy['available_in']
                )
            );
        }

        return new \WP_REST_Response($taxonomies, 200);
    }
);

if (function_exists('get_fields')) {
    new ApiRoute('GET', '/options', function () {
        return get_fields('options');
    });
}
