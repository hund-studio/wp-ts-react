# Use React Templates

**wp-ts-react** fetches the routes created by WordPress and forwards them to a React Router instance which will take care of loading the right React template.

> ⚠️ **wp-ts-react** will only handle routes for entities registered through the [WordPress Configuration](./WORDPRESS_CONFIGURATION.md) system. If you create a Custom Post Type through the WordPress Admin, you will need to create a Post Type configuration file to make it work.

📍 All the frontend-related files are stored inside the `/views` folder.

Except for the `/views/pages` folder you can organize your filesystem as you wish, this repository comes with a suggested structure and with some useful hooks and components. Feel free to delete them and create your filesystem.

## The entry `_app.tsx` file

The `/views/pages/_app.tsx` file is the entry point of the React frontend. Use it to include global styles and to create your "base" page layout (ae. if all your pages have the same footer you can insert it here).

Use the `<Page />` component to render the current React template. It will render the React template relative to the current requested content. See below how to create React templates for registered Post Types and Custom Templates.

```typescript
// 📄 /views/pages/_app.tsx
import { FC, Fragment } from "react";
import Page from "@core/page";

import "./../styles/global.scss";

const App: FC = () => {
	return (
		<Fragment>
			<Page />
			<footer>This footer is common to all templates</footer>
		</Fragment>
	);
};

export default App;
```

[See below](#use-page-layouts) how to implement multiple common layouts.

## The default `index.tsx` file

> ⚠️ It is required to use **wp-ts-react** that you define a custom Front Page on the WordPress Admin. You can choose it from `Settings > Reading > Custom Front Page`.

The `index.tsx` file of the `/views/pages/` folder renders the React Template for the selected Front Page.
You can access WordPress backend data using the `({data})` props. You can find more info about [Fetching WordPress data](#access-wordpress-data-on-frontend) at the end of this page.

This is an example Front Page template:

```typescript
// 📄 /views/pages/index.tsx
const Index: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Front Page</h1>
			<p>This is the Front Page layout.</p>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

export default Index;
```

## Post Types and Custom Templates

To create a template for a Custom, or Default, Post Type you must simply create a `.tsx` file with the same name as the relative configuration file. In the [WordPress Configuration](./WORDPRESS_CONFIGURATION.md#custom-post-type) section, we registered a `Page` Post Type and a `Project` Post Type, to create a React template for the single page you will have to create a `page.tsx` file inside the `/views/pages` folder.

Each file must export a React `Page` Component as default to be dynamically imported inside the Router.

```typescript
// 📄 /views/pages/page.tsx
const Page: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Page</h1>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

export default Page;
```

To see this template you must create a new page (ae. with the title `Sample Page`) on your WordPress Admin and visit `https://yourdomain.com/sample-page`.

If you registered a Post Type that has an archive page (such as we did for the `Project` Custom Post Type) you can specify a custom template for the **single** project and the project **archive** using this notation `post-type-slug:<single|archive>.tsx`. If no `post-type-slug:single.tsx` or `post-type-slug:archive.tsx` files have been created, **wp-ts-react** will automatically look for a `post-type-slug.tsx` file.

This is an example Project Archive template:

```typescript
// 📄 /views/pages/project:single.tsx
const ProjectSingle: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Single Project page</h1>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

export default ProjectSingle;
```

To see this template you must create a new project (ae. with the title `Sample Project`) on your WordPress Admin and visit `https://yourdomain.com/sample-project`.

### Custom React Templates

The same logic applies to [Registered Custom Templates](./WORDPRESS_CONFIGURATION.md#custom-templates).
If you registered a `Special` template you have to match the same name, ae. `special.tsx`:

```typescript
// 📄 /views/pages/special.tsx
const SpecialTemplate: Page = ({ data }: any) => {
	return (
		<main>
			<h1>This page uses a Special Template</h1>
			<p>
				This page uses the
				<mark>
					<code>special-template.tsx</code>
				</mark>
				template.
			</p>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

export default SpecialTemplate;
```

If you apply a special template to a Post Type you override the default template of that page. If you assign a `Special` template to a page the `special.tsx` file will be used instead of the default `page.tsx` o `page:single.tsx`.

## Use page Layouts

The `Page` type automatically declares a `layout` property that you can set to render some specific layouts without implementing them inside the `_app.tsx` file.

> 👨‍🏫️ **Example scenery**: you need to develop two different page layouts, one with the menu at the top and one with the menu at the bottom. You can create two different layout components and pass the entire page content to them using the ({page}) property.

This is an example file that registers a `MenuOnBottom` layout:

```typescript
// 📄 /views/layouts/MenuOnBottom/MenuOnBottom.tsx
import Header from "../../components/Header/header";

export const MenuOnBottom: Layout = ({ page }) => {
	return (
		<div>
			{page}
			<Header />
		</div>
	);
};
```

The `({page})` props will contain the export of the `_app.tsx` file.
The same structure can be used to create a `MenuOnTop` layout:

```typescript
// 📄 /views/layouts/MenuOnTop/MenuOnTop.tsx
import Header from "../../components/Header/header";

export const MenuOnTop: Layout = ({ page }) => {
	return (
		<div>
			<Header />
			{page}
		</div>
	);
};
```

Now you can assing them to a React Page Template using the `layout` key.
This is an example file that adds the `MenuOnBottom` layout to a Page:

```typescript
import { MenuOnBottom } from "@views/layouts/MenuOnBottom/menuOnBottom";

const Page: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Page</h1>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

Page.layout = MenuOnBottom;

export default Page;
```

This is an example file that adds the `MenuOnTop` layout to a Project:

```typescript
import { MenuOnTop } from "@views/layouts/MenuOnTop/menuOnTop";

const Project: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Project</h1>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

Project.layout = MenuOnTop;

export default Project;
```

## Access WordPress Data on frontend

To access WordPress data on frontend you just have to add `({data})` as a parameter of the rendering function. `data` prop will contain all the WordPress info about the requested page.

> ⚠️ If you have an active installation of ACF or ACF Pro `({data})` object will have an `acf` key containing all the custom data.
