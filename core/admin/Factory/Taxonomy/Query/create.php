<?php

namespace WPReact\Factory\Taxonomy\Query;

use WPReact\Helpers;

function create(string $slug, array $args, string $namespace)
{
    add_action('init', function () use ($slug, $args, $namespace) {
        $singular           = Helpers::arrayHasKey($args, 'singular', ucwords($slug));
        $plural             = Helpers::arrayHasKey($args, 'plural', ucwords($slug));
        $targets            = Helpers::arrayHasKey($args, 'targets', []);
        $hierarchical       = Helpers::arrayHasKey($args, 'hierarchical', false);
        $rewrite            = Helpers::arrayHasKey($args, 'rewrite', $slug);
        $showUi             = Helpers::arrayHasKey($args, 'show_ui', true);
        $showAdminColumn    = Helpers::arrayHasKey($args, 'show_admin_column', true);
        $vanilla            = Helpers::arrayHasKey($args, 'vanilla', []);

        $labels = [
            'name'                          => _x($plural, 'Taxonomy General Name', $namespace),
            'singular_name'                 => _x($singular, 'Taxonomy Singular Name', $namespace),
            'search_items'                  => __("Search $plural", $namespace),
            'popular_items'                 => __("Popular $plural", $namespace),
            'all_items'                     => __("All $plural", $namespace),
            'parent_item'                   => __("Parent $singular", $namespace),
            'parent_item_colon'             => __("Parent $singular:", $namespace),
            'edit_item'                     => __("Edit $singular", $namespace),
            'view_item'                     => __("View $singular", $namespace),
            'update_item'                   => __("Update $singular", $namespace),
            'add_new_item'                  => __("Add New $singular", $namespace),
            'new_item_name'                 => __("New $singular Name", $namespace),
            'add_or_remove_items'           => __("Add or remove $plural", $namespace),
            'choose_from_most_used'         => __("Choose from the most used $plural", $namespace),
            'not_found'                     => __("No $plural found", $namespace),
            'no_terms'                      => __("No $plural", $namespace),
            'filter_by_item'                => __("Filter by $singular", $namespace),
            'most_used'                     => __("Most Used", $namespace),
            'item_link'                     => __("$singular Link", $namespace),
        ];

        register_taxonomy($slug, $targets, array_merge([
            'labels'                => $labels,
            'description'           => '',
            'public'                => true,
            'publicly_queryable'    => true,
            'hierarchical'          => $hierarchical,
            'show_ui'               => $showUi,
            'show_in_menu'          => true,
            'show_in_nav_menus'     => true,
            'show_in_rest'          => true,
            'show_in_rest'          => true,
            'show_in_quick_edit'    => true,
            'show_admin_column'     => $showAdminColumn,
            'rewrite' => [
                'with_front'    => false,
                'slug'          => $rewrite
            ],
        ], $vanilla));
    }, 0);
}
