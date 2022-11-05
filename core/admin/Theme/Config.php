<?php

namespace WPReact\Theme;

use WPReact\Abstract\SingletonWithOptions;
use WPReact\Factory\Loader;
use WPReact\Helpers;
use WPReact\Php\Collection;
use WPReact\Wordpress\Config as WordpressConfig;

use function WPReact\Autoloader\functionsFromPath;

use const WPReact\CONFIG_DIR;
use const WPReact\CORE_DIR;

final class Config extends SingletonWithOptions
{
    protected array $required = [
        'dir',
        'uri',
        'restNamespace'
    ];

    protected array $immutable = [
        'acfOptionsPagesPath'   => 'config/acf-options-pages',
        'customApiPath'         => 'config/api',
        'customTemplatesPath'   => 'config/custom-templates',
        'menusPath'             => 'config/menus',
        'postTypesPath'         => 'config/post-types',
        'taxonomiesPath'        => 'config/taxonomies',
        'restNamespace'         => null
    ];

    private static Collection $loaders;

    public static function getLoaders(): Collection
    {
        return Config::$loaders;
    }

    public static function getNamepace()
    {
        return explode('/', Config::get('restNamespace'))[0];
    }

    public static function init()
    {
        $dir = get_template_directory();
        $uri = get_template_directory_uri();

        $configPath = $dir . CONFIG_DIR;
        $apiConfigPath = "$configPath/api.json";
        $appConfigPath = "$configPath/app.json";
        $apiConfigRawContent = file_get_contents($apiConfigPath);
        $apiConfig = json_decode($apiConfigRawContent, true);
        $appConfigRawContent = file_get_contents($appConfigPath);
        $appConfig = json_decode($appConfigRawContent, true);

        Config::set([
            'dir' => $dir,
            'uri' => $uri,
            'restNamespace' => $apiConfig['namespaces']['wpreact']
        ]);

        $taxonomyQueryPath = Helpers::makeFullUrl(
            Config::get('dir'),
            CORE_DIR,
            '/Factory/Taxonomy/Query'
        );

        functionsFromPath($taxonomyQueryPath);

        Config::$loaders = new Collection(Loader::class);

        WordpressConfig::init();

        $actionsPath = Config::get('dir') . CORE_DIR . '/Theme/Action';

        // Load config files
        require_once "$actionsPath/loadPostTypes.php";
        require_once "$actionsPath/loadCustomTemplates.php";
        require_once "$actionsPath/loadCustomApi.php";
        require_once "$actionsPath/loadMenu.php";
        require_once "$actionsPath/loadAcfOptionsPages.php";
        require_once "$actionsPath/loadTaxonomies.php";

        // Register required theme api
        require_once "$actionsPath/registerDefaultThemeApi.php";

        // Send SSR data to frontend
        require_once "$actionsPath/emitFrontendRoutes.php";
        require_once "$actionsPath/emitFrontendSettings.php";

        $instance = Config::getInstance();
        return $instance;
    }
}
