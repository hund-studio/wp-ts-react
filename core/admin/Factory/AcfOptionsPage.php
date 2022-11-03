<?php

namespace WPReact\Factory;

use WPReact\Abstract\Entity;
use WPReact\Interface\Loadable;

final class AcfOptionsPage extends Entity implements Loadable
{
    public function __construct(protected string $slug, public $args)
    {
        parent::__construct($this->slug);
        $this->register();
    }

    protected function register()
    {
        [
            'page' => $pageParams,
            'subpages' => $subpagesParams
        ] = $this->args;

        if (function_exists('acf_add_options_page')) {
            $parent = acf_add_options_page($pageParams);

            foreach ($subpagesParams as $subpage) {
                acf_add_options_page(array_merge($subpage, ['parent_slug' => $parent['menu_slug']]));
            }
        }
    }

    public static function load($slug, $args): self
    {
        $loadedInstance = new self($slug, $args);
        return $loadedInstance;
    }
}
