# Use Core Data Hooks to fetch data from WordPress

**wp-ts-react** use some custom API endpoints generated from the WordPress Configuration to exchange data between the backend and the React frontend.
If you need to access those data you can create a GET Request or you can import the available `swr` hooks from `@core/hooks`.

| Hook                             |
| :------------------------------- |
| [useData](#-usedata)             |
| [useMenus](#-usemenus)           |
| [usePostTypes](#-useposttypes)   |
| [usePostType](#-useposttype)     |
| [useTaxonomies](#-usetaxonomies) |

## 🪝 useData

This hook returns the current **Post** data.

## 🪝 useMenus

This hook returns the registered **Menus** and their **Items**.

## 🪝 usePostTypes

This hook returns the registered **Post Types**.

## 🪝 usePostType

This hook returns the **Posts** of a specific **Post Type**.
You can pass additional parameters to retrieve **Posts** filtered by **Taxonomy Term**.

### Hook Available Parameters

| Property Name     | Value Type  | Required | Default | Description                                |
| :---------------- | :---------- | :------- | :------ | :----------------------------------------- |
| `relation`        | `AND \| OR` | false    | `AND`   | Relation of filter                         |
| `<taxonomy-slug>` | `string[]`  | false    | -       | Filter by **Taxonomy** with **Term** value |
| `post_type`       | `string`    | false    | current | Select a specific **Post Type**            |

## 🪝 useTaxonomies

Return registered **Taxonomies** and their available **Taxonomy Terms**.
You can pass additional parameters to retrieve **Taxonomies** attached to a specific **Post Type**.

### Hook Available Parameters

| Property Name | Value Type | Required | Default | Description                                      |
| :------------ | :--------- | :------- | :------ | :----------------------------------------------- |
| `post_type`   | `string[]` | false    | current | Filter Taxonomies assigned to queried Post Types |
