import { Text, Stage } from '@pixi/react'
import { FC } from 'react'

const CreatePixiProject: FC = () => {
    return (
        <Stage width={500} height={300} options={{ backgroundColor: 0xdddddd }}>
            <Text text="Pixi boilerplate" x={150} y={125} />
        </Stage>
    )
}

export default CreatePixiProject
