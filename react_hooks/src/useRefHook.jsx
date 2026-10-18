import { useRef } from "react";


const InputSearchBox = () => {
  const inputRef = useRef(null); // focus an input

  return (
    <>
      <input ref={inputRef} placeholder="Search products" />
      <button onClick={() => inputRef.current.focus()}>
        Focus search
      </button>
    </>
  );
}

export default InputSearchBox


// The ref points to the input element. Updating a ref doesn’t trigger a re-render.