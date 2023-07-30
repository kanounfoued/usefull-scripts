import { useState, useRef } from "react";

export default function useFormHook() {
  const returnedData = useRef({});
  const formInputs = useRef({
    fields: {},
  });

  // State of the form
  const [state, setState] = useState({
    isValid: true,
    errors: {},
    // any errors comes from backend.
    formError: "",
  });

  function handleOnBlur(e) {
    console.log("Blur");
    const {
      target: { name },
    } = e;

    const { fields } = formInputs.current;

    if (fields[name].required && !fields[name].value) {
      console.log("The field is required");
      return;
    }

    if (fields[name].validate) {
      return fields[name].validate(fields[name].value);
    }
  }

  function handleOnFocus() {
    console.log("Focus");
  }

  /**
     * Update the value of fields based on the element's ref value
     * @param props {
     *    Properties: name, required, value, placeholder, label
          Function: validate
     * }
     */
  function registerField(name, props) {
    const { fields } = formInputs.current;

    if (fields[name] !== undefined) {
      const { validate, ...restFieldProps } = fields[name];
      return {
        ...restFieldProps,
      };
    }

    const { value, validate, ...rest } = props;

    fields[name] = {
      ...rest,
      validate,
      /**
       * element refers to the dom input
       */
      element: null,
    };

    /**
     * return all the data into the caller fields
     */
    return {
      ...rest,
      onFocus: handleOnFocus,
      onBlur: handleOnBlur,
      /**
       *  ref: is the reference to an element,
       *  save the element if it already exists in the DOM
       *  if the is mounted into the DOM, give it the start value if it is truthy value.
       */
      ref: function (element) {
        if (element) {
          fields[name].element = element;

          if (value) {
            element.value = value;
          }
        }

        return element;
      },
    };
  }

  returnedData.current = {
    registerField,
  };

  return returnedData.current;
}
