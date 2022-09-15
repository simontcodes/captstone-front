import { useState } from "react";

function Married({ formItem, setFormItem }) {
  const [isMarried, setIsMarried] = useState(null);

  function handleIsMarried(event) {
    event.preventDefault();
    setIsMarried(true);
  }
  function handleNextQuestion(event) {
    event.preventDefault();
    setFormItem(formItem + 1);
  }
  return (
    <>
      <h2>Are you married or in common law?</h2>
      <button
        onClick={(event) => {
          handleIsMarried(event);
        }}
      >
        Yes
      </button>
      <button
        onClick={(event) => {
          handleNextQuestion(event);
        }}
      >
        No
      </button>

      {/* ----------------add forms here-------------- */}
    </>
  );
}

export default Married;
