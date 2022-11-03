<?php

add_filter('display_post_states', function ($states) use ($targetPostType, $targetName, $templateName) {
    global $post;

    if (!$post)
        return $states;

    if (
        ($targetPostType == get_post_type($post->ID))
        && ($targetName === $post->post_name)
    ) {
        $states[] = $templateName;
    }

    return $states;
}, 10, 2);
