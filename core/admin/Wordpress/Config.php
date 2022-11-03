<?php

namespace WPReact\Wordpress;

use WPReact\Abstract\Singleton;
use WPReact\Theme\Config as ThemeConfig;

use function WPReact\Autoloader\functionsFromPath;

use const WPReact\CORE_DIR;

final class Config extends Singleton
{
    public static function init()
    {
        functionsFromPath(get_template_directory() . CORE_DIR . '/Wordpress/Query');

        $actionsPath = ThemeConfig::get('dir') . CORE_DIR . '/Wordpress/Action';

        require_once "$actionsPath/disableAdminBarOnFront.php";
        require_once "$actionsPath/enablePostThumbnails.php";
        require_once "$actionsPath/enableTitleTag.php";
        require_once "$actionsPath/addPostsTemplatesLabel.php";
        require_once "$actionsPath/addThemeScripts.php";

        if (WP_DEBUG) {
            require_once "$actionsPath/disableCorsSecurityChecks.php";
            require_once "$actionsPath/setTimeAsCachedVersion.php";
        }
    }
}
