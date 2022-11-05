# 📦 wp-ts-react

**wp-ts-react** is a WordPress theme preconfigured with a Typescript + React system which allows you to handle a minimal WordPress configuration and a React frontend development workflow in one repository.

|Index|
|:—|
|[Getting Started](#getting-started)|
|[Wordpress Configuration](/wordpress-configuration)|

## Getting Started

### Setup

#### [Method 1] Using GitHub templates

You can easily clone this starter as a new repository in your GitHub account by using the green button on the top right of the GitHub Repo

#### [Method 2] Manually cloning this repository

1. Clone this repository
2. Delete the existing `.git` folder
3. Install all required node_modules with `npm install`

```bash
git clone git@github.com:hund-studio/wp-ts-react.git
mv wp-ts-react my-project
cd my-project
sudo rm -r .git
```

4. If needed, and strongly recommended, `init` a new repository

```bash
git init
git remote add origin <remotegiturl>
git add .
git commit -m "Initial Commit"
git push --force origin master
```n

### Develop

Before proceeding you must install all required `node_modules` by running:

```bash
npm install
```

#### Scripts

There are 3 available commands which you can use depending on what are you working on:

- **Watch mode** to test your template on a local WordPress instance;
- **serve mode** to develop your UI using a remote staging WordPress instance;
- **build mode** to build your template for production upload.

`npm run watch`: start watching all your files for changes and build in real-time a local version of your theme inside the `/build` folder. You can symlink (Mac users should do it using `ln -s` command instead of **alias**) the `wp-ts-react` folder inside your local `/wp-content/themes` directory.

`npm run serve`: start a webpack-dev-server instance on port `localhost:3000` to develop the frontend with data from a remote **wp-ts-react** theme.

`npm run build`: build the production theme inside the `/build` folder and upload it on your server.