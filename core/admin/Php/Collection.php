<?php

namespace WPReact\Php;

final class Collection extends \ArrayObject
{
    public function __construct(private string $collectionType)
    {
        parent::__construct();
    }

    public function append(mixed $value): void
    {
        if (!$value instanceof $this->collectionType)
            throw new \Exception('$value must be instance of ' . $this->collectionType);

        parent::append($value);
    }

    public function offsetSet(mixed $key, mixed $value): void
    {
        if (!$value instanceof $this->collectionType)
            throw new \Exception('$value must be instance of ' . $this->collectionType);

        parent::offsetSet($key, $value);
    }
}
