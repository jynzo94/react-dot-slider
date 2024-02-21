import { forwardRef } from "react";

/* eslint-disable react/display-name */
const Slide = forwardRef((props: any, ref: any) => {
  return (
    <div className="slide" ref={ref}>
      {props.children}
    </div>
  );
});

export default Slide;
