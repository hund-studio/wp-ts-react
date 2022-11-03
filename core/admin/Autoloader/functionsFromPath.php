<?php

namespace WPReact\Autoloader;

/**
 * Create a RecursiveIteratorIterator from a given directory path
 * 
 * @param string $path Path to directory
 * 
 * @throws \Exception If given path is not a directory
 * @return \RecursiveIteratorIterator
 */
function recursiveDirectoryIteratorFromPath(string $path)
{
    if (!is_dir($path))
        throw new \Exception("Path should point to a directory");

    return new \RecursiveIteratorIterator(
        new \RecursiveDirectoryIterator(
            $path,
            \RecursiveDirectoryIterator::SKIP_DOTS
        ),
        \RecursiveIteratorIterator::SELF_FIRST
    );
}

/**
 * Require all functions inside a directory path
 * 
 * @param string $path Path to functions directory
 * 
 * @return void
 */
function functionsFromPath(string $path)
{
    foreach (recursiveDirectoryIteratorFromPath($path) as $fileOrFolder) {
        if ($fileOrFolder->isDir()) continue;

        $filePathName = $fileOrFolder->getPathname();

        if (!file_exists($filePathName)) continue;

        require_once $filePathName;
    }
}
