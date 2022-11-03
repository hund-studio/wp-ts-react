<?php

namespace WPReact;

use function WPReact\Autoloader\classesFromPath;
use function WPReact\Autoloader\functionsFromPath;

require_once "Autoloader/functionsFromPath.php";

const CONFIG_DIR = '/config';
const CORE_DIR = '/core';

functionsFromPath(get_template_directory() . CORE_DIR . '/Autoloader');
classesFromPath(get_template_directory() . CORE_DIR, "WPReact");
