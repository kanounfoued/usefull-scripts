import { useState } from "react";

import NextPrevious from "../../component/NextPrevious";

// FormHook
import useFormHook from "../../Hooks/useFormHook";
import CustomInput from "../../component/CustomInput";
import DisplayList from "../../component/List/DisplayList";
import DisplayListReact from "../../component/List/DisplayListReact";

import { CustomAxios } from "../../Services/axios.service";

const data = [
  {
    id: "1",
    title: "kanoun",
  },
  {
    id: "2",
    title: "mohamed",
  },
  {
    id: "3",
    title: "foued",
  },
  {
    id: "4",
    title: "said",
  },
  {
    id: "5",
    title: "raouf",
  },
  {
    id: "6",
    title: "wadoud",
  },
  {
    id: "7",
    title: "amine",
  },
];

export default function Home() {
  const [state] = useState(data);
  const [index, setIndex] = useState(0);

  const [currentElement, setCurrentElement] = useState(data[0]);

  function handleCurrentElementChange(element = {}) {
    setCurrentElement(element);
  }

  function handleIndexChange(ind = 0) {
    setIndex(ind);
  }

  // UseForm Hooks section

  const { registerField } = useFormHook();

  function onClickButton(e) {
    e.preventDefault();
  }

  function onSuccess(response) {
    console.log(response);
  }

  function onFail(error) {
    console.log(error.message);
  }

  async function onFetch() {
    await CustomAxios(
      "/posts",
      {
        method: "GET",
      },
      onSuccess,
      onFail
    );
  }

  // UseForm Hooks section

  return (
    <>
      <div className="App">
        <NextPrevious
          items={state}
          index={index}
          handleCurrentElementChange={handleCurrentElementChange}
          handleIndexChange={handleIndexChange}
        />
        <div>{index}</div>
        <div>{currentElement.title}</div>
      </div>

      <div className="App">
        <form>
          <CustomInput
            {...registerField("family-name", {
              label: "Family name",
              name: "family-name",
              value: "k",
              required: true,
              validate: function (value) {
                if (/\d+/.test(value)) {
                  console.log("The value should not be number");
                }
              },
            })}
          />
          <CustomInput
            {...registerField("name", {
              label: "Name",
              name: "name",
            })}
          />

          <button onClick={onClickButton}>click</button>
        </form>
      </div>

      <button onClick={onFetch}>fetch</button>
      <br />
      <br />

      {/* <DisplayList /> */}
      <DisplayListReact />
    </>
  );
}
