import { useState } from 'react'
import slugify from 'slugify'
import {
  RenderConfigScreenCtx,
  AwesomeFont5SolidIconIdentifier,
} from 'datocms-plugin-sdk'

import {
  Canvas,
  Form,
  SelectField,
  FieldGroup,
  TextField,
} from 'datocms-react-ui'
import { GlobalParameters, PageTypeOption } from '../../lib/types'
import { pageTypeOptions, defaultIconName } from '../../lib/constants'
import { icons } from '../../lib/icons'

type Props = {
  ctx: RenderConfigScreenCtx
}

const fontawesomeUrl = 'https://fontawesome.com/v5/search?o=r&s=solid'

export default function ConfigScreen({ ctx }: Props) {
  const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters
  const selectedPageType = pluginParameters?.pageType || pageTypeOptions[0]
  const [pageName, setPageName] = useState<GlobalParameters['pageName']>(
    pluginParameters.pageName
  )
  const [iconName, setIconName] = useState<string>(
    pluginParameters.iconName || defaultIconName
  )
  const [iconError, setIconError] = useState('')
  const [pageEmbedUrl, setPageEmbedUrl] = useState<
    GlobalParameters['pageEmbedUrl']
  >(pluginParameters.pageEmbedUrl)
  const [pageEmbedUrlError, setPageEmbedUrlError] = useState('')

  function saveSettings(settingToSave: Partial<GlobalParameters>) {
    ctx.updatePluginParameters({
      ...pluginParameters,
      ...settingToSave,
    })
    ctx.notice('Settings updated successfully!')
  }

  function isIconValid(iconName: AwesomeFont5SolidIconIdentifier) {
    if (iconName && !icons.includes(iconName)) {
      setIconError(
        `Icon not found. Use solid Fontawesome v5 icons: ${fontawesomeUrl}`
      )
      return false
    }
    setIconError('')
    return true
  }

  function isUrlValid(url: string) {
    try {
      new URL(url)
      setPageEmbedUrlError('')
      return true
    } catch (_) {
      setPageEmbedUrlError(
        `Invalid URL. Please enter a valid URL. Example: https://www.datocms.com`
      )
      return false
    }
  }

  return (
    <Canvas ctx={ctx}>
      <p>This DatoCMS plugin adds the ability to have a custom page in your DatoCMS instance.</p>

      <Form>
        <FieldGroup>
          <TextField
            name="pageName"
            id="pageName"
            label="What is the name of the page?"
            value={pageName}
            placeholder="Enter page name"
            textInputProps={{
              onBlur: (e) => {
                const pageNameValue = e.target.value
                const pageSlug = slugify(pageNameValue, {
                  lower: true,
                  strict: true,
                })
                if (
                  pageName !== pluginParameters.pageName ||
                  pageSlug !== pluginParameters.pageSlug
                ) {
                  saveSettings({ pageName: pageNameValue, pageSlug })
                }
              },
            }}
            onChange={(newValue) => setPageName(newValue)}
          />

          <SelectField
            name="pageType"
            id="pageType"
            label="Where do you want to show the menu item?"
            value={selectedPageType}
            selectInputProps={{
              options: pageTypeOptions,
            }}
            onChange={(newValue) => {
              const pageTypeValue = newValue as PageTypeOption
              saveSettings({ pageType: pageTypeValue })
            }}
          />

          <TextField
            name="iconName"
            id="iconName"
            label="What kind of icon do you want to show?"
            value={iconName}
            placeholder="Enter a font awesome icon name"
            hint={`You can find the list of available icons here: ${fontawesomeUrl}`}
            error={iconError}
            textInputProps={{
              onBlur: (e) => {
                const iconNameValue = e.target.value
                  .toLowerCase()
                  .trim() as AwesomeFont5SolidIconIdentifier
                if (
                  iconName !== pluginParameters.iconName &&
                  isIconValid(iconNameValue)
                ) {
                  saveSettings({ iconName: iconNameValue })
                }
              },
            }}
            onChange={(newValue) =>
              setIconName(newValue)
            }
          />

          <TextField
            name="pageEmbedUrl"
            id="pageEmbedUrl"
            label="What page do you want to embed?"
            value={pageEmbedUrl}
            placeholder="Enter an url"
            error={pageEmbedUrlError}
            textInputProps={{
              type: 'url',
              onBlur: (e) => {
                const pageEmbedUrlValue = e.target.value
                if (
                  pageEmbedUrl !== pluginParameters.pageEmbedUrl &&
                  isUrlValid(pageEmbedUrlValue)
                ) {
                  saveSettings({ pageEmbedUrl: pageEmbedUrlValue })
                }
              },
            }}
            onChange={(newValue) => setPageEmbedUrl(newValue)}
          />
        </FieldGroup>
      </Form>
    </Canvas>
  )
}
