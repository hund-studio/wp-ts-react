<?php

use WPReact\Factory\ApiRoute;
use WPReact\Helpers;
use WPReact\Theme\Config;

add_action('init', function () use ($appConfig) {
    $customTemplatesIterator = Config::getLoaders()
        ->offsetGet('customTemplates')
        ->getEntities();

    $postTypesIterator = Config::getLoaders()
        ->offsetGet('postTypes')
        ->getEntities();

    $patterns = array_merge(
        Helpers::arrayFlatten(
            array_map(function ($instance) {
                return [$instance->getSlug() => $instance->getRoutesPatterns()];
            }, iterator_to_array($customTemplatesIterator))
        ),
        Helpers::arrayFlatten(
            array_map(function ($instance) {
                return [$instance->getSlug() => $instance->getRoutesPatterns()];
            }, iterator_to_array($postTypesIterator))
        ),
        [
            'frontpage' => [
                Helpers::makeFullUrl('/') =>
                Helpers::makeFullUrl(
                    'frontpage'
                )
            ]
        ],
    );

    ksort($patterns);

    new ApiRoute('GET', '/routes', function () use ($patterns) {
        return new \WP_REST_Response($patterns, 200);
    });

    add_action('wp_footer', function () use ($patterns, $appConfig) {
        $elementId = $appConfig['routes']['element']['id'];

        $scriptOpenTag = "<script id='$elementId' type='application/json'>";
        $scriptCloseTag = '</script>';

        echo $scriptOpenTag . json_encode($patterns, JSON_UNESCAPED_SLASHES) . $scriptCloseTag;
    });
});
