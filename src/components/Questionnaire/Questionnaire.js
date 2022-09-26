import "./Questionnaire.scss";
import NextIcon from "../../assets/icons/next.svg";
import PreviousIcon from "../../assets/icons/previous.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";
import Reference from "yup/lib/Reference";
import axios from "axios";

const URLPostForm = "http://localhost:8080/clientsPost";

//YUP schema to list out every type of validation
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().phone().required(),
  educationLevel: yup.string().required(),
  englishSpeaking: yup
    .number()
    .positive()
    .integer()
    .max(12, "The maximum is 12"),
  englishWriting: yup
    .number()
    .positive()
    .integer()
    .max(12, "The maximum is 12"),
  englishListening: yup
    .number()
    .positive()
    .integer()
    .max(12, "The maximum is 12"),
  englishReading: yup
    .number()
    .positive()
    .integer()
    .max(12, "The maximum is 12"),
  canadaStudent: yup.string(),
  canadaWorker: yup.string(),
  canadaYearsOfExpirience: yup.string(),
  canadaVisitor: yup.date(),
  studyInCanada: yup.string().required(),
});

function Questionnaire() {
  const [formItem, setFormItem] = useState(1);
  //------state to add input field on demand for job experience/FORM3-------
  const [workExp, setWorkExp] = useState([0]);
  // --------states to display forms in Canada/FORM 4----------------------
  const [beenCanada, setBeenCanada] = useState(false);
  const [typeOfStay, setTypeOfStay] = useState(null);
  const [hasStudy, setHasStudy] = useState(null);
  const [hasWorked, setHasWorked] = useState(null);
  //---------state to display forms in English/FORM5-----------------
  const [hasEnglish, setHasEnglish] = useState(false);
  // -------state to display is married form step 6------------
  const [isMarried, setIsMarried] = useState(null);
  // react hook form with yup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  //getting appointment info from session storage to be pass in the post request
  let dateAndTime = sessionStorage.getItem("dateAndTime").slice(0, 24);
  let dateOfAppointment = dateAndTime.substring(0, 15);
  let timeOfAppointment = dateAndTime.substring(16);

  //function passed to handleSubmit
  const submitForm = (data) => {
    console.log(data);
    //array to be sent in the post with the list of jobs
    let workExpArray = [];

    for (let i = 0; i < workExp.length; i++) {
      workExpArray.push({
        jobTitle: data["job" + `${i + 1}`],
        yearsOfExperience: data["yearsOfExp" + `${i + 1}`],
      });
    }

    axios
      .post(URLPostForm, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        educationLevel: data.educationLevel,
        canadaVisitor: data.canadaVisitor,
        canadaStudent: data.canadaStudent,
        canadaWorker: data.canadaWorker,
        canadaYearsOfExpirience: data.canadaYearsOfExpirience,
        studyInCanada: data.studyInCanada,
        englishTest: data.englishTest,
        englishListening: data.englishListening,
        englishReading: data.englishReading,
        englishSpeaking: data.englishSpeaking,
        englishWriting: data.englishWriting,
        provinceOfPreference: data.provinceOfPreference,
        cityOfPreference: data.cityOfPreference,
        jobs: JSON.stringify(workExpArray),
        typeOfService: sessionStorage.getItem("typeOfService"),
        dateOfAppointment: dateOfAppointment,
        timeOfAppointment: timeOfAppointment,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "http://localhost:3000/success";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //logic to show pieces of the form
  function nextQuestion() {
    if (formItem === 8) {
      return;
    }
    setFormItem(formItem + 1);
  }

  function previousQuestion() {
    if (formItem === 1) {
      return;
    }
    setFormItem(formItem - 1);
  }
  // event handler for work exp FORM/3------------
  function handleWorkExp() {
    setWorkExp([...workExp, workExp.length]);
  }
  // ---------event handlers Canada FORM4-----------------
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
  //---Event handlers English FORM5
  function handleHasEnglish(event) {
    event.preventDefault();
    setHasEnglish(true);
  }

  //--Event handlers for is Married-------------
  function handleIsMarried(event) {
    event.preventDefault();
    setIsMarried(true);
  }
  function handleNextQuestion(event) {
    event.preventDefault();
    setFormItem(formItem + 1);
  }
  //----------------------------------
  return (
    <section className="questions">
      <div className="questions__container">
        <p>Step{formItem} out of 8</p>
        <form
          onSubmit={handleSubmit(submitForm)}
          action="submit"
          className="form"
        >
          {formItem === 1 && (
            <>
              <label htmlFor="firstName">
                First Name
                <input
                  type="text"
                  name="firstName"
                  className="form__first-name"
                  placeholder="First Name"
                  {...register("firstName")}
                />
              </label>
              <p> {errors.firstName?.message} </p>
              <label htmlFor="last-name">
                Last Name
                <input
                  type="text"
                  name="lastName"
                  className="form__last-name"
                  placeholder="Last Name"
                  {...register("lastName")}
                />
              </label>
              <p> {errors.lastName?.message} </p>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  className="form__email"
                  placeholder="Email"
                  {...register("email")}
                />
              </label>
              <p> {errors.email?.message} </p>
              <label htmlFor="phone-number">
                Phone Number
                <input
                  type="tel"
                  name="phoneNumber"
                  className="form__phone"
                  placeholder="Phone Number"
                  {...register("phoneNumber")}
                />
              </label>
              <p> {errors.phoneNumber?.message} </p>
            </>
          )}
          {formItem === 2 && (
            <>
              <h2 className="form__title">What is your level of education?</h2>

              <label htmlFor="education-level">
                Enter the highest level of education for which you:
                <select
                  {...register("educationLevel")}
                  name="educationLevel"
                  id="cars"
                  form="carform"
                >
                  <option value="None, or less than secondary(high school)">
                    None, or less than secondary(high school)
                  </option>
                  <option value="Secondary diploma (high school graduation)">
                    Secondary diploma (high school graduation)
                  </option>
                  <option
                    value="One-year program at a university, college, trade or technical
            school, or another institute"
                  >
                    One-year program at a university, college, trade or
                    technical school, or another institute
                  </option>
                  <option
                    value="Two-year program at a university, college, trade or technical
            school, or another institute"
                  >
                    Two-year program at a university, college, trade or
                    technical school, or another institute
                  </option>
                  <option
                    value="Bachelor's degree(three or more year program at a university,
            college, trade or technical school, or another institute)"
                  >
                    Bachelor's degree(three or more year program at a
                    university, college, trade or technical school, or another
                    institute)
                  </option>
                  <option
                    value="Two or more certificates, diplomas or degrees. One must be for a
            program of three or more years"
                  >
                    Two or more certificates, diplomas or degrees. One must be
                    for a program of three or more years
                  </option>
                  <option
                    value="Two-year program at a university, college, trade or technical
            school, or another institute"
                  >
                    Two-year program at a university, college, trade or
                    technical school, or another institute
                  </option>
                  <option
                    value="Master's degree, or professional degree needed to practice in a
            licensed profession"
                  >
                    Master's degree, or professional degree needed to practice
                    in a licensed profession
                  </option>
                  <option value="Doctoral level university degree(PhD)">
                    Doctoral level university degree(PhD)
                  </option>
                </select>
              </label>
              <p> {errors.educationLevel?.message} </p>
            </>
          )}
          {formItem === 3 && (
            <>
              <h1>
                In the last ten years, how many years of work experience do you
                have? Main Job Title & duration
              </h1>
              {workExp.map((jobExp) => {
                return (
                  <div key={jobExp}>
                    <label htmlFor="job">
                      Job title:
                      <input
                        {...register(`job${jobExp + 1}`)}
                        type="text"
                        name={`job${jobExp + 1}`}
                        placeholder="enter occupation"
                      />
                    </label>
                    <label htmlFor="yearsOfExp">
                      Years of experience:
                      <input
                        {...register(`yearsOfExp${jobExp + 1}`)}
                        type="number"
                        name={`yearsOfExp${jobExp + 1}`}
                      />
                    </label>
                  </div>
                );
              })}
              <button onClick={handleWorkExp}> Add another job </button>
            </>
          )}
          {formItem === 4 && (
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
                    <input
                      {...register("canadaVisitor")}
                      type="date"
                      name="canadaVisitor"
                    />
                  </label>
                  <p> {errors.canadaVisitor?.message} </p>
                </>
              )}
              {typeOfStay === "study" && (
                <>
                  <h2>
                    Have you studied in Canada a degree, diploma or
                    certificate??
                  </h2>
                  <button
                    onClick={(event) => {
                      handleHasStudy(event);
                    }}
                  >
                    Yes
                  </button>

                  {hasStudy && (
                    <>
                      <label htmlFor="study">
                        Enter program studied in Canada:
                        <input
                          {...register("canadaStudent")}
                          type="text"
                          name="canadaStudent"
                        />
                      </label>
                      <p> {errors.canadaStudent?.message} </p>
                    </>
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
                        <input
                          {...register("canadaYearsOfExpirience")}
                          type="number"
                          name="canadaYearsOfExpirience"
                        />
                      </label>
                      <p> {errors.canadaYearsOfExpirience?.message} </p>
                      <label htmlFor="job-title">
                        Job title:
                        <input
                          {...register("canadaWorker")}
                          type="text"
                          name="canadaWorker"
                        />
                      </label>
                      <p> {errors.canadaWorker?.message} </p>
                    </>
                  )}
                </>
              )}
            </>
          )}
          {formItem === 5 && (
            <>
              <h2>Have you done an official English IELTS or Celpip test?</h2>
              <button
                onClick={(event) => {
                  handleHasEnglish(event);
                }}
              >
                Yes
              </button>
              <button onClick={nextQuestion}>No</button>
              {hasEnglish && (
                <>
                  <label htmlFor="english-test">
                    Select which english test have you taken:
                    <select
                      {...register("englishTest")}
                      name="englishTest"
                      form="c"
                    >
                      <option value="none" selected disabled hidden>
                        Select an Option
                      </option>
                      <option value="IELTS">IELTS</option>
                      <option value="CELPIP">CELPIP</option>
                    </select>
                  </label>
                  <p> {errors.englishTest?.message} </p>
                  <label htmlFor="speaking">
                    Enter score for speaking:
                    <input
                      {...register("englishSpeaking")}
                      type="number"
                      name="englishSpeaking"
                    />
                  </label>
                  <p> {errors.englishSpeaking?.message} </p>
                  <label htmlFor="listening">
                    Enter score for listening:
                    <input
                      {...register("englishListening")}
                      type="number"
                      name="englishListening"
                    />
                  </label>
                  <p> {errors.englishListening?.message} </p>
                  <label htmlFor="reading">
                    Enter score for reading:
                    <input
                      {...register("englishReading")}
                      type="number"
                      name="englishReading"
                    />
                  </label>
                  <p> {errors.englishReading?.message} </p>
                  <label htmlFor="writing">
                    Enter score for writing:
                    <input
                      {...register("englishWriting")}
                      type="number"
                      name="englishWriting"
                    />
                  </label>
                  <p> {errors.englishWriting?.message} </p>
                </>
              )}
            </>
          )}
          {/* {formItem === 6 && (
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

              
            </>
          )} */}
          {formItem === 7 && (
            <>
              <h2>Do you have a province or city of preference?</h2>
              <label htmlFor="province">
                Select a province or Territory:
                <select
                  {...register("provinceOfPreference")}
                  name="provinceOfPreference"
                >
                  <option value="any province">
                    Any province or territory
                  </option>
                  <option value="ontario">ON - Ontario</option>
                  <option value="quebec">QC - Quebec</option>
                  <option value="nova scotia">NS - Nova Scotia</option>
                  <option value="new brunswick">NB - New Brunswick</option>
                  <option value="manitoba">MB - Manitoba</option>
                  <option value="british columbia">
                    BC - British Columbia
                  </option>
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
                  {...register("cityOfPreference")}
                  type="text"
                  name="cityOfPreference"
                  placeholder="name a city or leave blank if no preference"
                />
              </label>

              <h2>Are you open to study in Canada?</h2>
              <label htmlFor="study">
                <select defaultValue={""} {...register("studyInCanada")} name="studyInCanada">
                <option disabled ></option>
                  <option value="yes">yes</option>
                  <option value="no">No</option>
                </select>
                <p> {errors.studyInCanada?.message} </p>
              </label>
            </>
          )}
          {formItem === 8 && (
            <>
              <h2>
                Please confirm all information is correct before submitting
              </h2>
              <p>First Name: {watch("firstName")}</p>
              <p>Last Name: {watch("lastName")}</p>
              <p>Email: {watch("email")}</p>
              <p>Phone Number: {watch("phoneNumber")}</p>
              <p>Highest Education Level: {watch("educationLevel")}</p>
              {workExp.map((job) => {
                return (
                  <div key={job}>
                    <p>
                      job exp: {watch(`job${job + 1}`)} Years of experience:
                      {watch(`yearsOfExp${job + 1}`)}
                    </p>
                  </div>
                );
              })}
              {watch("canadaVisitor") && (
                <p>Date visa expire or will expire: {watch("canadaVisitor")}</p>
              )}
              {watch("canadaStudent") && (
                <p>Date visa expire or will expire: {watch("canadaStudent")}</p>
              )}
              {watch("canadaWorker") && (
                <p>
                  Job held in Canada: {watch("canadaWorker")} Years of
                  Expirience: {watch("canadaYearsOfExpirience")}{" "}
                </p>
              )}
              {watch("englishTest") && (
                <p>
                  Type of test taken: {watch("englishTest")} Writing Score:{" "}
                  {watch("englishWriting")} Listening Score:{" "}
                  {watch("englishListening")} Reading Score:{" "}
                  {watch("englishReading")} Speaking Score:{" "}
                  {watch("englishSpeaking")}
                </p>
              )}
              {watch("provinceOfPreference") && (
                <p>
                  Province of preference: {watch("provinceOfPreference")} Years
                  of City of preference: {watch("cityOfPreference")} Willing to
                  study in Canada: {watch("studyInCanada")}
                </p>
              )}

              <button>Submit</button>
            </>
          )}
        </form>

        {formItem !== 1 && (
          <button onClick={previousQuestion}>
            <img src={PreviousIcon} alt="" />
          </button>
        )}
        {formItem !== 8 && (
          <button onClick={nextQuestion}>
            <img src={NextIcon} alt="" />
          </button>
        )}
      </div>
      <div className="progress">
        <div onClick={() =>{setFormItem(1)}} className={`circle ${ (formItem >= 1) ? "done" : ""}`}>
          <span className="label">1</span>
          <span className="title">Personal</span>
        </div>
        <span className="bar done"></span>
        <div onClick={() =>{setFormItem(2)}} className={`circle ${ (formItem >= 2) ? "done" : ""}`}>
          <span className="label">2</span>
          <span className="title">Education</span>
        </div>
        <span className="bar half"></span>
        <div onClick={() =>{setFormItem(3)}} className={`circle ${ (formItem >= 3) ? "done" : ""}`}>
          <span className="label">3</span>
          <span className="title">Work</span>
        </div>
        <span className="bar"></span>
        <div onClick={() =>{setFormItem(4)}} className={`circle ${ (formItem >= 4) ? "done" : ""}`}>
          <span className="label">4</span>
          <span className="title">Canada</span>
        </div>
        <span className="bar"></span>
        <div onClick={() =>{setFormItem(5)}} className={`circle ${ (formItem >= 5) ? "done" : ""}`}>
          <span className="label">5</span>
          <span className="title">English</span>
        </div>
        <span className="bar"></span>
        <div onClick={() =>{setFormItem(6)}} className={`circle ${ (formItem >= 6) ? "done" : ""}`}>
          <span className="label">6</span>
          <span className="title">Partner</span>
        </div>
        <span className="bar"></span>
        <div onClick={() =>{setFormItem(7)}} className={`circle ${ (formItem >= 7) ? "done" : ""}`}>
          <span className="label">7</span>
          <span className="title">Preference</span>
        </div>
        <span className="bar"></span>
        <div onClick={() =>{setFormItem(8)}} className={`circle ${ (formItem >= 8) ? "done" : ""}`}>
          <span className="label">8</span>
          <span className="title">Review</span>
        </div>
      </div>
    </section>
  );
}

export default Questionnaire;
