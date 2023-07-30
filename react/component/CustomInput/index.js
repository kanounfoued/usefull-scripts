import React, { forwardRef } from "react";

export default forwardRef(function CustomInput({ label, ...props }, ref) {
  console.log("render");
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
});
