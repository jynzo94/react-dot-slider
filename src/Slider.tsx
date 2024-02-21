import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import React, { createRef, ReactNode, RefObject, useEffect } from "react";
import { useRef } from "react";
import useAnimation from "./useAnimation";
import "./index.css";

type Props = {
  children: ReactNode;
};

export default function Slider(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRefs = React.Children.map(props.children, () => {
    return createRef<HTMLDivElement>();
  }) as React.RefObject<HTMLDivElement>[];

  const innerButtonsRefs = new Array<RefObject<HTMLButtonElement>>(
    slidesRefs.length
  ).fill(useRef<HTMLButtonElement>(null));

  const slidesElements = React.Children.map(
    props.children,
    (child: any, index: number) => {
      return React.cloneElement(child, { ref: slidesRefs[index] });
    }
  );

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      animation.goToPrev();
    } else if (e.key === "ArrowRight") {
      animation.goToNext();
    }
  };

  useEffect(() => {
    const style = containerRef.current?.style;
    if (style) {
      style.width = slidesRefs[0].current?.offsetWidth + "px";
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const animation = useAnimation(containerRef, slidesRefs);

  const onMouseDownContainer = (e: React.MouseEvent) => {
    animation.dragStart(e.clientX, e.clientY);
  };

  const onMouseMoveContainer = (e: React.MouseEvent) => {
    animation.dragMove(e.clientX, e.clientY);
  };

  const onMouseUpContainer = () => {
    animation.dragEnd();
  };

  const onTouchStartContainer = (e: React.TouchEvent) => {
    const t = e.touches[0];
    animation.dragStart(t.clientX, t.clientY);
  };

  const onTouchMoveContainer = (e: React.TouchEvent) => {
    const t = e.touches[0];
    animation.dragMove(t.clientX, t.clientY);
  };

  const onTouchEndContainer = () => {
    animation.dragEnd();
  };

  const onClickButtonPrev = () => {
    animation.goToPrev();
  };

  const onClickInnerButton = (index: number) => {
    animation.goTo(index);
  };

  const onClickButtonNext = () => {
    animation.goToNext();
  };

  return (
    <div className="slider-root">
      <div className={"slider-buttons-wrapper"}>
        <button
          onClick={onClickButtonPrev}
          className={
            animation.slideIndex === 0
              ? "slider-outer-button-disabled"
              : "slider-outer-button"
          }
        >
          <ArrowLeftIcon />
        </button>
        <div className={"flex"}>
          {slidesRefs.map((s, i) => {
            return (
              <button
                ref={innerButtonsRefs[i]}
                key={i}
                className={
                  animation.slideIndex === i
                    ? "slider-inner-button-contained"
                    : "slider-inner-button-outlined"
                }
                onClick={() => {
                  onClickInnerButton(i);
                }}
              ></button>
            );
          })}
        </div>
        <button
          onClick={onClickButtonNext}
          className={
            animation.slideIndex === slidesRefs.length - 1
              ? "slider-outer-button-disabled"
              : "slider-outer-button"
          }
        >
          <ArrowRightIcon />
        </button>
      </div>
      <div
        ref={containerRef}
        className={"slider-slides-wrapper"}
        onMouseDown={onMouseDownContainer}
        onMouseMove={onMouseMoveContainer}
        onMouseUp={onMouseUpContainer}
        onMouseOut={onMouseUpContainer}
        onTouchStart={onTouchStartContainer}
        onTouchMove={onTouchMoveContainer}
        onTouchEnd={onTouchEndContainer}
      >
        {slidesElements}
      </div>
    </div>
  );
}
