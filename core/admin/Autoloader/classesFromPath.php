<?php

namespace WPReact\Autoloader;

/**
 * Create an autoloader function for PSR-4 namespaced classes inside a directory path
 * 
 * @param string $path Path to classes directory
 * @param ?string $vendorNamespace When using PSR-4 namespace standard you can define a vendor prefix which will be removed when parsing the class path
 * 
 * @return void
 */
function classesFromPath(string $path, ?string $vendorNamespace = null)
{
    spl_autoload_register(function ($className) use ($path, $vendorNamespace) {
        $className = str_replace("\\", DIRECTORY_SEPARATOR, $className);

        if ($vendorNamespace)
            $className = str_replace($vendorNamespace, '', $className);

        $classPath = $path . $className . '.php';

        if (!file_exists($classPath))
            return;

        if (!class_exists($className, false))
            require_once $classPath;
    });
}
