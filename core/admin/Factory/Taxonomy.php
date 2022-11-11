<?php

namespace WPReact\Factory;

use WPReact\Abstract\Entity;
use WPReact\Helpers;
use WPReact\Interface\Loadable;
use WPReact\Theme\Config;

use function WPReact\Factory\Taxonomy\Query\create;

final class Taxonomy extends Entity implements Loadable
{
  private ?\WP_Taxonomy $WP_Taxonomy = null;

  public function getWpTaxonomy()
  {
    return $this->WP_Taxonomy;
  }

  public function __construct(protected string $slug, public $args)
  {
    parent::__construct($this->slug);
    $this->register();
  }

  protected function register()
  {
    create($this->slug, $this->args, Config::get("namespace"));

    add_action(
      "registered_taxonomy_$this->slug",
      function (
        string $taxonomySlug,
        string|array $targetPostTypes,
        array $taxonomyOptions
      ) {
        $this->WP_Taxonomy = get_taxonomy($taxonomySlug);

        new ApiRoute(
          "GET",
          Helpers::makeFullUrl("taxonomy", $this->slug),
          function (\WP_REST_Request $request) {
            $queryParameters = $request->get_query_params();

            if (isset($queryParameters["where"])) {
              $queriedWhere = is_array($queryParameters["where"])
                ? $queryParameters["where"]
                : [$queryParameters["where"]];

              $taxonomyQuery = [
                "tax_query" => [
                  "relation" => "AND",
                  array_map(
                    fn($value) => [
                      "taxonomy" => $this->slug,
                      "field" => "slug",
                      "terms" => $value,
                    ],
                    $queriedWhere
                  ),
                ],
              ];
            }

            $query = new \WP_Query(
              array_merge(
                ["post_type" => $this->WP_Taxonomy->object_type],
                isset($taxonomyQuery) ? $taxonomyQuery : []
              )
            );

            if (!$query->have_posts()) {
              return [];
            }

            $posts = $query->get_posts();
            $posts = array_map(function ($post) {
              $post->url = Helpers::makeRelativeUrl(get_permalink($post->ID));

              if (function_exists("get_fields")) {
                $post->acf = get_fields($post->ID);
              }

              return $post;
            }, $posts); // todo: this should be something with decoration pattern o similar

            return new \WP_REST_Response($posts, 200);
          }
        );
      },
      10,
      3
    );
  }

  public static function load($slug, $args): self
  {
    $loadedInstance = new self($slug, $args);
    return $loadedInstance;
  }
}
