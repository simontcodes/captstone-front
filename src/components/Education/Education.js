function Education() {
  return (
    <>
      <h2 className="form__title">What is your level of education?</h2>

      <label for="education-level">
        Enter the highest level of education for which you:
        <select name="education-level" id="cars" form="carform">
          <option value="volvo">
            None, or less than secondary(high school)
          </option>
          <option value="saab">
            Secondary diploma (high school graduation)
          </option>
          <option value="opel">
            One-year program at a university, college, trade or technical
            school, or another institute
          </option>
          <option value="audi">
            Two-year program at a university, college, trade or technical
            school, or another institute
          </option>
          <option value="audi">
            Bachelor's degree(three or more year program at a university,
            college, trade or technical school, or another institute)
          </option>
          <option value="audi">
            Two or more certificates, diplomas or degrees. One must be for a
            program of three or more years
          </option>
          <option value="audi">
            Two-year program at a university, college, trade or technical
            school, or another institute
          </option>
          <option value="audi">
            Master's degree, or professional degree needed to practice in a
            licensed profession
          </option>
          <option value="audi">Doctoral level university degree(PhD)</option>
        </select>
      </label>
    </>
  );
}

export default Education;
