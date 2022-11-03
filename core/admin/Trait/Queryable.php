<?php

namespace WPReact\Trait;

trait Queryable
{
    abstract public function all();

    abstract public function single(string $slug);
}
