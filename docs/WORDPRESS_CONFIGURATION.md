# WordPress Configuration

One of the best things about **wp-ts-react** is that you can directly edit your WordPress backend using a minimal file system configuration system which will automatically register needed **Custom Post Types**, **Taxonomies**, **Menus** and more...

Check below the full list of all WordPress features available.

| Entity                                  | Configuration path                | Required plugins |
| :-------------------------------------- | :-------------------------------- | :--------------- |
| [Custom Post Type](#custom-post-type)   | `/theme/config/post-types`        | -                |
| [Taxonomies](#taxonomies)               | `/theme/config/taxonomies`        | -                |
| [Menus](#menus)                         | `/theme/config/menus`             | -                |
| [API](#api)                             | `/theme/config/api`               | -                |
| [Custom Templates](#custom-templates)   | `/theme/config/custom-templates`  | -                |
| [ACF Options Pages](#acf-options-pages) | `/theme/config/acf-options-pages` | ACF Pro          |

As a general rule: each configuration file should be named after the relative entity slug (WordPress documentation suggests using the singular name) and return an **associative array** of config options or a **Closure**.
If you need to create a **Project** Custom Post Type you will likely name your file `project.php``.

## Custom Post Type

> ⚠️ If you want to work with already registered post types you **must** create a configuration file with the desired slug (ae. you must create a `page.php` file in order to use WordPress default pages).

📍 Custom Post Type configuration files must be placed inside the `/theme/config/post-types` folder.

### Create a new Custom Post Type

This is an example file that registers a `Project` Custom Post Type:

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

| Property name | Description                                                                                                            | Type   | Required | Default               |
| :------------ | :--------------------------------------------------------------------------------------------------------------------- | :----- | :------- | :-------------------- |
| singular      | Singular name                                                                                                          | string | false    | `ucwords(<filename>)` |
| plural        | Plural name                                                                                                            | string | false    | `ucwords(<filename>)` |
| archive       | Custom archive slug                                                                                                    | string | false    | `<filename>`          |
| rewrite       | Custom single slug                                                                                                     | string | false    | `<filename>`          |
| vanilla       | [register_post_type](https://developer.wordpress.org/reference/functions/register_post_type/#parameters) `$args` array | array  | false    | `[]`                  |

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

| Property name | Description                                                                                                                        | Type  | Required | Default |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------- | :---- | :------- | :------ |
| add           | [add_post_type_support](https://developer.wordpress.org/reference/functions/remove_post_type_support/#parameters) `$feature` array | array | false    | `[]`    |
| remove        | [remove_post_type_support](https://developer.wordpress.org/reference/functions/add_post_type_support/#parameters) `$feature` array | array | false    | `[]`    |

## Taxonomies

> ⚠️ If you want to work with already registered taxonomies you **must** create a configuration file with the desired slug (ae. you must create a `category.php` file in order to use WordPress default cetagories).

📍 Taxonomy configuration files must be placed inside the `/theme/config/taxonomies` folder.

### Create/Edit a Taxonomy

This is an example file that registers a `Topic` Custom Taxonomy:

```php
<?php
// 📄 /theme/config/taxonomies/topic.php
return [
	"singular" => "Topic",
	"plural" => "Topics",
	"targets" => ["project"],
	"hierarchical" => false,
	"rewrite" => false,
	"show_ui" => true,
	"show_admin_column" => true,
	"vanilla" => [],
];
```

The same structure is valid to edit an already existing taxonomy.
This is an example file that updates the `Tag` Default Taxonomy:

```php
<?php
// 📄 /theme/config/taxonomies/tag.php
return [
	"singular" => "Tag",
	"plural" => "Tags",
	"targets" => ["project"],
	"hierarchical" => false,
	"rewrite" => false,
	"show_ui" => true,
	"show_admin_column" => true,
	"vanilla" => [],
];
```

Available configuration:

| Property name     | Description                                                                                                          | Type            | Required | Default               |
| :---------------- | :------------------------------------------------------------------------------------------------------------------- | :-------------- | :------- | :-------------------- |
| singular          | Singular name                                                                                                        | string          | false    | `ucwords(<filename>)` |
| plural            | Plural name                                                                                                          | string          | false    | `ucwords(<filename>)` |
| targets           | Array of Custom Post Types that should use this taxonomy                                                             | array           | false    | `[]`                  |
| hierarchical      | Wethers taxonomy should be hierarchical                                                                              | boolean         | false    | `false`               |
| rewrite           | Custom slug                                                                                                          | false \| string | false    | `<filename>`          |
| show_ui           | Wether taxonomy should appear on admin UI                                                                            | boolean         | false    | `true`                |
| show_admin_column | Wether taxonomy should appear on the Post Type admin interface                                                       | boolean         | false    | `true`                |
| vanilla           | [register_taxonomy](https://developer.wordpress.org/reference/functions/register_taxonomy/#parameters) `$args` array | array           | false    | `[]`                  |

## Menus

📍 Menu configuration files must be placed inside the `/theme/config/menus` folder.

### Create a Menu

This is an example file that registers a `Primary` Menu:

```php
<?php
// 📄 /theme/config/menus/primary.php
return [
	"label" => "Primary Menu",
];
```

Available configuration:

| Property name | Description                | Type   | Required | Default               |
| :------------ | :------------------------- | :----- | :------- | :-------------------- |
| label         | Menu display name on admin | string | false    | `ucwords(<filename>)` |

## API

> ⚠️ **wp-ts-react** API is not meant to register complex API (which should be done using the `/theme/functions.php` for security reasons) but rather to handle simple GET endpoints.

📍 API configuration files must be placed inside the `/theme/config/api` folder.

### Create a new API endpoint

API configuration files are the only ones that export a **Closure** and not an **Associative Array**. The exported function will be passed as a callback to an API endpoint available at:

```api
GET /wp-json/wpreact/v1/<filename>
```

This is an example file that registers a `Time` API endpoint:

```php
<?php
// 📄 /theme/config/api/time.php
return function (\WP_REST_Request $request) {
	return new \WP_REST_Response(date("Y-m-d H:i:s"), 200);
};
```

To consume this API you must create a `GET` request to `/wp-json/wpreact/v1/time`.

## Custom Templates

📍 Custom Template configuration files must be placed inside the `/theme/config/custom-templates` folder.

Custom templates are not related to the original WordPress templates system but are integrated into the **wp-ts-react** core frontend to create special Posts layout.

> 👨‍🏫️ **Example scenery**: you are building a website for a series of conferences and have a front page, an about page, a single page for each event but, you need to create a "Calendar" page with an interactive calendar of all the events. If you crete a new page named "Calendar" your page will have the same layout of your "About" page which is not ok in order to display an interactive calendar. Here Custom Templates come to an help. You can register an `interactive-calendar` template and assign it to your "Calendar" page.

> ⚠️ When you assing a custom template to a specific post you loose the capability to delete it. If the targeted post does not exists a new Post Type with the given slug will be automatically created. This is required from the frontend to work.

> ⚠️ If you want to delete a page targeted from a Custom Template you have to unlink it before, then delete the post.

### Create a new Custom Template

This is an example file that registers a `Special` Custom Template and assigns it to a `Project` with `/special` slug and to a `Page` with `/special` slug:

```php
<?php
// 📄 /theme/config/custom-templates/special.php
return [
	"name" => "Special Template",
	"targets" => [
		[
			"postType" => "project",
			"slug" => "special",
		],
		[
			"postType" => "page",
			"slug" => "special",
		],
	],
];
```

Available configuration:

| Property name | Description                                   | Type   | Required | Default               |
| :------------ | :-------------------------------------------- | :----- | :------- | :-------------------- |
| name          | Custom Template display name on admin         | string | false    | `ucwords(<filename>)` |
| targets       | Posts targeted by the current Custom Template | array  | false    | `[]`                  |

## ACF Options Pages

> ⚠️ **wp-ts-react** doeas not have a built-in way to create options pages but relies on ACF Custom Fields PRO. You must have it installed and active in order to make ACF Options Pages work.

📍 Custom Template configuration files must be placed inside the `/theme/config/acf-options-pages` folder.

### Create a new ACF Options Page

This is an example file that registers a `Settings` ACF Options Pages:

```php
<?php
// 📄 /theme/config/acf-options-pages/settings.php
return [
	"page" => [
		"page_title" => "Settings",
		"menu_title" => "Settings",
		"capability" => "edit_posts",
		"redirect" => true,
		"position" => "20.1",
	],
	"subpages" => [
		[
			"page_title" => "Footer Settings",
			"menu_title" => "Footer",
		],
		[
			"page_title" => "Other Settings",
			"menu_title" => "Other",
		],
	],
];
```

> ⚠️ This file will only register the options page. You will have to create the needed UI directly from the ACF plugin.

Available configuration:

| Property name | Description                                                                                                             | Type  | Required | Default |
| :------------ | :---------------------------------------------------------------------------------------------------------------------- | :---- | :------- | :------ |
| page          | [acf_add_options_page](https://www.advancedcustomfields.com/resources/acf_add_options_page/#settings) `$settings`       | array | false    | `[]`    |
| subpages      | [acf_add_options_page](https://www.advancedcustomfields.com/resources/acf_add_options_page/#settings) `$settings` array | array | false    | `[]`    |
