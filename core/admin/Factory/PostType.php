<?php

namespace WPReact\Factory;

use WPReact\Abstract\Entity;
use WPReact\Helpers;
use WPReact\Interface\Loadable;
use WPReact\Theme\Config;
use WPReact\Trait\Queryable;
use WPReact\Trait\WithRoute;

use function WPReact\Wordpress\Query\PostType\{
  register,
  update,
  findMany,
  findOne
};

final class PostType extends Entity implements Loadable
{
  use Queryable;
  use WithRoute;

  private ?\WP_Post_Type $WP_postType = null;

  public function getWpPostType()
  {
    return $this->WP_postType;
  }

  private ?string $archivePath = null;

  private function setArchivePath()
  {
    $wpPostTypeArchive = $this->WP_postType->has_archive;

    if ($wpPostTypeArchive) {
      $this->archivePath = $this->slug;

      if (is_string($wpPostTypeArchive)) {
        $this->archivePath = $wpPostTypeArchive;
      }
    }
  }

  public function getArchivePath()
  {
    return $this->archivePath;
  }

  private ?string $singlePath = null;

  private function setSinglePath()
  {
    $wpPostTypeRewrite = $this->WP_postType->rewrite;

    if (
      is_array($wpPostTypeRewrite) &&
      array_key_exists("slug", $wpPostTypeRewrite)
    ) {
      $this->singlePath = $wpPostTypeRewrite["slug"];
    } else {
      $this->singlePath = $this->slug;
    }
  }

  public function getSinglePath()
  {
    return $this->singlePath;
  }

  public function __construct(protected string $slug, public $args)
  {
    parent::__construct($this->slug);
    $this->register();
  }

  protected function register()
  {
    if (post_type_exists($this->slug)) {
      update($this->slug, $this->args);
    } else {
      register($this->slug, $this->args, Config::get("namespace"));
    }

    add_action(
      "registered_post_type_$this->slug",
      function ($postType) {
        $this->WP_postType = get_post_type_object($postType);

        $this->setArchivePath();

        if ($this->archivePath) {
          new ApiRoute(
            "GET",
            Helpers::makeFullUrl("post-type", $this->archivePath),
            function (\WP_REST_Request $request) {
              $queryParameters = $request->get_query_params();
              $queryParametersKeys = array_keys($request->get_query_params());

              $postTypeTaxonomies = get_object_taxonomies($this->slug);
              $queriedTaxonomiesKeys = array_intersect(
                $postTypeTaxonomies,
                $queryParametersKeys
              );
              $queriedTaxonomiesValues = array_filter(
                $queryParameters,
                function ($queryParametersKey) use ($queriedTaxonomiesKeys) {
                  return in_array($queryParametersKey, $queriedTaxonomiesKeys);
                },
                ARRAY_FILTER_USE_KEY
              );

              $queriedRelationType = $request->get_param("relation");

              $posts = findMany(
                $this->slug,
                $queriedTaxonomiesValues,
                $queriedRelationType
              );

              return $posts;
            }
          );
        }

        $this->setSinglePath();

        new ApiRoute(
          "GET",
          Helpers::makeFullUrl(
            "post-type",
            $this->singlePath,
            "(?P<slug>[a-zA-Z0-9-]+)"
          ),
          function (\WP_REST_Request $request) {
            $post = $this->single($request->get_param("slug"));
            if (!$post) {
              return new \WP_Error("post_not_found", "Post not found", [
                "status" => 404,
              ]);
            }
            return $post;
          }
        );
      },
      10,
      1
    );
  }

  public function getRoutesPatterns()
  {
    if (!isset($this->WP_postType)) {
      throw new \Exception(
        "'WP_postType' property is not available here, try to use a (different) Wordpress action before accessing those values"
      );
    }

    $isPage = $this->WP_postType->name === "page";

    $singlePostTypeApiPaths = array_map(
      fn($lang) => [
        "url" => $isPage
          ? Helpers::makeFullUrl($lang, ":slug")
          : Helpers::makeFullUrl($lang, $this->singlePath, ":slug"),
        "api" => Helpers::makeFullUrl(
          $lang,
          Config::get("baseUrl"),
          Config::get("restNamespace"),
          "post-type",
          $this->singlePath,
          "{slug}"
        ),
      ],
      ["", ...Config::get("langs")]
    );

    $pattern = [
      "single" => array_merge(
        ...array_map(
          fn($singlePostTypeApiPath) => [
            $singlePostTypeApiPath["url"] => $singlePostTypeApiPath["api"],
          ],
          $singlePostTypeApiPaths
        )
      ),
    ];

    if ($this->archivePath) {
      $archivePostTypeApiPaths = array_map(
        fn($lang) => [
          "url" => Helpers::makeFullUrl($lang, $this->archivePath),
          "api" => Helpers::makeFullUrl(
            $lang,
            Config::get("baseUrl"),
            Config::get("restNamespace"),
            "post-type",
            $this->archivePath
          ),
        ],
        ["", ...Config::get("langs")]
      );

      $pattern["archive"] = array_merge(
        ...array_map(
          fn($archivePostTypeApiPath) => [
            $archivePostTypeApiPath["url"] => $archivePostTypeApiPath["api"],
          ],
          $archivePostTypeApiPaths
        )
      );
    }

    return $pattern;
  }

  public function all()
  {
    return findMany($this->slug);
  }

  public function single(string $slug)
  {
    return findOne($this->slug, $slug);
  }

  public static function load($slug, $args): self
  {
    $loadedInstance = new self($slug, $args);
    return $loadedInstance;
  }
}
