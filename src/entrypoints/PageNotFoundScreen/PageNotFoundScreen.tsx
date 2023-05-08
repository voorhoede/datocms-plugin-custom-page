import { RenderPageCtx } from 'datocms-plugin-sdk'
import { Canvas } from 'datocms-react-ui'

type PropTypes = {
  ctx: RenderPageCtx
}

export default function PageNotFoundScreen({ ctx }: PropTypes) {
  return (
    <Canvas ctx={ctx}>
      <div className="layout">
        <p>Page not found!</p>
      </div>
    </Canvas>
  )
}
