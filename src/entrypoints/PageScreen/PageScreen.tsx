import { Page } from '../../lib/types'

import styles from './PageScreen.module.css'

type PropTypes = {
  page: Page
}

export default function PageScreen({ page }: PropTypes) {
  const { pageEmbedUrl, pageName } = page

  const Content = () => {
    if (pageEmbedUrl) {
      return (
        <iframe
          className={styles.iframe}
          title={pageName}
          src={pageEmbedUrl}
        />
      )
    } else {
      return (
        <div className="layout">
          <p>{`Welcome to ${pageName || 'this page'}!`}</p>
        </div>
      )
    }
  }

  return Content()
}
