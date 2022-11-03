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
        '/' . Config::get('restNamespace') . "/page/$frontpageSlug"
    ));

    if (empty($WP_restResponse))
        return new \WP_Error(
            'frontpage_not_found',
            'No Static Frontpage set',
            ['status' => 404]
        );

    return $WP_restResponse;
});

if (function_exists('get_fields')) {
    new ApiRoute('GET', '/options', function () {
        return get_fields('options');
    });
}
