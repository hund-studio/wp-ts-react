# 📦 wp-ts-react

![license](https://img.shields.io/github/license/hund-studio/wp-ts-react)
![version](https://img.shields.io/github/package-json/v/hund-studio/wp-ts-react)

**wp-ts-react** is a WordPress theme preconfigured with a Typescript + React system which allows you to handle a minimal WordPress configuration and a React frontend development workflow in one repository.

|     | Index                                                          |
| :-: | :------------------------------------------------------------- |
|     | [Statement](#statement)                                        |
| 👟  | [Getting Started](#getting-started)                            |
| 🛠️  | [Wordpress Configuration](./WORDPRESS_CONFIGURATION.md)        |
| 🔜  | [Use React templates](./USE_TEMPLATES.md)                      |
| 🔜  | [Available Core Components](./CORE_COMPONENTS.md)              |
| 🔜  | [Available Core Hooks](./CORE_HOOKS.md)                        |
|     | [Plugin Compatibility](#plugin-compatibility)                  |
| 🆘  | [Help, Issues and Contribution](#help-issues-and-contribution) |

## Statement

🔪 **Do you need a ready-to-go tool for small websites (such as one page and small portfolios) which needs to run on an old scrappy server of some super cheap hosting?**

🔪 **Are you willing to work with React but proper template integration with WordPress is a real pain?**

🔪 **Have you ever thought WordPress development is a hell of PHP templating, messy API, and does not fit your development workflow?**

🔪 **Have you ever noticed that SEO/Socials previews are a pain when dealing with Create React App frontend and headless WordPress?**

👌 Well, this repository is something you might be interested in.

## Getting Started

### Setup

#### Method 1 [Suggested]: Using GitHub templates

You can easily clone this starter as a new repository in your GitHub account by using the green button on the top right of the [GitHub Repository](https://github.com/hund-studio/wp-ts-react).

[![clone-button](./assets/clone-button.svg)](https://github.com/hund-studio/wp-ts-react/generate)

#### Method 2: Dowload a zip

You can easily download this starter as a `.zip` file using the `Code` dropdown on the top right of the [GitHub Repository](https://github.com/hund-studio/wp-ts-react).

[![download-button](./assets/download-button.svg)](https://github.com/hund-studio/wp-ts-react/archive/refs/heads/main.zip)

#### Method 3: Manually cloning this repository

1. Clone this repository;
2. Delete the existing `.git` folder;

   ```bash
   git clone git@github.com:hund-studio/wp-ts-react.git
   mv wp-ts-react my-project
   cd my-project
   sudo rm -r .git
   ```

3. If needed and strongly recommended, `git init` a new repository.

   ```bash
   git init
   git remote add origin <remotegiturl>
   git add .
   git commit -m "Initial Commit"
   git push --force origin master
   ```

### Develop

Before proceeding, you must install all required `node_modules` by running:

```bash
npm install
```

#### Scripts

There are three available modes that you can use depending on what you are working on:

- **Watch mode** to test your template on a local WordPress instance;
- **Serve mode** to develop your UI using a remote staging WordPress instance;
- **Build mode** to build your template for production upload.

Use `npm run watch` to start watching your files for changes and build, in real-time, a local version of your theme inside the `/build` folder. You can symlink (Mac users should do it using the `ln -s` command instead of **alias**) the `wp-ts-react` folder inside your local `/wp-content/themes` directory.

Use `npm run serve` to start a **Node** instance at `localhost:3000` to develop the React frontend while fetching data from a remote **wp-ts-react** theme.

Use `npm run build` to build the production theme inside the `/build` folder, ready to be uploaded on your server.

#### Configuration

Detailed documentation about WordPress configuration can be found [in this section](./WORDPRESS_CONFIGURATION.md).

To start there is one last thing to do: configure your WordPress instances. You can find all the basic configurations inside the `/config` folder inside your project root:

- `api.json`: contains the API configurations required for the theme to work. You will likely keep the default values but you can change them if your WordPress instance needs specific configuration (ae. you changed the default WordPress API endpoint for whatever reason);
- `app.json`: contains the HTML elements IDs used from the theme to exchange server-side rendered data with the React frontend. We suggest keeping the default values but you can change them if names are conflicting with other ids inside your project;
- `hosts.json`: contains the different target instances used from the scripts to build and compile your code:

  ⚠️ If you don't use a staging or local instance (strongly suggested by the way) you can set all three values to your production/local/staging instance.

  - `local` value is your local WordPress Instance which you would likely use to test your WordPress configuration and set up the theme backend configuration. This value is used to target your WordPress instance when in **watch mode**;
  - `staging` value is your remote development WordPress instance. This instance will be used in **serve mode** to fetch data through the API;
  - `production` value targets the production remote WordPress Instance and is used to build your production theme which will be uploaded to the production server.

### What's next

- [How to configure your WordPress instance](./WORDPRESS_CONFIGURATION.md): Create Custom Post Types, Taxonomies, Custom Templates, Custom API endpoints, Menus, and Options Pages directly from your theme to, almost, avoid the use of external plugins.

## Plugin Compatibility

To unlock the full potential of WordPress we added built-in support for a few, optional, well-known plugins. Full compatibility with the entire WordPress plugin ecosystem is not guaranteed but is presumed.

Here you can find a list with built-in supported plugins with their doc.

- [Advanced Custom Fields](https://www.advancedcustomfields.com/) (and its [Pro](https://www.advancedcustomfields.com/pro/) version): It can be used to implement additional Custom Fields on categories and post types. ACF fields will automatically be included in each page's data.
- [Rank Math](https://rankmath.com/): with this plugin page SEO is automatically handled by wp-ts-react.

## Help, Issues and Contribution

There is no direct support line available.
To report bugs, request new features, or ask for help, please file a new [Issue](https://github.com/hund-studio/support/issues) or visit our [Discussions page](https://github.com/hund-studio/support/discussions).
We will answer you as soon as possible.

|     | I need...                          | What to do?                                                                                                         |
| :-: | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| 🆘  | ...some help using this repository | [Search/Start a new Discussion](https://github.com/hund-studio/support/discussions/categories/q-a)                  |
| 👾  | ...to report a bug                 | [Search/Create an Issue for Bug Report](https://github.com/hund-studio/support/issues/new/choose)                   |
| 🆕  | ...to request a new feature        | [Search/Create an Issue for Feature Request](https://github.com/hund-studio/support/issues/new/choose)              |
| 📄  | ...help with documentation         | [Search/Start a new Discussion](https://github.com/hund-studio/support/discussions/categories/q-a)                  |
| 👆  | ...to create a pull request        | [Read: Collaborating with pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests) |

This tool is open to everybody's contribution, fork it, open a [Pull Request](https://github.com/hund-studio/wp-ts-react/pulls), or start a [Discussion](https://github.com/hund-studio/support/discussions/categories/ideas) to discuss improvements.
