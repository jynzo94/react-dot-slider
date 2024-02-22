import { forwardRef } from 'react'
import SlideWrapper from './styled/SlideWrapper'

const Slide = forwardRef((props: any, ref: any) => {
    return <SlideWrapper ref={ref}>{props.children}</SlideWrapper>
})

export default Slide
