import type { AwesomeFont5SolidIconIdentifier } from 'datocms-plugin-sdk'
import { PageType } from './types'

export const defaultPageName = 'Custom page'
export const defaultPageSlug = 'custom-page'
export const defaultIconName: AwesomeFont5SolidIconIdentifier = 'cog'

export const pageTypeOptions = [
  { label: 'Top menu', value: PageType.MainNavigationTabs },
  { label: 'Side menu', value: PageType.ContentAreaSidebarItems },
  { label: 'Settings menu', value: PageType.SettingsAreaSidebarItemGroups },
]
