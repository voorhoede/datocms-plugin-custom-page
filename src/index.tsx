import {
  connect,
  IntentCtx,
  RenderConfigScreenCtx,
  RenderPageCtx,
  OnBootCtx,
  MainNavigationTab,
  ContentAreaSidebarItem,
  SettingsAreaSidebarItemGroup,
} from 'datocms-plugin-sdk'
import { Canvas } from 'datocms-react-ui'

import ConfigScreen from './entrypoints/ConfigScreen/ConfigScreen'
import PageScreen from './entrypoints/PageScreen/PageScreen'
import PageNotFoundScreen from './entrypoints/PageNotFoundScreen/PageNotFoundScreen'
import { render } from './lib/render'
import { migrateData } from './lib/migrateData'
import { GlobalParameters, PageType } from './lib/types'
import {
  contentAreaSidebarItemPlacement,
  defaultIconName,
  defaultPageName,
  defaultPageSlug,
  mainNavigationTabPlacement,
  placementOptions,
  settingsAreaSidebarItemPlacement,
} from './lib/constants'

import './styles/index.css'

connect({
  async onBoot(ctx: OnBootCtx) {
    await migrateData(ctx)
  },
  renderConfigScreen(ctx: RenderConfigScreenCtx) {
    return render(<ConfigScreen ctx={ctx} />)
  },
  mainNavigationTabs(ctx: IntentCtx) {
    const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters
    const pages = pluginParameters?.pages
      ? pluginParameters?.pages.filter(
          (page) =>
            !page.pageType ||
            page.pageType.value === PageType.MainNavigationTabs,
        )
      : []

    if (pages.length < 1) {
      return []
    }

    const tabs = pages.map((page) => {
      const placement = [
        page.placement?.value || placementOptions[0].value,
        page.menuItemPlacement?.value || mainNavigationTabPlacement[0].value,
      ] as MainNavigationTab['placement']
      return {
        label: page.pageName || defaultPageName,
        icon: page.iconName || defaultIconName,
        placement,
        pointsTo: {
          pageId: page.pageSlug || defaultPageSlug,
        },
      }
    })

    return tabs
  },
  contentAreaSidebarItems(ctx: IntentCtx) {
    const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters
    const pages = pluginParameters?.pages
      ? pluginParameters?.pages.filter(
          (page) => page.pageType?.value === PageType.ContentAreaSidebarItems,
        )
      : []

    if (pages.length < 1) {
      return []
    }

    const tabs = pages.map((page) => {
      const placement = [
        page.placement?.value || placementOptions[0].value,
        page.menuItemPlacement?.value ||
          contentAreaSidebarItemPlacement[0].value,
      ] as ContentAreaSidebarItem['placement']
      return {
        label: page.pageName || defaultPageName,
        icon: page.iconName || defaultIconName,
        placement,
        pointsTo: {
          pageId: page.pageSlug || defaultPageSlug,
        },
      }
    })

    return tabs
  },
  settingsAreaSidebarItemGroups(ctx: IntentCtx) {
    const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters
    const pages = pluginParameters?.pages
      ? pluginParameters?.pages.filter(
          (page) =>
            page.pageType?.value === PageType.SettingsAreaSidebarItemGroups,
        )
      : []

    if (!ctx.currentRole.attributes.can_edit_schema || pages.length < 1) {
      return []
    }

    const tabs = pages.map((page) => {
      const placement = [
        page.placement?.value || placementOptions[0].value,
        page.menuItemPlacement?.value ||
          settingsAreaSidebarItemPlacement[0].value,
      ] as SettingsAreaSidebarItemGroup['placement']
      return {
        label: page.pageGroupName || defaultPageName,
        placement,
        items: [
          {
            label: page.pageName || defaultPageName,
            icon: page.iconName || defaultIconName,
            pointsTo: {
              pageId: page.pageSlug || defaultPageSlug,
            },
          },
        ],
      }
    })

    return tabs
  },
  renderPage(pageId, ctx: RenderPageCtx) {
    const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters
    const pages = pluginParameters?.pages || []

    for (const page of pages) {
      const pageSlug = page.pageSlug || defaultPageSlug
      if (pageId === pageSlug) {
        return render(
          <Canvas ctx={ctx}>
            <PageScreen page={page} />
          </Canvas>,
        )
      }
      render(<PageNotFoundScreen ctx={ctx} />)
    }

    return render(<PageNotFoundScreen ctx={ctx} />)
  },
})
