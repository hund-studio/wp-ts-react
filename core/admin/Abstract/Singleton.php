<?php

namespace WPReact\Abstract;

abstract class Singleton
{
    private static $instances = [];

    private function __construct()
    {
    }

    private function __clone()
    {
    }

    public function __wakeup()
    {
        throw new \Exception("Cannot unserialize a singleton.");
    }

    final public static function getInstance()
    {
        $subclass =  static::class;
        if (!isset(self::$instances[$subclass]))
            self::$instances[$subclass] = new static();

        if (!(self::$instances[$subclass] instanceof $subclass))
            throw new \Exception("Found instance is not of correct type");

        return self::$instances[$subclass];
    }
}
