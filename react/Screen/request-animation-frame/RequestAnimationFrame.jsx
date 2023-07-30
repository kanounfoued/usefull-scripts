import React, { useLayoutEffect, useRef } from "react";

const style = {
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  square: {
    height: 100,
    width: 100,
    background: "red",
  },
};

let start = document.timeline.currentTime;
let left = 60;

export default function RequestAnimationFrame() {
  const squareRef = useRef();

  useLayoutEffect(() => {
    let duration = 10000;
    let distance = 600;
    let speed = (distance * 20) / duration;

    squareRef.current.style.transition = `transform ${speed}s linear`;

    function frame() {
      squareRef.current.style.transform = `translateX(${left}px)`;
      left += 60;

      if (left < 600) {
        requestAnimationFrame(frame);
      }
    }

    frame(start);
  }, []);

  return (
    <div style={style.root}>
      <div ref={squareRef} style={style.square}></div>
    </div>
  );
}
