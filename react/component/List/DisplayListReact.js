import React from "react";
import ReactDOM from "react-dom";
import { CustomAxios } from "../../Services/axios.service";

const ListItem = React.memo(({ post, onDelete, index }) => {
  const elem = React.useRef();
  console.log("rendering ListItem");

  return (
    <li
      ref={elem}
      key={post.id}
      onClick={() => {
        onDelete(post.id, index);
      }}
    >
      <div>{post.id}</div>
      <div>{post.name}</div>
      <div>{post.body}</div>
    </li>
  );
});

let i = 0;
let serie = 1;

export default function DisplayListReact() {
  const container = React.useRef();
  const divContainer = React.useRef();
  const childrenHeight = React.useRef(0);

  const [domChildren, setDomChildren] = React.useState([]);
  const [state, setstate] = React.useState([]);

  function delayDelete(id) {
    const filteredList = domChildren.filter((item) => item.id !== id);
    setDomChildren(filteredList);
  }

  function onDeleteItem(id, index) {
    const li = container.current.children.item(index);

    if (li) {
      li.classList.add("removed-item");
    }

    setTimeout(() => {
      requestAnimationFrame(() => delayDelete(id));
    }, 500);
  }

  function onScroll({ target }) {
    const { scrollHeight, clientHeight } = container.current;
    // console.log("serie", scrollHeight, clientHeight, target.scrollTop);
    if (scrollHeight <= 600) {
      DisplayListItemInLayout(container.current);
      return;
    } else if (
      scrollHeight - (clientHeight + target.scrollTop) <= 100 &&
      childrenHeight.current == 0
    ) {
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
      ReactDOM.render(
        <ListItem key={state[i].id} post={state[i]} />,
        divContainer.current
      );

      childrenHeight.current += divContainer.current.clientHeight;

      domChildren.push(state[i]);

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
    if (!divContainer.current) {
      divContainer.current = document.createElement("div");
      divContainer.current.style.transform = "translate(-100vw)";
      document.body.append(divContainer.current);
    }

    if (childrenHeight.current < 600) {
      drawItem(parent);
    } else {
      childrenHeight.current = 0;
      setDomChildren([...domChildren]);
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
          {domChildren.map((post, index) => {
            return (
              <ListItem
                key={post.id}
                post={post}
                onDelete={onDeleteItem}
                index={index}
              />
            );
          })}
        </ul>
      }
    </>
  );
}
