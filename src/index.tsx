import {
  connect,
  IntentCtx,
  RenderConfigScreenCtx,
  RenderPageCtx,
  OnBootCtx,
} from 'datocms-plugin-sdk'

import ConfigScreen from './entrypoints/ConfigScreen/ConfigScreen'
import PageScreen from './entrypoints/PageScreen/PageScreen'
import { render } from './utils/render'
import { GlobalParameters, PageType } from './lib/types'
import {
  defaultIconName,
  defaultPageName,
  defaultPageSlug,
} from './lib/constants'

import 'datocms-react-ui/styles.css'
import './styles/index.css'

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

    return [
      {
        label: pluginParameters.pageName || defaultPageName,
        icon: pluginParameters.iconName || defaultIconName,
        placement: ['before', 'content'],
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
    return [
      {
        label: pluginParameters.pageName || defaultPageName,
        icon: defaultIconName,
        placement: ['before', 'menuItems'],
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
    return [
      {
        label: 'Custom page',
        placement: ['before', 'permissions'],
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
  },
})
