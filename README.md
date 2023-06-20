# DatoCMS plugin: Custom page

**This DatoCMS plugin adds the ability to have custom pages in your DatoCMS instance. These pages can be anything and will be rendered inside an iframe in your DatoCMS instance. With custom placement of the menu items and ability to add any page you have the freedom to add any page to your DatoCMS instance.**

![](https://github.com/voorhoede/datocms-plugin-custom-page/raw/main/docs/preview.png)

## Features

* Custom pages
* Multiple pages
* Custom documentation
* Custom menu item
* Choose the placement of a menu item

## Configuration

First add this plugin via DatoCMS Settings > Plugins > Add (`/admin/plugins/new`).

### Plugin settings

For this plugin you can configure global settings to make the plugin behave as you want.

![](https://github.com/voorhoede/datocms-plugin-custom-page/raw/main/docs/custom-page-settings.png)

By clicking on the `+` button you can add a page and have multiple custom pages in your DatoCMS instance.

#### Location of the menu item
*Where do you want to show the menu item?*

You can choose between
* Top menu
* Side menu
* Settings menu

**Top menu** will show the menu item as first item in the top navigation bar

![](https://github.com/voorhoede/datocms-plugin-custom-page/raw/main/docs/custom-page-top-menu.png)

**Side menu** will show the menu item as first item in the sidebar on the content pages

![](https://github.com/voorhoede/datocms-plugin-custom-page/raw/main/docs/custom-page-sidebar.png)

**Settings menu** will show the menu item as first item in the sidebar on the setting pages

![](https://github.com/voorhoede/datocms-plugin-custom-page/raw/main/docs/custom-page-sidebar-settings.png)

#### Before or after placement of the menu item
*Show the menu item before or after the other menu items?*

You can choose between
* Before menu item
* After menu item

This will show the menu item relative to the menu item selected in the next setting

#### Placement of the menu item relative to other menu items
*Before/After which menu item do you want to show the menu item?*

Depending on the location of the menu item you can choose between the existing menu items in your DatoCMS instance.

#### Name of the page group (only when location is `Settings menu`)
*What is the title of the menu item?*

This will be the group title of the menu item and is shown in the sidebar as a title above the menu item

#### Name of the page
*What is the name of the page?*

This will be the label of the menu item and will be slugified to use as slug in the url

#### Kind of icon
*What kind of icon do you want to show?*

This needs to be a solid Font Awesome v6 icon name. (https://fontawesome.com/v6/search?o=r&s=solid)

#### Page to embed
*What page do you want to embed?*

This field needs to be an existing URL you can embed (like `https://voorhoede.nl/`)

## Contributing

See [contributing.md](https://github.com/voorhoede/datocms-plugin-custom-page/blob/main/contributing.md).
