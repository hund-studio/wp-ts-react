<?php

use WPReact\Factory\ApiRoute;
use WPReact\Factory\Loader;
use WPReact\Helpers;
use WPReact\Theme\Config;

$searchPath = Helpers::makeFullUrl(
    Config::get('dir'),
    Config::get('customApiPath'),
    '*.php'
);

Config::getLoaders()->offsetSet(
    'customApi',
    new Loader(
        $searchPath,
        ApiRoute::class
    )
);
