import { RenderPageCtx } from 'datocms-plugin-sdk'
import { Canvas } from 'datocms-react-ui'
import { GlobalParameters } from '../../lib/types'

import styles from './PageScreen.module.css'

type PropTypes = {
  ctx: RenderPageCtx
}

export default function PageScreen({ ctx }: PropTypes) {
  const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters
  const embededUrl = pluginParameters.pageEmbedUrl

  const Content = () => {
    if (embededUrl) {
      return (
        <iframe
          className={styles.iframe}
          title={pluginParameters.pageName}
          src={pluginParameters.pageEmbedUrl}
        />
      )
    } else {
      return (
        <div className="layout">
          <p>{`Welcome to ${pluginParameters.pageName || 'this page'}!`}</p>
        </div>
      )
    }
  }

  return <Canvas ctx={ctx}>{Content()}</Canvas>
}
