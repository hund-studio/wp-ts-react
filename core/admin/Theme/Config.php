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
  protected array $required = ["dir", "uri", "restNamespace"];

  protected array $immutable = [
    "acfOptionsPagesPath" => "config/acf-options-pages",
    "customApiPath" => "config/api",
    "customTemplatesPath" => "config/custom-templates",
    "menusPath" => "config/menus",
    "postTypesPath" => "config/post-types",
    "taxonomiesPath" => "config/taxonomies",
    "restNamespace" => "wpreact/v1",
    "namespace" => "wpreact",
    "baseUrl" => "wp-json",
    "langs" => [],
    "fallbackLang" => null,
  ];

  private static Collection $loaders;

  public static function getLoaders(): Collection
  {
    return Config::$loaders;
  }

  public static function getApiBaseUrl()
  {
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

    /**
     * Config setup
     */

    $themeArgs = [
      "dir" => $dir,
      "uri" => $uri,
      "baseUrl" => Helpers::trimSlashes($apiConfig["base"]),
      "namespace" => Helpers::trimSlashes($apiConfig["wpreact"]["namespace"]),
      "langs" => [get_bloginfo('language') ?: $appConfig['language']],
      "fallbackLang" => get_bloginfo('language') ?: $appConfig['language']
    ];

    $themeArgs["restNamespace"] = Helpers::trimSlashes(
      Helpers::makeFullUrl(
        $themeArgs["namespace"],
        $apiConfig["wpreact"]["version"]
      )
    );

    /**
     * PLUGIN area
     */

    /** [qTranslate] */
    if (function_exists("qtranxf_getSortedLanguages")) {
      global $q_config;

      $themeArgs["langs"] = qtranxf_getSortedLanguages();
      $themeArgs["fallbackLang"] = $q_config["default_language"];
    }
    /** [qTranslate] end */

    /**
     * PLUGIN area end
     */

    Config::set($themeArgs);

    $taxonomyQueryPath = Helpers::makeFullUrl(
      Config::get("dir"),
      CORE_DIR,
      "/Factory/Taxonomy/Query"
    );

    functionsFromPath($taxonomyQueryPath);

    Config::$loaders = new Collection(Loader::class);

    WordpressConfig::init();

    $actionsPath = Config::get("dir") . CORE_DIR . "/Theme/Action";

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
