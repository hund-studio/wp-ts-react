<?php

use WPReact\Factory\ApiRoute;
use WPReact\Helpers;
use WPReact\Theme\Config;

add_action("init", function () use ($appConfig) {
  $settings = [
    "apiUrl" => Helpers::makeFullUrl("wp-json", Config::get("restNamespace")),
    "restNamespace" => Config::get("restNamespace"),
    "namespace" => Config::get("namespace"),
  ];

  new ApiRoute("GET", "/settings", function () use ($settings) {
    return new \WP_REST_Response($settings, 200);
  });

  add_action("wp_footer", function () use ($settings, $appConfig) {
    $elementId = $appConfig["settings"]["element"]["id"];

    $scriptOpenTag = "<script id='$elementId' type='application/json'>";
    $scriptCloseTag = "</script>";

    echo $scriptOpenTag .
      json_encode($settings, JSON_UNESCAPED_SLASHES) .
      $scriptCloseTag;
  });
});
