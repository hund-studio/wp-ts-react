<?php

namespace WPReact\Factory;

use WPReact\Abstract\Entity;
use WPReact\Helpers;
use WPReact\Interface\Loadable;
use WPReact\Theme\Config;
use WPReact\Trait\WithRoute;

use const WPReact\CORE_DIR;

final class CustomTemplate extends Entity implements Loadable
{
  use WithRoute;

  public function __construct(protected string $slug, public $args)
  {
    parent::__construct($this->slug);
    $this->register();
  }

  protected function register()
  {
    $actionsPath =
      Config::get("dir") . CORE_DIR . "/Factory/CustomTemplate/Action";

    [
      "name" => $templateName,
      "targets" => $templateTargets,
    ] = $this->args;

    foreach ($templateTargets as $target) {
      [
        "postType" => $targetPostType,
        "slug" => $targetName,
      ] = $target;

      require "$actionsPath/createMissingTarget.php";
      require "$actionsPath/removeDeleteCapability.php";
      require "$actionsPath/addTemplateNameOnAdmin.php";
    }
  }

  public function getRoutesPatterns()
  {
    $postTypes = iterator_to_array(
      Config::getLoaders()
        ->offsetGet("postTypes")
        ->getEntities()
    );

    ["targets" => $templateTargets] = $this->args;

    $patterns = Helpers::arrayFlatten(
      array_map(function ($target) use ($postTypes) {
        $targetEntity = Helpers::arrayFind($postTypes, function (
          $postType
        ) use ($target) {
          return $postType->getSlug() === $target["postType"];
        });

        if (!$targetEntity instanceof PostType) {
          throw new \Exception(
            "Entity '" . $target["postType"] . "'  not found"
          );
        }

        $isPage = $targetEntity->getWpPostType()->name === "page";

        $customTemplateApiPaths = array_map(
          fn($lang) => [
            "url" => $isPage
              ? Helpers::makeFullUrl($lang, $target["slug"])
              : Helpers::makeFullUrl(
                $lang,
                $targetEntity->getSinglePath(),
                $target["slug"]
              ),
            "api" => Helpers::makeFullUrl(
              $lang,
              Config::get("baseUrl"),
              Config::get("restNamespace"),
              "post-type",
              $targetEntity->getSinglePath(),
              $target["slug"]
            ),
          ],
          ["", ...Config::get("langs")]
        );

        $pattern = array_merge(
          ...array_map(
            fn($customTemplateApiPath) => [
              $customTemplateApiPath["url"] => $customTemplateApiPath["api"],
            ],
            $customTemplateApiPaths
          )
        );

        return $pattern;
      }, $templateTargets)
    );

    return $patterns;
  }

  public static function load($slug, $args): self
  {
    $loadedInstance = new self($slug, $args);
    return $loadedInstance;
  }
}
