import React from "react";
import ReactDOM from "react-dom";
import { CustomAxios } from "../../Services/axios.service";

const ListItem = React.memo(({ post, parent }) => {
  const elem = React.useRef();
  // console.log(parent);

  // React.useEffect(() => {
  // if (elem.current) {
  //   if (
  //     elem.current.getBoundingClientRect().y - parentData.top < 0 ||
  //     elem.current.getBoundingClientRect().y - parentData.top >
  //       parentData.height
  //   ) {
  //     elem.current.style.height =
  //       elem.current.getBoundingClientRect().height + "px";
  //     elem.current.style.contentVisibility = "hidden";
  //   } else {
  //     elem.current.style.contentVisibility = "visible";
  //     elem.current.style.height = "auto";
  //   }
  // }
  // }, [parentData]);

  return (
    <li ref={elem} key={post.id}>
      <div>{post.id}</div>
      <div>{post.name}</div>
      <div>{post.body}</div>
    </li>
  );
});

let i = 0;
let serie = 1;

export default function DisplayList() {
  const container = React.useRef();

  const [state, setstate] = React.useState([]);

  function onScroll({ target }) {
    // setParentData(container.current.getBoundingClientRect());
    const { scrollHeight, clientHeight } = container.current;

    if (scrollHeight <= 600) {
      DisplayListItemInLayout(container.current);
      return;
    } else if (scrollHeight - (clientHeight + target.scrollTop) <= 100) {
      serie++;
      DisplayListItemInLayout(container.current);
    }
  }

  /**
   *
   *
   *
   * Apprend the item into its parent
   *
   *
   */
  function drawItem(parent) {
    if (state[i]) {
      const div = document.createElement("div");

      ReactDOM.render(
        <ListItem key={state[i].id} post={state[i]} parent={parent} />,
        div
      );

      parent.append(div.children.item(0));
      div.remove();
      i++;
      requestAnimationFrame(() => frame(parent));
    }
  }

  /**
   *
   *
   *
   * Call the request frame
   *
   *
   *
   */
  function frame(parent) {
    const { scrollHeight } = parent;
    // console.log("scrollHeight", scrollHeight);
    // console.log("offsetHeight", offsetHeight);

    if (scrollHeight < 600 * serie + 100) {
      drawItem(parent);
    }
  }

  function DisplayListItemInLayout(parent) {
    /**
     *
     *
     *
     * The first call of animation frame
     *
     *
     */
    requestAnimationFrame(() => frame(parent));
  }

  React.useEffect(() => {
    if (container.current) {
      container.current.addEventListener("scroll", onScroll);
      DisplayListItemInLayout(container.current);
    }

    return () => {
      if (container.current) {
        container.current.removeEventListener("scroll", onScroll);
      }
    };
  }, [state]);

  function onSuccess(response) {
    const { data } = response;

    setstate(data);
  }

  function onFail(error) {
    console.log(error.message);
  }

  async function onFetch() {
    await CustomAxios(
      "/comments",
      {
        method: "GET",
      },
      onSuccess,
      onFail
    );
  }

  return (
    <>
      <button onClick={onFetch}>fetch</button>
      {
        <ul
          id="list"
          ref={container}
          style={{
            maxHeight: 600,
            overflow: "auto",
            width: "50%",
          }}
        >
          {/* {state.map((post) => {
            return (
              <ListItem key={post.id} post={post} parentData={parentData} />
            );
          })} */}
        </ul>
      }
    </>
  );
}
