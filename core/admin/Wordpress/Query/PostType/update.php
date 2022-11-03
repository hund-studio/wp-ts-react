<?php

namespace WPReact\Wordpress\Query\PostType;

function update(string $slug, array $params)
{
    add_action('registered_post_type', function ($postType) use ($slug, $params) {
        if ($postType != $slug)
            return;

        add_action('admin_head', function () use ($slug, $params) {
            foreach ($params['add'] as $value) {
                add_post_type_support($slug, $value);
            }

            foreach ($params['remove'] as $value) {
                remove_post_type_support($slug, $value);
            }
        }, 99);
    }, 10, 1);
}
