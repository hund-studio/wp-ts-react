<?php

namespace WPReact\Factory;

use WPReact\Abstract\Entity;
use \WPReact\Function\WordpressMenu;
use WPReact\interface\Loadable;
use WPReact\Theme\Config;

final class Menu extends Entity implements Loadable
{
    public function __construct(protected string $slug, public $args)
    {
        parent::__construct($this->slug);
        $this->register();
    }

    public function get(): array
    {
        return WordpressMenu\getItems($this->slug);
    }

    protected function register()
    {
        ['label' => $label] = $this->args;
        register_nav_menus([
            $this->slug => __($label, Config::getNamepace()),
        ]);
    }

    public static function load($slug, $args): self
    {
        $loadedInstance = new self($slug, $args);
        return $loadedInstance;
    }
}
