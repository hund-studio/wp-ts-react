<?php

use WPReact\Factory\Loader;
use WPReact\Factory\Taxonomy;
use WPReact\Helpers;
use WPReact\Theme\Config;

$searchPath = Helpers::makeFullUrl(
    Config::get('dir'),
    Config::get('taxonomiesPath'),
    '*.php'
);

Config::getLoaders()->offsetSet(
    'taxonomies',
    new Loader(
        $searchPath,
        Taxonomy::class
    )
);
