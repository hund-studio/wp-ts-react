<?php

namespace WPReact\Interface;

interface Loadable
{
    public static function load(string $label, mixed $args): self;
}
