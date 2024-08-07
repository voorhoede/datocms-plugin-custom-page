import { useMemo, useState } from 'react'
import slugify from 'slugify'
import { AwesomeFontIconIdentifier } from 'datocms-plugin-sdk'

import {
  Form,
  SelectField,
  FieldGroup,
  TextField,
  Button,
} from 'datocms-react-ui'
import {
  Page,
  GlobalParameters,
  PageType,
  PageTypeOption,
  PlacementOption,
  MenuItemPlacementOption,
} from '../../lib/types'
import {
  pageTypeOptions,
  defaultIconName,
  defaultPageName,
  placementOptions,
  fontawesomeVersion,
  fontawesomeUrl,
} from '../../lib/constants'
import { checkAndGetId, getMenuItemPlacements } from '../../lib/helpers'
import { icons } from '../../lib/icons'
import { DeleteIcon } from '../DeleteIcon/DeleteIcon'

import * as styles from './PageConfig.module.css'

type Props = {
  id: string
  currentPage?: Page
  allPages?: Page[]
  onSaveSettings: (id: string, settings: Partial<Page>) => void
  onDelete: (id: string) => void
  showDeleteButton?: boolean
}

export function PageConfig({
  id,
  currentPage,
  allPages = [],
  onSaveSettings,
  onDelete,
  showDeleteButton,
}: Props) {
  const selectedPageType = currentPage?.pageType || pageTypeOptions[0]
  const selectedPlacement = currentPage?.placement || placementOptions[0]
  const [pageName, setPageName] = useState<GlobalParameters['pageName']>(
    currentPage?.pageName || defaultPageName,
  )
  const [pageGroupName, setPageGroupName] = useState<
    GlobalParameters['pageGroupName']
  >(currentPage?.pageGroupName || defaultPageName)
  const [iconName, setIconName] = useState<string>(
    currentPage?.iconName || defaultIconName,
  )
  const [iconError, setIconError] = useState('')
  const [pageEmbedUrl, setPageEmbedUrl] = useState<
    GlobalParameters['pageEmbedUrl']
  >(currentPage?.pageEmbedUrl)
  const [pageEmbedUrlError, setPageEmbedUrlError] = useState('')

  const selectedMenuItemPlacement = useMemo(() => {
    return (
      currentPage?.menuItemPlacement ||
      getMenuItemPlacements(selectedPageType.value)[0]
    )
  }, [currentPage?.menuItemPlacement, selectedPageType.value])

  function saveSettings(settingToSave: Partial<Page>) {
    onSaveSettings(id, settingToSave)
  }

  function isIconValid(iconName: AwesomeFontIconIdentifier) {
    if (iconName && !icons.includes(iconName)) {
      setIconError(
        `Icon not found. Use solid Fontawesome ${fontawesomeVersion} icons: ${fontawesomeUrl}`,
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
        `Invalid URL. Please enter a valid URL. Example: https://www.datocms.com`,
      )
      return false
    }
  }

  return (
    <>
      <div className={styles.header}>
        <p className="h2">{pageName}</p>
        {showDeleteButton && (
          <Button
            buttonSize="xs"
            buttonType="negative"
            leftIcon={<DeleteIcon />}
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        )}
      </div>

      <Form>
        <FieldGroup>
          <TextField
            name="pageName"
            id="pageName"
            label="What is the label of menu item?"
            value={pageName}
            placeholder="Enter page name"
            textInputProps={{
              onBlur: (e) => {
                const pageNameValue = e.target.value
                const pageSlug = checkAndGetId(
                  slugify(pageNameValue, {
                    lower: true,
                    strict: true,
                  }),
                  allPages,
                )
                if (pageNameValue !== currentPage?.pageName) {
                  saveSettings({ pageName: pageNameValue, pageSlug })
                }
              },
            }}
            onChange={(newValue) => setPageName(newValue)}
          />

          {currentPage?.pageType?.value ===
            PageType.SettingsAreaSidebarItemGroups && (
            <TextField
              name="pageGroupName"
              id="pageGroupName"
              label="What is the title of the menu item?"
              value={pageGroupName}
              placeholder="Enter page group name"
              textInputProps={{
                onBlur: (e) => {
                  const pageGroupNameValue = e.target.value
                  if (pageGroupName !== currentPage?.pageGroupName) {
                    saveSettings({ pageGroupName: pageGroupNameValue })
                  }
                },
              }}
              onChange={(newValue) => setPageGroupName(newValue)}
            />
          )}

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
              saveSettings({
                pageType: pageTypeValue,
                menuItemPlacement: getMenuItemPlacements(
                  pageTypeValue.value,
                )[0],
              })
            }}
          />

          <SelectField
            name="placement"
            id="placement"
            label="Show the menu item before or after the other menu items?"
            value={selectedPlacement}
            selectInputProps={{
              options: placementOptions,
            }}
            onChange={(newValue) => {
              const placementValue = newValue as PlacementOption
              saveSettings({
                placement: placementValue,
              })
            }}
          />

          <SelectField
            name="menuItemPlacement"
            id="menuItemPlacement"
            label={`${
              selectedPlacement.value === 'before' ? 'Before' : 'After'
            } which menu item do you want to show the menu item?`}
            value={selectedMenuItemPlacement}
            selectInputProps={{
              options: getMenuItemPlacements(selectedPageType.value),
            }}
            onChange={(newValue) => {
              const menuItemPlacementValue = newValue as MenuItemPlacementOption
              saveSettings({ menuItemPlacement: menuItemPlacementValue })
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
                  .trim() as AwesomeFontIconIdentifier
                if (
                  iconName !== currentPage?.iconName &&
                  isIconValid(iconNameValue)
                ) {
                  saveSettings({ iconName: iconNameValue })
                }
              },
            }}
            onChange={(newValue) => setIconName(newValue)}
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
                  pageEmbedUrl !== currentPage?.pageEmbedUrl &&
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
    </>
  )
}
