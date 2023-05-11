import type { AwesomeFontIconIdentifier } from 'datocms-plugin-sdk'

export enum PageType {
  MainNavigationTabs = 'mainNavigationTabs',
  ContentAreaSidebarItems = 'contentAreaSidebarItems',
  SettingsAreaSidebarItemGroups = 'settingsAreaSidebarItemGroups',
}

export enum PlacementType {
  Before = 'before',
  After = 'after',
  MenuItems = 'menuItems',
  Settings = 'settings',
  Environment = 'environment',
  Project = 'project',
  Permissions = 'permissions',
  Webhooks = 'webhooks',
  Deployment = 'deployment',
  SSO = 'sso',
  AuditLog = 'auditLog',
  Usage = 'usage',
  Content = 'content',
  MediaArea = 'mediaArea',
  ApiExplorer = 'apiExplorer',
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
