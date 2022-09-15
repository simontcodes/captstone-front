import { useState } from "react";

function Canada() {
  // ---------------------states to display forms----------------------
  const [beenCanada, setBeenCanada] = useState(false);
  const [typeOfStay, setTypeOfStay] = useState(null);
  const [hasStudy, setHasStudy] = useState(null);
  const [hasWorked, setHasWorked] = useState(null);

  // -----------------event handlers-----------------
  function hasBeen(event) {
    setBeenCanada(true);
    event.preventDefault();
  }

  function hasNotBeen(event) {
    setBeenCanada(false);
    event.preventDefault();
  }

  function handleTypeOfStay(type, event) {
    setTypeOfStay(type);
    event.preventDefault();
  }

  function handleHasStudy(event) {
    event.preventDefault();
    setHasStudy(true);
  }

  function handleHasWorked(event) {
    event.preventDefault();
    setHasWorked(true);
  }

  return (
    <>
      {!beenCanada && (
        <>
          <h1>Have you been in Canada before? </h1>
          <button onClick={hasBeen}>Yes</button>
          <button onClick={hasNotBeen}>No</button>
        </>
      )}

      {beenCanada && (
        <>
          <h2>what was your status during your stay?</h2>
          <button
            onClick={(event) => {
              handleTypeOfStay("visitor", event);
            }}
          >
            Visitor
          </button>
          <button
            onClick={(event) => {
              handleTypeOfStay("study", event);
            }}
          >
            Studies
          </button>
          <button
            onClick={(event) => {
              handleTypeOfStay("work", event);
            }}
          >
            Worker
          </button>
        </>
      )}
      {typeOfStay === "visitor" && (
        <>
          <h2>When did or will your visa expire?</h2>
          <label htmlFor="visa-expires">
            Date of expiry:
            <input type="date" name="visa-expires" />
          </label>
        </>
      )}
      {typeOfStay === "study" && (
        <>
          <h2>Have you studied in Canada a degree, diploma or certificate??</h2>
          <button
            onClick={(event) => {
              handleHasStudy(event);
            }}
          >
            Yes
          </button>

          {hasStudy && (
            <label htmlFor="study">
              Enter program studied in Canada:
              <input type="text" name="study" />
            </label>
          )}
        </>
      )}
      {typeOfStay === "work" && (
        <>
          <h2>Have you worked in Canada??</h2>
          <button
            onClick={(event) => {
              handleHasWorked(event);
            }}
          >
            Yes
          </button>

          {hasWorked && (
            <>
              <label htmlFor="years-experience">
                Years of canadian work experience:
                <input type="number" name="years-experience" />
              </label>
              <label htmlFor="job-title">
                Job title:
                <input type="text" name="job-title" />
              </label>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Canada;
