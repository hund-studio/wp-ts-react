<?php

$post = get_page_by_path(
    $targetName,
    OBJECT,
    $targetPostType
);

if (!$post)
    wp_insert_post([
        'post_type'     => $targetPostType,
        'post_title'    => $templateName,
        'post_name'     => $targetName,
        'post_status'   => 'publish',
    ]);
