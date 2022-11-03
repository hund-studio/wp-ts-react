<?php

add_filter('display_post_states', function ($states) {
    global $post;

    if (!$post)
        return $states;

    $template_path = get_post_meta($post->ID, '_wp_page_template', true);
    $page_templates = wp_get_theme()->get_page_templates(null, 'page');

    if (('page' == get_post_type($post->ID)) && array_key_exists($template_path, $page_templates) && $page_templates[$template_path]) {
        $states[] = $page_templates[$template_path];
    }

    return $states;
}, 10, 2);
