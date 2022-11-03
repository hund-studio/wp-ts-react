<?php

use WPReact\Factory\CustomTemplate;
use WPReact\Factory\Loader;
use WPReact\Helpers;
use WPReact\Theme\Config;

$searchPath = Helpers::makeFullUrl(
    Config::get('dir'),
    Config::get('customTemplatesPath'),
    '*.php'
);

Config::getLoaders()->offsetSet(
    'customTemplates',
    new Loader(
        $searchPath,
        CustomTemplate::class
    )
);
