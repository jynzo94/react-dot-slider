import React, {
    createRef,
    ReactNode,
    RefObject,
    useEffect,
    useLayoutEffect
} from 'react'
import { useRef } from 'react'
import useAnimation from './useAnimation'
import Root from './styled/Root'
import AllButtonsWrapper from './styled/AllButtonsWrapper'
import OuterButton, { OuterButtonStyles } from './styled/OuterButton'
import InnerButton, { InnerButtonStyles } from './styled/InnerButton'
import SlidesWrapper from './styled/SlidesWrapper'
import InnerButtonsWrapper from './styled/InnerButtonsWrapper'
import ArrowSvg, { ArrowSvgStyles } from './styled/ArrowSvg'

export type SliderStyle = ArrowSvgStyles &
    OuterButtonStyles &
    InnerButtonStyles & { arrowStrokeWidth?: number }

type Props = {
    children: ReactNode
    styles?: SliderStyle
    width: string
}

export default function Slider(props: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const slidesRefs = React.Children.map(props.children, () => {
        return createRef<HTMLDivElement>()
    }) as React.RefObject<HTMLDivElement>[]

    const innerButtonsRefs = new Array<RefObject<HTMLButtonElement>>(
        slidesRefs.length
    ).fill(useRef<HTMLButtonElement>(null))

    const slidesElements = React.Children.map(
        props.children,
        (child: any, index: number) => {
            return React.cloneElement(child, { ref: slidesRefs[index] })
        }
    )

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            animation.goToPrev()
        } else if (e.key === 'ArrowRight') {
            animation.goToNext()
        }
    }

    useLayoutEffect(() => {
        const style = containerRef.current?.style
        if (style) {
            style.width = slidesRefs[0].current?.offsetWidth + 'px'
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    const animation = useAnimation(containerRef, slidesRefs)

    const onMouseDownContainer = (e: React.MouseEvent) => {
        animation.dragStart(e.clientX, e.clientY)
    }

    const onMouseMoveContainer = (e: React.MouseEvent) => {
        animation.dragMove(e.clientX, e.clientY)
    }

    const onMouseUpContainer = () => {
        animation.dragEnd()
    }

    const onTouchStartContainer = (e: React.TouchEvent) => {
        const t = e.touches[0]
        animation.dragStart(t.clientX, t.clientY)
    }

    const onTouchMoveContainer = (e: React.TouchEvent) => {
        const t = e.touches[0]
        animation.dragMove(t.clientX, t.clientY)
    }

    const onTouchEndContainer = () => {
        animation.dragEnd()
    }

    const onClickButtonPrev = () => {
        animation.goToPrev()
    }

    const onClickInnerButton = (index: number) => {
        animation.goTo(index)
    }

    const onClickButtonNext = () => {
        animation.goToNext()
    }

    const arrowStrokeWidth = props.styles?.arrowStrokeWidth || 2.5

    return (
        <Root>
            <AllButtonsWrapper>
                <OuterButton
                    onClick={onClickButtonPrev}
                    $disabled={animation.slideIndex === 0}
                    $outerButtonBgColor={props.styles?.$outerButtonBgColor}
                    $outerButtonBorder={props.styles?.$outerButtonBorder}
                    $outerButtonMarginX={props.styles?.$outerButtonMarginX}
                    $outerButtonSize={props.styles?.$outerButtonSize}
                >
                    <ArrowSvg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={arrowStrokeWidth}
                        $arrowSvgColor={props.styles?.$arrowSvgColor}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                        />
                    </ArrowSvg>
                </OuterButton>
                <InnerButtonsWrapper>
                    {slidesRefs.map((s, i) => {
                        return (
                            <InnerButton
                                ref={innerButtonsRefs[i]}
                                key={i}
                                onClick={() => {
                                    onClickInnerButton(i)
                                }}
                                $active={animation.slideIndex === i}
                                $innerButtonActiveBgColor={
                                    props.styles?.$innerButtonActiveBgColor
                                }
                                $innerButtonBorder={
                                    props.styles?.$innerButtonBorder
                                }
                                $innerButtonInactiveBgColor={
                                    props.styles?.$innerButtonInactiveBgColor
                                }
                                $innerButtonMarginX={
                                    props.styles?.$innerButtonMarginX
                                }
                                $innerButtonSize={
                                    props.styles?.$innerButtonSize
                                }
                            />
                        )
                    })}
                </InnerButtonsWrapper>
                <OuterButton
                    onClick={onClickButtonNext}
                    $disabled={animation.slideIndex === slidesRefs.length - 1}
                    $outerButtonBgColor={props.styles?.$outerButtonBgColor}
                    $outerButtonBorder={props.styles?.$outerButtonBorder}
                    $outerButtonMarginX={props.styles?.$outerButtonMarginX}
                    $outerButtonSize={props.styles?.$outerButtonSize}
                >
                    <ArrowSvg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={arrowStrokeWidth}
                        $arrowSvgColor={props.styles?.$arrowSvgColor}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
                        />
                    </ArrowSvg>
                </OuterButton>
            </AllButtonsWrapper>
            <SlidesWrapper
                width={props.width}
                ref={containerRef}
                onMouseDown={onMouseDownContainer}
                onMouseMove={onMouseMoveContainer}
                onMouseUp={onMouseUpContainer}
                onMouseOut={onMouseUpContainer}
                onTouchStart={onTouchStartContainer}
                onTouchMove={onTouchMoveContainer}
                onTouchEnd={onTouchEndContainer}
            >
                {slidesElements}
            </SlidesWrapper>
        </Root>
    )
}
