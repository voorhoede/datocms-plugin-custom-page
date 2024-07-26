import type { AwesomeFontIconIdentifier } from 'datocms-plugin-sdk'

export enum PageType {
  MainNavigationTabs = 'mainNavigationTabs',
  ContentAreaSidebarItems = 'contentAreaSidebarItems',
  SettingsAreaSidebarItemGroups = 'settingsAreaSidebarItemGroups',
}

export enum PlacementType {
  Before = 'before',
  After = 'after',
  Content = 'content',
  Media = 'media',
  Schema = 'schema',
  Configuration = 'configuration',
  CdaPlayground = 'cdaPlayground',
  Properties = 'properties',
  Permissions = 'permissions',
  MenuItems = 'menuItems',
  SeoPreferences = 'seoPreferences',
}

export type Page = {
  pageType?: PageTypeOption
  pageGroupName?: string
  pageName?: string
  pageSlug?: string
  iconName?: AwesomeFontIconIdentifier
  placement?: PlacementOption
  menuItemPlacement?: MenuItemPlacementOption
  pageEmbedUrl?: string
}

export interface GlobalParameters extends Page {
  pages?: Page[]
}

export type PageTypeOption = {
  value: PageType
  label: string
}

export type PlacementOption = {
  value: PlacementType.Before | PlacementType.After
  label: string
}

export type MenuItemPlacementOption = {
  value: Omit<PlacementType, PlacementType.Before | PlacementType.After>
  label: string
}
