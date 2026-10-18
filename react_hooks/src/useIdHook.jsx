import { useId } from "react";

function EmailField() { // connect a label to its input
  const emailId = useId();

  return (
    <>
      <label htmlFor={emailId}>Email</label>
      <input id={emailId} type="email" />
    </>
  );
}


// The generated ID connects the label to the input, which helps accessibility. These examples follow React’s built-in Hooks reference.