<?php

namespace WPReact\Function\WordpressMenu;

use WPReact\Helpers;

function getItems(string $menuLabel)
{
    $menuItems = [];
    if (($locations = get_nav_menu_locations()) && isset($locations[$menuLabel]) && $locations[$menuLabel] != 0) {
        $menu = get_term($locations[$menuLabel]);
        $menuItems = wp_get_nav_menu_items($menu->term_id);
    }

    foreach ($menuItems as $index => $item) {
        $menuItems[$index]->url = Helpers::makeRelativeUrl($item->url);
    }

    return $menuItems;
}
