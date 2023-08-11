import { Fragment, useState } from 'react'

import { RenderConfigScreenCtx } from 'datocms-plugin-sdk'
import {
  Canvas,
  Toolbar,
  ToolbarStack,
  ButtonGroup,
  ButtonGroupButton,
  ToolbarButton,
} from 'datocms-react-ui'
import { GlobalParameters } from '../../lib/types'
import { PageConfig } from '../../components/PageConfig/PageConfig'
import { defaultPageName, defaultPageSlug } from '../../lib/constants'

import styles from './ConfigScreen.module.css'
import { PlusIcon } from '../../components/PlusIcon/PlusIcon'
import { checkAndGetId } from '../../lib/helpers'

type Props = {
  ctx: RenderConfigScreenCtx
}

export default function ConfigScreen({ ctx }: Props) {
  const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters
  const originalPages =
    pluginParameters?.pages && pluginParameters?.pages.length > 0
      ? pluginParameters?.pages
      : [{ pageSlug: defaultPageSlug, pageName: defaultPageName }]
  const [activePageId, setActivePage] = useState(originalPages[0].pageSlug)

  function savePageSettings(
    id: string,
    settingToSave: Partial<GlobalParameters>,
  ) {
    let updatedPages = originalPages
    const pageToUpdate = originalPages.find((obj) => obj.pageSlug === id)

    if (pageToUpdate) {
      updatedPages = originalPages.map((obj) => {
        if (obj.pageSlug === id) {
          return { ...obj, ...settingToSave }
        }

        return obj
      })
    } else {
      updatedPages = [...originalPages, { pageSlug: id, ...settingToSave }]
    }
    ctx.updatePluginParameters({
      ...pluginParameters,
      pages: updatedPages,
    })
    setActivePage(settingToSave.pageSlug || id)
    ctx.notice('Settings updated successfully!')
  }

  function addPage() {
    const newPageId = checkAndGetId(
      `${defaultPageSlug}-${originalPages.length}`,
      originalPages,
    )
    setActivePage(newPageId)
    savePageSettings(newPageId, {
      pageSlug: newPageId,
    })
  }

  function deletePage(id: string) {
    const updatedPages = originalPages.filter((obj) => obj.pageSlug !== id)

    if (updatedPages.length > 0) {
      ctx.updatePluginParameters({
        ...pluginParameters,
        pages: updatedPages,
      })
      setActivePage(updatedPages[0].pageSlug || defaultPageSlug)
      ctx.notice('Page deleted successfully!')
    }
  }

  return (
    <Canvas ctx={ctx}>
      <p>
        This DatoCMS plugin adds the ability to have custom pages in your
        DatoCMS instance.
      </p>

      <Toolbar className={styles.toolbar}>
        <ToolbarStack stackSize="s">
          <ButtonGroup className={styles.toolbarButton}>
            {originalPages.map((page) => (
              <ButtonGroupButton
                key={page.pageSlug}
                onClick={() => setActivePage(page.pageSlug)}
                selected={page.pageSlug === activePageId}
              >
                {page.pageName || defaultPageName}
              </ButtonGroupButton>
            ))}
          </ButtonGroup>
          <div className={styles.separator} />
          <ToolbarButton className={styles.toolbarButton} onClick={addPage}>
            <PlusIcon />
          </ToolbarButton>
        </ToolbarStack>
      </Toolbar>

      <div className={styles.content}>
        {originalPages.map((page, index) => (
          <Fragment key={page.pageSlug}>
            {activePageId === page.pageSlug ? (
              <PageConfig
                id={page.pageSlug || `${defaultPageSlug}-${index}`}
                currentPage={page}
                onSaveSettings={savePageSettings}
                onDelete={deletePage}
                showDeleteButton={originalPages.length > 1}
                allPages={originalPages}
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    </Canvas>
  )
}
