import React, { useEffect, useState } from "react";

const style = {
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  counter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    padding: "32px 64px",
  },
};

// let start = Date.now();
let start = document.timeline.currentTime;

export default function Counting() {
  const [counter, setcounter] = useState(0);
  let timer = null;

  /**
   * the setTimeout, setInterval will push a callback into the queue, waiting for the time to be over, and then call the callback into the main thread.
   * The main causes that can affect the result of setTimeout and setInterval are :
   *  The main thread was busy for a while.
   *  Move the tab to the backrgound.
   *
   * Also the browsers are not so accurate when using these 2 functions, after a while of calling them, it will certainly cause a drift
   * because calling a callback will take about a half millisecond, which leads after 100s to a drift of half a second.
   *
   * consequences:
   *    not accurate over time
   *    update the DOM steadily
   *    good regarding CPU usage
   *    it runs in the backgrounds
   */
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setcounter((prev) => prev + 1);
  //     }, 1000);
  //   }, [counter]);

  /**
   * consequences:
   *    accurate over time
   *    it does not update the DOM steadily
   *    good regarding CPU usage
   *    avoids running in the backgrounds
   */
  // useEffect(() => {
  //   function frame() {
  //     const elapsed = Date.now() - start;
  //     const seconds = Math.floor(elapsed / 1000);

  //     setcounter(seconds);
  //   }

  //   timer = setTimeout(frame, 1000);

  //   document.addEventListener("visibilitychange", () => {
  //     if (document.hidden) {
  //       clearTimeout(timer);
  //     } else {
  //       timer = setTimeout(frame, 1000);
  //     }
  //   });
  // }, [counter]);

  /**
   *
   * requestAnimationFrame will pause in case of:
   *    the document is hidden
   *    the tab is running on the background
   *
   * consequences:
   *    accurate over time
   *    it update the DOM steadily
   *    waste of  CPU usage
   *        => because of requestAnimtionFrame() that runs 60 times per seconds, we have only one frame that will make the change into the DOM
   *        so we have wasted 59 frames without making any change on the DOM.
   *    avoids running in the backgrounds.
   */
  // useEffect(() => {
  //   function frame() {
  //     const elapsed = Date.now() - start;
  //     const seconds = Math.floor(elapsed / 1000);

  //     setcounter(seconds);
  //     requestAnimationFrame(frame);
  //   }

  //   frame();
  // }, []);

  /**
   *
   * consequences:
   *    accurate over time
   *    it update the DOM steadily
   *    waste of  CPU usage
   *    avoids running in the backgrounds.
   */
  // useEffect(() => {
  //   function frame() {
  //     const elapsed = document.timeline.currentTime - start;
  //     const seconds = Math.floor(elapsed / 1000);

  //     setcounter(seconds);

  //     document.body.animate(null, {
  //       duration: 1000 - (elapsed % 1000),
  //     }).onfinish = frame;
  //   }

  //   frame();
  // }, []);

  /**
   * The correct way to do it
   *
   * consequences:
   *    accurate over time
   *    it update the DOM steadily
   *    A good CPU usage
   *    avoids running in the backgrounds.
   */
  useEffect(() => {
    function frame(time) {
      const elapsed = time - start;
      const seconds = Math.round(elapsed / 1000);

      setcounter(seconds);

      const targetNext = (seconds + 1) * 1000 + start;

      setTimeout(() => {
        requestAnimationFrame(frame);
      }, targetNext - performance.now());
    }

    frame(start);
  }, []);

  return (
    <div style={style.root}>
      <div style={style.counter}>{counter}</div>
    </div>
  );
}
