<?php

namespace WPReact\Factory;

use WPReact\Abstract\Entity;
use WPReact\Helpers;
use WPReact\Interface\Loadable;
use WPReact\Theme\Config;

final class ApiRoute extends Entity implements Loadable
{
    public function getPath()
    {
        return $this->path;
    }

    public function getMethod()
    {
        return $this->method;
    }

    public function __construct(
        private string $method,
        private string $path,
        private \Closure $callback,
        private ?\Closure $permissionCallback = null
    ) {
        $this->path = Helpers::makeFullUrl($path);
        parent::__construct($this->path);
        $this->register();
    }

    protected function register()
    {
        add_action('rest_api_init', function () {
            register_rest_route(
                Config::get('restNamespace'),
                $this->path,
                [
                    'methods' => $this->method,
                    'callback' => $this->callback,
                    'permission_callback' => $this->permissionCallback ?: fn () => true,
                ]
            );
        });
    }

    public static function load($slug, $args): self
    {
        $loadedInstance = new self(
            'GET',
            Helpers::makeFullUrl($slug),
            $args
        );
        return $loadedInstance;
    }
}
