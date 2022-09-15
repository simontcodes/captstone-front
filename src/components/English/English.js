import { useState } from "react";

function English({ formItem, setFormItem }) {
  const [hasEnglish, setHasEnglish] = useState(false);
  //   const [typeOfTest, setTypeOfTest] = useState(null);

  function handleHasEnglish(event) {
    event.preventDefault();
    setHasEnglish(true);
  }
  function handleNextQuestion(event) {
    event.preventDefault();
    setFormItem(formItem + 1);
  }
  return (
    <>
      <h2>Have you done an official English IELTS or Celpip test?</h2>
      <button
        onClick={(event) => {
          handleHasEnglish(event);
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
      {hasEnglish && (
        <>
          <label for="english-test">
            Select which english test have you taken:
            <select name="english-test" form="c">
              <option value="IELTS">IELTS</option>
              <option value="CELPIP">CELPIP</option>
            </select>
          </label>
          <label htmlFor="speaking">
            Enter score for speaking:
            <input type="number" name="speaking" />
          </label>
          <label htmlFor="listening">
            Enter score for listening:
            <input type="number" name="listening" />
          </label>
          <label htmlFor="reading">
            Enter score for reading:
            <input type="number" name="reading" />
          </label>
          <label htmlFor="writing">
            Enter score for writing:
            <input type="number" name="writing" />
          </label>
        </>
      )}
    </>
  );
}

export default English;
