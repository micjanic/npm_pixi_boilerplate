import { Application, extend } from '@pixi/react'
import { Sprite, Graphics } from 'pixi.js'
import { useCallback, useRef } from 'react'

extend({
    Sprite,
    Graphics,
})

const App = () => {
    const parentRef = useRef(null)
    const draw = useCallback((graphics: Graphics) => {
        graphics.clear()
        graphics.setFillStyle({ color: 'red' })
        graphics.rect(0, 0, 200, 100)
        graphics.fill()
    }, [])

    return (
        <div ref={parentRef} className="w-screen h-screen">
            <Application resizeTo={parentRef}>
                <pixiGraphics draw={draw} />
            </Application>
        </div>
    )
}

export default App
