import "./Work.scss";

function Work() {
  return (
    <>
      <h1>
        In the last ten years, how many years of work experience do you have?
        Main Job Title & duration (up to 3 entries)
      </h1>
      <label htmlFor="job1">
        Job1:
        <input type="text" name="job1" placeholder="enter occupation" />
      </label>
      <label htmlFor="job2">
        Job2:
        <input type="text" name="job2" placeholder="enter occupation" />
      </label>
      <label htmlFor="job3">
        Job3:
        <input type="text" name="job3" placeholder="enter occupation" />
      </label>
    </>
  );
}

export default Work;
