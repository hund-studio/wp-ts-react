<?php

namespace WPReact\Wordpress\Query\PostType;

use WPReact\Helpers;

function register(string $slug, array $args, string $namespace)
{
    add_action('init', function () use ($slug, $args, $namespace) {
        $singular   = Helpers::arrayHasKey($args, 'singular', ucwords($slug));
        $plural     = Helpers::arrayHasKey($args, 'plural', ucwords($slug));
        $archive    = Helpers::arrayHasKey($args, 'archive', $slug);
        $rewrite    = Helpers::arrayHasKey($args, 'rewrite', $slug);
        $vanilla    = Helpers::arrayHasKey($args, 'vanilla', []);

        $labels = [
            'name'                => _x($plural, 'Post Type General Name', $namespace),
            'singular_name'       => _x($singular, 'Post Type Singular Name', $namespace),
            'menu_name'           => __($plural, $namespace),
            'parent_item_colon'   => __('Parent ' . $singular, $namespace),
            'all_items'           => __('All ' . $plural, $namespace),
            'view_item'           => __('View ' . $singular, $namespace),
            'add_new_item'        => __('Add New ' . $singular, $namespace),
            'add_new'             => __('Add New', $namespace),
            'edit_item'           => __('Edit ' . $singular, $namespace),
            'update_item'         => __('Update ' . $singular, $namespace),
            'search_items'        => __('Search ' . $singular, $namespace),
            'not_found'           => __('Not Found', $namespace),
            'not_found_in_trash'  => __('Not found in Trash', $namespace),
        ];

        register_post_type($slug, array_merge(
            [
                'label'                 => __($slug, $namespace),
                'description'           => __('Some projects of something', $namespace),
                'labels'                => $labels,
                'supports'              => array('title', 'revisions', 'custom-fields',),
                'taxonomies'            => array('genres'),
                'hierarchical'          => false,
                'public'                => true,
                'show_ui'               => true,
                'show_in_menu'          => true,
                'show_in_nav_menus'     => true,
                'show_in_admin_bar'     => true,
                'menu_position'         => 5,
                'can_export'            => true,
                'has_archive'           => $archive,
                'exclude_from_search'   => false,
                'publicly_queryable'    => true,
                'capability_type'       => 'post',
                'show_in_rest'          => true,
                'menu_icon'             => 'dashicons-arrow-right-alt',
                'rewrite'               => ['slug' => $rewrite],
                'supports'              => Helpers::arrayHasKey($args, 'add', ['title', 'editor'])
            ],
            $vanilla
        ));
    }, 0);
}
