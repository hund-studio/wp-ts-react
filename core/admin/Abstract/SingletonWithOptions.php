<?php

namespace WPReact\Abstract;


abstract class SingletonWithOptions extends Singleton
{
    protected array $required = [];
    protected array $immutable = [];

    final public static function set(array $options)
    {
        $instance = self::getInstance();

        $optionsWithDefaults = array_merge($instance->immutable, $options);

        foreach ($instance->required as $key)
            if (!isset($instance->$key))
                if (!isset($options[$key]))
                    throw new \Exception("Missing required parameter '$key'");

        foreach (array_keys($instance->immutable) as $key)
            if (property_exists($instance, $key))
                if (array_key_exists($key, $options))
                    throw new \Exception("Parameter '$key' is immutable");

        foreach ($optionsWithDefaults as $key => $option)
            $instance->{$key} = $option;
    }

    final public static function get(string $key)
    {
        $instance = self::getInstance();

        if (!property_exists($instance, $key))
            throw new \Exception("Property $key does not exist");

        return $instance->{$key};
    }
}
