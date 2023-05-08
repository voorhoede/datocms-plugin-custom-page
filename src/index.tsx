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

import ConfigScreen from './entrypoints/ConfigScreen/ConfigScreen'
import PageScreen from './entrypoints/PageScreen/PageScreen'
import { render } from './lib/render'
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

import 'datocms-react-ui/styles.css'
import './styles/index.css'
import PageNotFoundScreen from './entrypoints/PageNotFoundScreen/PageNotFoundScreen'

connect({
  async onBoot(ctx: OnBootCtx) {
    console.log(ctx, await ctx.getSettings())
  },
  renderConfigScreen(ctx: RenderConfigScreenCtx) {
    return render(<ConfigScreen ctx={ctx} />)
  },
  mainNavigationTabs(ctx: IntentCtx) {
    const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters

    if (
      pluginParameters.pageType &&
      pluginParameters.pageType.value !== PageType.MainNavigationTabs
    ) {
      return []
    }

    const placement = [
      pluginParameters.placement?.value || placementOptions[0].value,
      pluginParameters.menuItemPlacement?.value ||
        mainNavigationTabPlacement[0].value,
    ] as MainNavigationTab['placement']
    return [
      {
        label: pluginParameters.pageName || defaultPageName,
        icon: pluginParameters.iconName || defaultIconName,
        placement,
        pointsTo: {
          pageId: pluginParameters.pageSlug || defaultPageSlug,
        },
      },
    ]
  },
  contentAreaSidebarItems(ctx: IntentCtx) {
    const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters

    if (
      !pluginParameters.pageType ||
      pluginParameters.pageType?.value !== PageType.ContentAreaSidebarItems
    ) {
      return []
    }

    const placement = [
      pluginParameters.placement?.value || placementOptions[0].value,
      pluginParameters.menuItemPlacement?.value ||
        contentAreaSidebarItemPlacement[0].value,
    ] as ContentAreaSidebarItem['placement']
    return [
      {
        label: pluginParameters.pageName || defaultPageName,
        icon: defaultIconName,
        placement,
        pointsTo: {
          pageId: pluginParameters.pageSlug || defaultPageSlug,
        },
      },
    ]
  },
  settingsAreaSidebarItemGroups(ctx: IntentCtx) {
    const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters

    if (
      !ctx.currentRole.attributes.can_edit_schema ||
      !pluginParameters.pageType ||
      pluginParameters.pageType?.value !==
        PageType.SettingsAreaSidebarItemGroups
    ) {
      return []
    }

    const placement = [
      pluginParameters.placement?.value || placementOptions[0].value,
      pluginParameters.menuItemPlacement?.value ||
        settingsAreaSidebarItemPlacement[0].value,
    ] as SettingsAreaSidebarItemGroup['placement']
    return [
      {
        label: pluginParameters.pageGroupName || defaultPageName,
        placement,
        items: [
          {
            label: pluginParameters.pageName || defaultPageName,
            icon: defaultIconName,
            pointsTo: {
              pageId: pluginParameters.pageSlug || defaultPageSlug,
            },
          },
        ],
      },
    ]
  },
  renderPage(pageId, ctx: RenderPageCtx) {
    const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters
    const pageSlug = pluginParameters.pageSlug || defaultPageSlug
    if (pageId === pageSlug) {
      return render(<PageScreen ctx={ctx} />)
    }

    return render(<PageNotFoundScreen ctx={ctx} />)
  },
})
