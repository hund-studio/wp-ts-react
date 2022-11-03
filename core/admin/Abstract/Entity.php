<?php

namespace WPReact\Abstract;

abstract class Entity
{
    public function getSlug()
    {
        return $this->slug;
    }

    protected function __construct(protected string $slug)
    {
    }
}
