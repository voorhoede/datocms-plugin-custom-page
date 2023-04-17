import type { AwesomeFont5SolidIconIdentifier } from 'datocms-plugin-sdk'

export enum PageType {
  MainNavigationTabs = 'mainNavigationTabs',
  ContentAreaSidebarItems = 'contentAreaSidebarItems',
  SettingsAreaSidebarItemGroups = 'settingsAreaSidebarItemGroups',
}

export type GlobalParameters = {
  pageType?: PageTypeOption
  pageName?: string
  pageSlug?: string
  iconName?: AwesomeFont5SolidIconIdentifier
  pageEmbedUrl?: string
}

export type PageTypeOption = {
  value: PageType
  label: string
}
