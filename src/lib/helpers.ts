import { Page, PageType, MenuItemPlacementOption } from './types'
import {
  settingsAreaSidebarItemPlacement,
  contentAreaSidebarItemPlacement,
  mainNavigationTabPlacement,
} from './constants'

export function getMenuItemPlacements(
  pageType: PageType
): MenuItemPlacementOption[] {
  if (pageType === PageType.SettingsAreaSidebarItemGroups) {
    return settingsAreaSidebarItemPlacement
  }

  if (pageType === PageType.ContentAreaSidebarItems) {
    return contentAreaSidebarItemPlacement
  }

  return mainNavigationTabPlacement
}

export function checkAndGetId(id: string, pages: Page[]): string {
  let idToCheck = id
  const idExists = pages.find((obj) => obj.pageSlug === id)

  if (idExists) {
    return checkAndGetId(`${idToCheck}-1`, pages)
  }

  return idToCheck
}
