function Province() {
  return (
    <>
      <h2>Do you have a province or city of preference?</h2>
      <label for="province">
        Select a province or Territory:
        <select name="province" form="">
          <option value="any province">Any province or territory</option>
          <option value="ontario">ON - Ontario</option>
          <option value="quebec">QC - Quebec</option>
          <option value="nova scotia">NS - Nova Scotia</option>
          <option value="new brunswick">NB - New Brunswick</option>
          <option value="manitoba">MB - Manitoba</option>
          <option value="british columbia">BC - British Columbia</option>
          <option value="prince edward island">
            PE - Prince Edward Island
          </option>
          <option value="saskatchewan">SK - Saskatchewan</option>
          <option value="alberta">AB - Alberta</option>
          <option value="newfoundland and labrador">
            NL - Newdoundland and Labrador
          </option>
          <option value="northwest territories">
            NT - Northwest Territories
          </option>
          <option value="yukon">YT - Yukon</option>
          <option value="nunavut">Nu - Nunavut</option>
        </select>
      </label>

      <label htmlFor="city">
        City of preference:
        <input
          type="text"
          name="city"
          placeholder="name a city or leave blank if no preference"
        />
      </label>

      <h2>Are you open to study in Canada?</h2>
      <label for="study">
        <select name="study" form="">
          <option value="yes">yes</option>
          <option value="no">No</option>
        </select>
      </label>
    </>
  );
}

export default Province;
