<?php

namespace WPReact;

class Helpers
{
  public static function arrayHasKey(
    array $hashedArray,
    string $key,
    $default = null
  ) {
    if (array_key_exists($key, $hashedArray)) {
      return $hashedArray[$key];
    }

    return $default;
  }

  public static function arrayFlatten(array $array)
  {
    return array_merge(...$array);
  }

  public static function removeMultipleSlashes(string $string)
  {
    return preg_replace("~(?<!https:|http:)[/\\\\]+~", "/", $string);
  }

  public static function trimSlashes(string $string)
  {
    return trim($string, "/");
  }

  public static function joinPathParts(string ...$parts)
  {
    return self::removeMultipleSlashes(
      implode(
        "/",
        array_map(function ($part) {
          return trim($part, "/");
        }, $parts)
      )
    );
  }

  public static function makeFullUrl(string ...$parts)
  {
    return "/" . self::joinPathParts(...$parts);
  }

  public static function makeRelativeUrl(string $url)
  {
    return str_replace(home_url(), "", $url);
  }

  public static function arrayFind(array $xs, callable $f)
  {
    foreach ($xs as $x) {
      if (call_user_func($f, $x) === true) {
        return $x;
      }
    }
    return null;
  }
}
