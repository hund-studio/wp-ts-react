# WordPress Configuration

One of the best things about **wp-ts-react** is that you can directly edit your WordPress backend using a minimal file system configuration system which will automatically register needed **Custom Post Types**, **Taxonomies**, **Menus** and more...

Check below the full list of all WordPress features available.

| Entity                                | Configuration path                | Required plugins |
| :------------------------------------ | :-------------------------------- | :--------------- |
| [Custom Post Type](#custom-post-type) | `/theme/config/post-types`        | -                |
| Taxonomies                            | `/theme/config/taxonomies`        | -                |
| Menus                                 | `/theme/config/menus`             | -                |
| API                                   | `/theme/config/api`               | -                |
| Custom Templates                      | `/theme/config/custom-templates`  | -                |
| ACF Options Pages                     | `/theme/config/acf-options-pages` | ACF Pro          |

As a general rule: each configuration file should be named after the relative entity slug (WordPress documentation suggests using the singular name) and return an **associative array** of config options or a **Closure**.
If you need to create a **Project** Custom Post Type you will likely name your file `project.php``.

## Custom Post Type

> ⚠️ If you want to work with already registered post types you **must** create a configuration file with the desired slug (ae. you must create a `page.php` file in order to use WordPress default pages).

Custom Post Type configuration files must be placed inside the `/theme/config/post-types` folder.

### Create a new Custom Post Type

This is an example file that registers a `Project`` Custom Post Type:

```php
<?php
// 📄 /theme/config/post-types/project.php
return [
	"singular" => "Project",
	"plural" => "Projects",
	"archive" => true,
	"rewrite" => "project",
	"vanilla" => [],
];
```

Available configuration:

| Property name | Description                                                                                                         | Type   | Required | Default               |
| :------------ | :------------------------------------------------------------------------------------------------------------------ | :----- | :------- | :-------------------- |
| singular      | Singular name                                                                                                       | string | false    | `ucwords(<filename>)` |
| plural        | Plural name                                                                                                         | string | false    | `ucwords(<filename>)` |
| archive       | Custom archive slug                                                                                                 | string | false    | `<filename>`          |
| rewrite       | Custom single slug                                                                                                  | string | false    | `<filename>`          |
| vanilla       | [register_post_type](https://developer.wordpress.org/reference/functions/register_post_type/#parameters) parameters | array  | false    | `[]`                  |

### Edit an existing Custom Post Type

This is an example file that updates the `Page` Default Post Type:

```php
<?php
// 📄 /theme/config/post-types/page.php
return [
	"add" => [],
	"remove" => ["editor"],
];
```

Available configuration:

| Property name | Description                                                                                                                      | Type  | Required | Default |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------- | :---- | :------- | :------ |
| add           | [add_post_type_support](https://developer.wordpress.org/reference/functions/remove_post_type_support/#parameters) $feature array | array | false    | `[]`    |
| remove        | [remove_post_type_support](https://developer.wordpress.org/reference/functions/add_post_type_support/#parameters) $feature array | array | false    | `[]`    |

## Taxonomies

...more coming soon
