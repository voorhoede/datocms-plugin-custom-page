# DatoCMS plugin: Custom page

**This DatoCMS plugin adds the ability to have a custom page in your DatoCMS instance. This page can be anything and will be rendered inside an iframe in your DatoCMS instance. With custom placement of the menu items and ability to add any page you have the freedom to add any page to your DatoCMS instance.**

![](https://github.com/voorhoede/datocms-plugin-custom-page/raw/main/docs/preview.png)

## Features

* Custom page
* Custom documentation
* Custom menu item
* Choose the location of a menu item

## Configuration

First add this plugin via DatoCMS Settings > Plugins > Add (`/admin/plugins/new`).

### Plugin settings

For this plugin you can configure global settings to make the plugin behave as you want.
![](https://github.com/voorhoede/datocms-plugin-custom-page/raw/main/docs/custom-page-settings.png)

#### Name of the page
*What is the name of the page?*

This will be the label of the menu item and will be slugified to use as slug in the url

#### Placement of the menu item
*Where do you want to show the menu item?*

You can choose between
* Top menu
* Side menu
* Settings menu

**Top menu** will show the menu item as first item in the top navigation bar
![](https://github.com/voorhoede/datocms-plugin-custom-page/raw/main/docs/custom-page-top-menu.png)

**Side menu** will show the menu item as first item in the sidebar on the content pages
![](https://github.com/voorhoede/datocms-plugin-custom-page/raw/main/docs/custom-sidebar.png)

**Settings menu** will show the menu item as first item in the sidebar on the setting pages
![](https://github.com/voorhoede/datocms-plugin-custom-page/raw/main/docs/custom-page-sidebar-settings.png)

#### Kind of icon
*What kind of icon do you want to show?*

This needs to be a solid Font Awesome v5 icon name. (https://fontawesome.com/v5/search?o=r&s=solid)

#### Page to embed
*What page do you want to embed?*

This field needs to be an existing URL you can embed (like `https://voorhoede.nl/`)

## Contributing

See [contributing.md](https://github.com/voorhoede/datocms-plugin-custom-page/blob/main/contributing.md).

## License

*MIT Licensed* by [De Voorhoede](https://www.voorhoede.nl).
