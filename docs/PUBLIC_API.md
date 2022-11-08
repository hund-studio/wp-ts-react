# Available public API Endpoint

This is a list of all available public API endpoints exposed from **wp-ts-react**. You can use them to fetch data without using `@core/hooks`.

| Endpoint                     | Description                              |
| :--------------------------- | :--------------------------------------- |
| [Frontpage](#🌐-frontpage)   | Fetch _Frontpage_ data                   |
| [Menus](#🌐-menus)           | Fetch registered _Menus_ with items      |
| [Post Types](#🌐-post-types) | Fetch registered _Post Types_            |
| [Post Type](#🌐-post-types)  | Fetch registered _Post Type_ by **slug** |
| [Taxonomies](#🌐-taxonomies) | Fetch registered _Taxonomies_            |
| [Taxonomy]()                 | Fetch registered _Taxonomy_ by **slug**  |

## 🌐 Frontpage

| Method | URL                             | Needs Auth |
| :----- | :------------------------------ | ---------: |
| `GET`  | `/wp-json/wpreact/v1/frontpage` |      false |

#### Success Response

| Status |  Code |
| :----- | ----: |
| OK     | `200` |

<details>
<summary>Example 200 Response</summary>

```json
{
  "ID": 13,
  "post_author": "1",
  "post_date": "2022-05-05 03:41:10",
  "post_date_gmt": "2022-05-05 03:41:10",
  "post_content": "",
  "post_title": "Homepage",
  "post_excerpt": "",
  "post_status": "publish",
  "comment_status": "closed",
  "ping_status": "closed",
  "post_password": "",
  "post_name": "homepage",
  "to_ping": "",
  "pinged": "",
  "post_modified": "2022-11-08 20:58:00",
  "post_modified_gmt": "2022-11-08 20:58:00",
  "post_content_filtered": "",
  "post_parent": 0,
  "guid": "http://wpreact.test/?page_id=13",
  "menu_order": 0,
  "post_type": "page",
  "post_mime_type": "",
  "comment_count": "0",
  "filter": "raw",
  "acf": {
    "body": "/w a frontpage template"
  },
  "url": "http://wpreact.test/",
  "seo": {
    "data": {
      "code": "rest_no_route",
      "message": "No route was found matching the URL and request method.",
      "data": {
        "status": 404
      }
    },
    "headers": [],
    "status": 404
  }
}
```

</details>

#### Error Response

| Status                |  Code |
| :-------------------- | ----: |
| `frontpage_not_found` | `404` |

<details>
<summary>Example 404 Response</summary>

```json
{
  "code": "frontpage_not_found",
  "message": "No Static Frontpage set",
  "data": {
    "status": 404
  }
}
```

</details>

## 🌐 Menus

| Method | URL                         | Needs Auth |
| :----- | :-------------------------- | ---------: |
| `GET`  | `/wp-json/wpreact/v1/menus` |      false |

#### Success Response

| Status |  Code |
| :----- | ----: |
| OK     | `200` |

<details>
<summary>Example 200 Response</summary>

```json
{
  "primary": [
    {
      "ID": 15,
      "post_author": "1",
      "post_date": "2022-11-08 20:58:20",
      "post_date_gmt": "2022-05-05 03:45:56",
      "post_content": " ",
      "post_title": "",
      "post_excerpt": "",
      "post_status": "publish",
      "comment_status": "closed",
      "ping_status": "closed",
      "post_password": "",
      "post_name": "15",
      "to_ping": "",
      "pinged": "",
      "post_modified": "2022-11-08 20:58:20",
      "post_modified_gmt": "2022-11-08 20:58:20",
      "post_content_filtered": "",
      "post_parent": 0,
      "guid": "http://wpreact.test/?p=15",
      "menu_order": 1,
      "post_type": "nav_menu_item",
      "post_mime_type": "",
      "comment_count": "0",
      "filter": "raw",
      "db_id": 15,
      "menu_item_parent": "0",
      "object_id": "13",
      "object": "page",
      "type": "post_type",
      "type_label": "Page",
      "url": "/",
      "title": "Homepage",
      "target": "",
      "attr_title": "",
      "description": "",
      "classes": [""],
      "xfn": ""
    },
    {
      "ID": 45,
      "post_author": "1",
      "post_date": "2022-11-08 20:58:20",
      "post_date_gmt": "2022-11-03 09:42:06",
      "post_content": " ",
      "post_title": "",
      "post_excerpt": "",
      "post_status": "publish",
      "comment_status": "closed",
      "ping_status": "closed",
      "post_password": "",
      "post_name": "45",
      "to_ping": "",
      "pinged": "",
      "post_modified": "2022-11-08 20:58:20",
      "post_modified_gmt": "2022-11-08 20:58:20",
      "post_content_filtered": "",
      "post_parent": 0,
      "guid": "http://wpreact.test/?p=45",
      "menu_order": 2,
      "post_type": "nav_menu_item",
      "post_mime_type": "",
      "comment_count": "0",
      "filter": "raw",
      "db_id": 45,
      "menu_item_parent": "0",
      "object_id": "24",
      "object": "page",
      "type": "post_type",
      "type_label": "Page",
      "url": "/sample/",
      "title": "Another pages",
      "target": "",
      "attr_title": "",
      "description": "",
      "classes": [""],
      "xfn": ""
    },
    {
      "ID": 44,
      "post_author": "1",
      "post_date": "2022-11-08 20:58:20",
      "post_date_gmt": "2022-11-03 09:42:06",
      "post_content": " ",
      "post_title": "",
      "post_excerpt": "",
      "post_status": "publish",
      "comment_status": "closed",
      "ping_status": "closed",
      "post_password": "",
      "post_name": "44",
      "to_ping": "",
      "pinged": "",
      "post_modified": "2022-11-08 20:58:20",
      "post_modified_gmt": "2022-11-08 20:58:20",
      "post_content_filtered": "",
      "post_parent": 0,
      "guid": "http://wpreact.test/?p=44",
      "menu_order": 3,
      "post_type": "nav_menu_item",
      "post_mime_type": "",
      "comment_count": "0",
      "filter": "raw",
      "db_id": 44,
      "menu_item_parent": "0",
      "object_id": "41",
      "object": "page",
      "type": "post_type",
      "type_label": "Page",
      "url": "/special/",
      "title": "Special Page",
      "target": "",
      "attr_title": "",
      "description": "",
      "classes": [""],
      "xfn": ""
    },
    {
      "ID": 64,
      "post_author": "1",
      "post_date": "2022-11-08 20:58:20",
      "post_date_gmt": "2022-11-04 17:30:50",
      "post_content": "Some projects of something",
      "post_title": "",
      "post_excerpt": "",
      "post_status": "publish",
      "comment_status": "closed",
      "ping_status": "closed",
      "post_password": "",
      "post_name": "64",
      "to_ping": "",
      "pinged": "",
      "post_modified": "2022-11-08 20:58:20",
      "post_modified_gmt": "2022-11-08 20:58:20",
      "post_content_filtered": "",
      "post_parent": 0,
      "guid": "http://wpreact.test/?p=64",
      "menu_order": 4,
      "post_type": "nav_menu_item",
      "post_mime_type": "",
      "comment_count": "0",
      "filter": "raw",
      "db_id": 64,
      "menu_item_parent": "0",
      "object_id": "-10",
      "object": "project",
      "type": "post_type_archive",
      "title": "All Projects",
      "type_label": "Post Type Archive",
      "url": "/project/",
      "target": "",
      "attr_title": "",
      "description": "Some projects of something",
      "classes": [""],
      "xfn": ""
    }
  ]
}
```

</details>

#### Error Response

| Status | Code |
| :----- | ---: |
| -      |    - |

## 🌐 Post Types

| Method | URL                              | Needs Auth |
| :----- | :------------------------------- | ---------: |
| `GET`  | `/wp-json/wpreact/v1/post-types` |      false |

#### Success Response

| Status |  Code |
| :----- | ----: |
| OK     | `200` |

<details>
<summary>Example 200 Response</summary>

```json
{[
 {
  "name": "page",
  "label": "Pages",
  "labels": {
   "name": "Pages",
   "singular_name": "Page",
   "add_new": "Add New",
   "add_new_item": "Add New Page",
   "edit_item": "Edit Page",
   "new_item": "New Page",
   "view_item": "View Page",
   "view_items": "View Pages",
   "search_items": "Search Pages",
   "not_found": "No pages found.",
   "not_found_in_trash": "No pages found in Trash.",
   "parent_item_colon": "Parent Page:",
   "all_items": "All Pages",
   "archives": "Page Archives",
   "attributes": "Page Attributes",
   "insert_into_item": "Insert into page",
   "uploaded_to_this_item": "Uploaded to this page",
   "featured_image": "Featured image",
   "set_featured_image": "Set featured image",
   "remove_featured_image": "Remove featured image",
   "use_featured_image": "Use as featured image",
   "filter_items_list": "Filter pages list",
   "filter_by_date": "Filter by date",
   "items_list_navigation": "Pages list navigation",
   "items_list": "Pages list",
   "item_published": "Page published.",
   "item_published_privately": "Page published privately.",
   "item_reverted_to_draft": "Page reverted to draft.",
   "item_scheduled": "Page scheduled.",
   "item_updated": "Page updated.",
   "item_link": "Page Link",
   "item_link_description": "A link to a page.",
   "menu_name": "Pages",
   "name_admin_bar": "Page"
  },
  "description": "",
  "public": true,
  "hierarchical": true,
  "exclude_from_search": false,
  "publicly_queryable": false,
  "show_ui": true,
  "show_in_menu": true,
  "show_in_nav_menus": true,
  "show_in_admin_bar": true,
  "menu_position": 20,
  "menu_icon": "dashicons-admin-page",
  "capability_type": "page",
  "map_meta_cap": true,
  "register_meta_box_cb": null,
  "taxonomies": [],
  "has_archive": false,
  "query_var": false,
  "can_export": true,
  "delete_with_user": true,
  "template": [],
  "template_lock": false,
  "_builtin": true,
  "_edit_link": "post.php?post=%d",
  "cap": {
   "edit_post": "edit_page",
   "read_post": "read_page",
   "delete_post": "delete_page",
   "edit_posts": "edit_pages",
   "edit_others_posts": "edit_others_pages",
   "delete_posts": "delete_pages",
   "publish_posts": "publish_pages",
   "read_private_posts": "read_private_pages",
   "read": "read",
   "delete_private_posts": "delete_private_pages",
   "delete_published_posts": "delete_published_pages",
   "delete_others_posts": "delete_others_pages",
   "edit_private_posts": "edit_private_pages",
   "edit_published_posts": "edit_published_pages",
   "create_posts": "edit_pages"
  },
  "rewrite": false,
  "show_in_rest": true,
  "rest_base": "pages",
  "rest_namespace": "wp\/v2",
  "rest_controller_class": "WP_REST_Posts_Controller",
  "rest_controller": {}
 },
 {
  "name": "project",
  "label": "Projects",
  "labels": {
   "name": "Projects",
   "singular_name": "Project",
   "add_new": "Add New",
   "add_new_item": "Add New Project",
   "edit_item": "Edit Project",
   "new_item": "New Post",
   "view_item": "View Project",
   "view_items": "View Posts",
   "search_items": "Search Project",
   "not_found": "Not Found",
   "not_found_in_trash": "Not found in Trash",
   "parent_item_colon": "Parent Project",
   "all_items": "All Projects",
   "archives": "All Projects",
   "attributes": "Post Attributes",
   "insert_into_item": "Insert into post",
   "uploaded_to_this_item": "Uploaded to this post",
   "featured_image": "Featured image",
   "set_featured_image": "Set featured image",
   "remove_featured_image": "Remove featured image",
   "use_featured_image": "Use as featured image",
   "filter_items_list": "Filter posts list",
   "filter_by_date": "Filter by date",
   "items_list_navigation": "Posts list navigation",
   "items_list": "Posts list",
   "item_published": "Post published.",
   "item_published_privately": "Post published privately.",
   "item_reverted_to_draft": "Post reverted to draft.",
   "item_scheduled": "Post scheduled.",
   "item_updated": "Post updated.",
   "item_link": "Post Link",
   "item_link_description": "A link to a post.",
   "menu_name": "Projects",
   "update_item": "Update Project",
   "name_admin_bar": "Project"
  },
  "description": "Some projects of something",
  "public": true,
  "hierarchical": false,
  "exclude_from_search": false,
  "publicly_queryable": true,
  "show_ui": true,
  "show_in_menu": true,
  "show_in_nav_menus": true,
  "show_in_admin_bar": true,
  "menu_position": 5,
  "menu_icon": "dashicons-arrow-right-alt",
  "capability_type": "post",
  "map_meta_cap": true,
  "register_meta_box_cb": null,
  "taxonomies": [
   "genres"
  ],
  "has_archive": true,
  "query_var": "project",
  "can_export": true,
  "delete_with_user": null,
  "template": [],
  "template_lock": false,
  "_builtin": false,
  "_edit_link": "post.php?post=%d",
  "cap": {
   "edit_post": "edit_post",
   "read_post": "read_post",
   "delete_post": "delete_post",
   "edit_posts": "edit_posts",
   "edit_others_posts": "edit_others_posts",
   "delete_posts": "delete_posts",
   "publish_posts": "publish_posts",
   "read_private_posts": "read_private_posts",
   "read": "read",
   "delete_private_posts": "delete_private_posts",
   "delete_published_posts": "delete_published_posts",
   "delete_others_posts": "delete_others_posts",
   "edit_private_posts": "edit_private_posts",
   "edit_published_posts": "edit_published_posts",
   "create_posts": "edit_posts"
  },
  "rewrite": {
   "slug": "project",
   "with_front": true,
   "pages": true,
   "feeds": true,
   "ep_mask": 1
  },
  "show_in_rest": true,
  "rest_base": false,
  "rest_namespace": "wp\/v2",
  "rest_controller_class": false,
  "rest_controller": {}
 }
]}
```

</details>

#### Error Response

| Status | Code |
| :----- | ---: |
| -      |    - |

## 🌐 Post Type

| Method | URL                                                    | Needs Auth |
| :----- | :----------------------------------------------------- | ---------: |
| `GET`  | `/wp-json/wpreact/v1/post-type/:post-type/:post-slug ` |      false |

#### Request Query Parameters

| Property Name     | Value Type  | Required | Description                                          |
| :---------------- | :---------- | :------- | :--------------------------------------------------- |
| `relation`        | `AND \| OR` | false    | Relation of filter                                   |
| `<taxonomy-slug>` | `string[]`  | false    | Filter Posts assigned to queried Taxonomy with Value |

#### Request Query Parameters Example

```json
{
  "tag": ["dev", "backend", "code"],
  "category": ["uncategorized"]
}
```

#### Success Response

| Status |  Code |
| :----- | ----: |
| OK     | `200` |

<details>
<summary>Example 200 Response</summary>

```json
[
  {
    "ID": 52,
    "post_author": "1",
    "post_date": "2022-11-04 08:05:59",
    "post_date_gmt": "2022-11-04 08:05:59",
    "post_content": "",
    "post_title": "Dev project",
    "post_excerpt": "",
    "post_status": "publish",
    "comment_status": "closed",
    "ping_status": "closed",
    "post_password": "",
    "post_name": "dev-project",
    "to_ping": "",
    "pinged": "",
    "post_modified": "2022-11-04 08:05:59",
    "post_modified_gmt": "2022-11-04 08:05:59",
    "post_content_filtered": "",
    "post_parent": 0,
    "guid": "http://wpreact.test/?post_type=project&#038;p=52",
    "menu_order": 0,
    "post_type": "project",
    "post_mime_type": "",
    "comment_count": "0",
    "filter": "raw",
    "url": "/project/dev-project/",
    "acf": {
      "body": ""
    }
  },
  {
    "ID": 33,
    "post_author": "1",
    "post_date": "2022-07-04 17:03:15",
    "post_date_gmt": "2022-07-04 17:03:15",
    "post_content": "",
    "post_title": "Sample Project",
    "post_excerpt": "",
    "post_status": "publish",
    "comment_status": "closed",
    "ping_status": "closed",
    "post_password": "",
    "post_name": "sample-project",
    "to_ping": "",
    "pinged": "",
    "post_modified": "2022-11-04 17:14:35",
    "post_modified_gmt": "2022-11-04 17:14:35",
    "post_content_filtered": "",
    "post_parent": 0,
    "guid": "http://wpreact.test/?post_type=project&#038;p=33",
    "menu_order": 0,
    "post_type": "project",
    "post_mime_type": "",
    "comment_count": "0",
    "filter": "raw",
    "url": "/project/sample-project/",
    "acf": {
      "body": "Sample Project"
    }
  }
]
```

</details>

#### Error Response

| Status | Code |
| :----- | ---: |
| -      |    - |

## 🌐 Taxonomies

| Method | URL                              | Needs Auth |
| :----- | :------------------------------- | ---------: |
| `GET`  | `/wp-json/wpreact/v1/taxonomies` |      false |

#### Request Query Parameters

| Property Name | Value Type | Required | Description                                      |
| :------------ | :--------- | :------- | :----------------------------------------------- |
| `post_type`   | `string[]` | false    | Filter Taxonomies assigned to queried Post Types |

#### Request Query Parameters Example

```json
{
  "post_type": ["project"]
}
```

#### Success Response

| Status |  Code |
| :----- | ----: |
| OK     | `200` |

<details>
<summary>Example 200 Response</summary>

```json
[
  {
    "slug": "category",
    "label": "Categories",
    "available_in": ["page", "project"],
    "terms": [
      {
        "term_id": 1,
        "name": "Uncategorized",
        "slug": "uncategorized",
        "term_group": 0,
        "term_taxonomy_id": 1,
        "taxonomy": "category",
        "description": "",
        "parent": 0,
        "count": 0,
        "filter": "raw"
      }
    ]
  },
  {
    "slug": "tag",
    "label": "Tags",
    "available_in": ["project"],
    "terms": [
      {
        "term_id": 9,
        "name": "backend",
        "slug": "backend",
        "term_group": 0,
        "term_taxonomy_id": 9,
        "taxonomy": "tag",
        "description": "",
        "parent": 0,
        "count": 1,
        "filter": "raw"
      },
      {
        "term_id": 7,
        "name": "dev",
        "slug": "dev",
        "term_group": 0,
        "term_taxonomy_id": 7,
        "taxonomy": "tag",
        "description": "",
        "parent": 0,
        "count": 2,
        "filter": "raw"
      },
      {
        "term_id": 8,
        "name": "frontend",
        "slug": "frontend",
        "term_group": 0,
        "term_taxonomy_id": 8,
        "taxonomy": "tag",
        "description": "",
        "parent": 0,
        "count": 1,
        "filter": "raw"
      }
    ]
  },
  {
    "slug": "topic",
    "label": "Topics",
    "available_in": ["project"],
    "terms": []
  }
]
```

</details>

#### Error Response

| Status | Code |
| :----- | ---: |
| -      |    - |

## 🌐 Taxonomy

| Method | URL                                            | Needs Auth |
| :----- | :--------------------------------------------- | ---------: |
| `GET`  | `/wp-json/wpreact/v1/taxonomy/:taxonomy-slug ` |      false |

#### Request Query Parameters

| Property Name | Value Type | Required | Description                                          |
| :------------ | :--------- | :------- | :--------------------------------------------------- |
| `where`       | `string[]` | false    | Filter Posts assigned to queried Taxonomy with Value |

#### Request Query Parameters Example

```json
{
  "where": ["dev"]
}
```

#### Success Response

| Status |  Code |
| :----- | ----: |
| OK     | `200` |

<details>
<summary>Example 200 Response</summary>

```json
[
  {
    "ID": 52,
    "post_author": "1",
    "post_date": "2022-11-04 08:05:59",
    "post_date_gmt": "2022-11-04 08:05:59",
    "post_content": "",
    "post_title": "Dev project",
    "post_excerpt": "",
    "post_status": "publish",
    "comment_status": "closed",
    "ping_status": "closed",
    "post_password": "",
    "post_name": "dev-project",
    "to_ping": "",
    "pinged": "",
    "post_modified": "2022-11-04 08:05:59",
    "post_modified_gmt": "2022-11-04 08:05:59",
    "post_content_filtered": "",
    "post_parent": 0,
    "guid": "http://wpreact.test/?post_type=project&#038;p=52",
    "menu_order": 0,
    "post_type": "project",
    "post_mime_type": "",
    "comment_count": "0",
    "filter": "raw",
    "url": "/project/dev-project/",
    "acf": {
      "body": ""
    }
  },
  {
    "ID": 33,
    "post_author": "1",
    "post_date": "2022-07-04 17:03:15",
    "post_date_gmt": "2022-07-04 17:03:15",
    "post_content": "",
    "post_title": "Sample Project",
    "post_excerpt": "",
    "post_status": "publish",
    "comment_status": "closed",
    "ping_status": "closed",
    "post_password": "",
    "post_name": "sample-project",
    "to_ping": "",
    "pinged": "",
    "post_modified": "2022-11-04 17:14:35",
    "post_modified_gmt": "2022-11-04 17:14:35",
    "post_content_filtered": "",
    "post_parent": 0,
    "guid": "http://wpreact.test/?post_type=project&#038;p=33",
    "menu_order": 0,
    "post_type": "project",
    "post_mime_type": "",
    "comment_count": "0",
    "filter": "raw",
    "url": "/project/sample-project/",
    "acf": {
      "body": "Sample Project"
    }
  }
]
```

</details>

#### Error Response

| Status | Code |
| :----- | ---: |
| -      |    - |
