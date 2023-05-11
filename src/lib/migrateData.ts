import { OnBootCtx } from 'datocms-plugin-sdk'
import { GlobalParameters } from './types'

export async function migrateData(ctx: OnBootCtx) {
  const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters
  const {
    pageType,
    pageGroupName,
    pageName,
    pageSlug,
    iconName,
    placement,
    menuItemPlacement,
    pageEmbedUrl,
  } = pluginParameters

  if (
    pageType ||
    pageGroupName ||
    pageName ||
    pageSlug ||
    iconName ||
    placement ||
    menuItemPlacement ||
    pageEmbedUrl
  ) {
    await ctx.updatePluginParameters({
      pages: [
        {
          pageType,
          pageGroupName,
          pageName,
          pageSlug,
          iconName,
          placement,
          menuItemPlacement,
          pageEmbedUrl,
        },
      ],
    })
  }
}
