<?php

add_filter('style_loader_tag', function ($tag) {
    return str_replace(get_bloginfo('version'), time(), $tag);
});
