<?php

use WPReact\Factory\AcfOptionsPage;
use WPReact\Factory\Loader;
use WPReact\Helpers;
use WPReact\Theme\Config;

$searchPath = Helpers::makeFullUrl(
    Config::get('dir'),
    Config::get('acfOptionsPagesPath'),
    '*.php'
);

Config::getLoaders()->offsetSet(
    'acfOptionsPages',
    new Loader(
        $searchPath,
        AcfOptionsPage::class
    )
);
