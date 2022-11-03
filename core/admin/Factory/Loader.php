<?php

namespace WPReact\Factory;

use WPReact\Php\Collection;

class Loader
{
    private Collection $entities;

    public function getEntities()
    {
        return $this->entities;
    }

    public function getEntityType()
    {
        return $this->entityType;
    }

    public function __construct(private string $path, private string $entityType)
    {
        $this->entities = new Collection($entityType);
        $this->load();
    }

    public function load()
    {
        foreach (glob($this->path) as  $filename) {
            $slug = basename($filename, '.php');
            $args = require_once $filename;

            $r = new \ReflectionClass($this->entityType);

            if ($r->implementsInterface('WPReact\Interface\Loadable')) {
                $instance = $this->entityType::load($slug, $args);

                if (!$instance instanceof $this->entityType)
                    throw new \Exception('$value must be instance of ' . $this->entityType);

                $this->entities->append($instance);
            }
        }
    }
}
