<?php

use WPReact\Factory\Loader;
use WPReact\Factory\Menu;
use WPReact\Helpers;
use WPReact\Theme\Config;

$searchPath = Helpers::makeFullUrl(
    Config::get('dir'),
    Config::get('menusPath'),
    '*.php'
);

Config::getLoaders()->offsetSet(
    'menus',
    new Loader(
        $searchPath,
        Menu::class
    )
);
