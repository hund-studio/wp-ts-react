<?php

namespace WPReact\Factory;

use WPReact\Abstract\Entity;
use WPReact\Interface\Loadable;

final class Taxonomy extends Entity implements Loadable
{
    public function __construct(protected string $slug, public $args)
    {
        parent::__construct($this->slug);
        $this->register();
    }

    protected function register()
    {
    }

    public static function load($slug, $args): self
    {
        $loadedInstance = new self($slug, $args);
        return $loadedInstance;
    }
}
