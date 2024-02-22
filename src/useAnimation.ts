import { RefObject, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import curr from './lib/curr'
import n from './lib/n'
import angleBetweenLines from './lib/angleBetweenLines'
import getNumForPx from './lib/getNumberForPx'

type Ref<T extends HTMLDivElement = HTMLDivElement> = RefObject<T>

gsap.registerPlugin(ScrollToPlugin)

type Point = {
    x: number | undefined
    y: number | undefined
}

const duration = 0.5
const clientPointsMin = 1
const minAngle = 0
const maxAngle = 25
const dragDurationThreshold = 1000

export default function useAnimation(container: Ref, slides: Ref[]) {
    const [slideIndex, setSlideIndex] = useState(0)
    const [clientPositions, setClientPositions] = useState<Point[]>()
    const [direction, setDirection] = useState<'toLeft' | 'toRight'>()
    const [dragStartTime, setDragStartTIme] = useState<number>()

    const getSlideWidth = () => {
        return getNumForPx(getComputedStyle(curr(slides[0])).width)
    }

    useEffect(() => {
        console.log('useAnimation.slides', slides)
    }, [])

    useEffect(() => {
        animateSliding(slideIndex)
    }, [slideIndex])

    const animateSliding = (index: number) => {
        if (index < 0 || index > slides.length - 1) {
            return
        }

        gsap.killTweensOf(curr(container))
        gsap.to(curr(container), {
            duration,
            scrollLeft: curr(slides[index]).offsetLeft
        })
    }

    useEffect(() => {
        if (clientPositions) {
            if (clientPositions.length > clientPointsMin) {
                const p1 = clientPositions[0]
                const p2 = clientPositions[clientPositions.length - 1]

                if (direction === 'toLeft') {
                    if (
                        n(p2.x) >
                        n(clientPositions[clientPositions.length - 2].x)
                    ) {
                        setDirection('toRight')
                        setClientPositions([p2])
                        return
                    }
                } else if (direction === 'toRight') {
                    if (
                        n(p2.x) <
                        n(clientPositions[clientPositions.length - 2].x)
                    ) {
                        setDirection('toLeft')
                        setClientPositions([p2])
                        return
                    }
                }

                const userLine = {
                    p1: {
                        x: n(p1.x),
                        y: n(p2.y)
                    },
                    p2: {
                        x: n(p2.x),
                        y: n(p2.y)
                    }
                }

                const horLine = {
                    p1: {
                        x: n(p1.x),
                        y: n(p1.y) / 2
                    },
                    p2: {
                        x: n(p2.x),
                        y: n(p2.y) / 2
                    }
                }
                const angle = angleBetweenLines(userLine, horLine)
                if (angle >= minAngle && angle < maxAngle) {
                    const direction =
                        userLine.p1.x < userLine.p2.x ? 'toRight' : 'toLeft'

                    setDirection(direction)

                    if (direction === 'toRight') {
                        curr(container).scrollLeft -=
                            n(clientPositions[clientPositions.length - 1].x) -
                            n(clientPositions[clientPositions.length - 2].x)
                    } else {
                        curr(container).scrollLeft +=
                            n(clientPositions[clientPositions.length - 2].x) -
                            n(clientPositions[clientPositions.length - 1].x)
                    }
                }
            }
        }
    }, [clientPositions])

    const dragStart = function (x: number, y: number) {
        console.log('drag start')
        setDragStartTIme(Date.now())
        setClientPositions([
            {
                x: x,
                y: y
            }
        ])
    }

    const dragMove = function (x: number, y: number) {
        if (clientPositions) {
            console.log('drag move')
            setClientPositions([
                ...clientPositions,
                {
                    x: x,
                    y: y
                }
            ])
        }
    }

    const dragEnd = function () {
        if (!clientPositions) {
            return
        }
        console.log('drag end')
        if (dragStartTime === undefined) {
            throw new Error()
        }
        const slideWidth = getSlideWidth()
        const dragEndTime = Date.now()

        const dragDuration = dragEndTime - dragStartTime

        if (dragDuration < dragDurationThreshold) {
            if (direction === 'toLeft') {
                goToNext()
            } else if (direction == 'toRight') {
                goToPrev()
            }
        } else {
            const visibleSlideIndexCoef =
                curr(container).scrollLeft / slideWidth
            const leftVisibleIndex = Math.floor(
                curr(container).scrollLeft / slideWidth
            )
            const rightVisibleIndex = leftVisibleIndex + 1
            const leftVisibility = rightVisibleIndex - visibleSlideIndexCoef
            const rightVisibility = 1 - leftVisibility

            if (direction === 'toLeft') {
                if (rightVisibility > 0.12) {
                    goTo(rightVisibleIndex)
                } else {
                    goTo(leftVisibleIndex)
                }
            } else if (direction === 'toRight') {
                if (leftVisibility > 0.12) {
                    goTo(leftVisibleIndex)
                } else {
                    goTo(rightVisibleIndex)
                }
            }
        }

        setClientPositions(undefined)
        setDirection(undefined)
    }

    const goToPrev = () => {
        setSlideIndex((val) => {
            if (val > 0) {
                return val - 1
            } else {
                return val
            }
        })
    }

    const goToNext = () => {
        setSlideIndex((val) => {
            if (val < slides.length - 1) {
                return val + 1
            } else {
                return val
            }
        })
    }

    const goTo = (index: number) => {
        if (index < 0 || index > slides.length - 1) {
            return
        }

        if (slideIndex === index) {
            animateSliding(index)
        } else {
            setSlideIndex(index)
        }
    }

    return {
        slideIndex,
        goToNext,
        goToPrev,
        goTo,
        dragStart,
        dragMove,
        dragEnd
    }
}
