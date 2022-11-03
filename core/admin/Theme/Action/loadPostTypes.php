<?php

use WPReact\Factory\Loader;
use WPReact\Factory\PostType;
use WPReact\Helpers;
use WPReact\Theme\Config;

$searchPath = Helpers::makeFullUrl(
    Config::get('dir'),
    Config::get('postTypesPath'),
    '*.php'
);

Config::getLoaders()->offsetSet(
    'postTypes',
    new Loader(
        $searchPath,
        PostType::class
    )
);
