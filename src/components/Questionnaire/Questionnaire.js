import "./Questionnaire.scss";
import NextIcon from "../../assets/icons/next.svg";
import PreviousIcon from "../../assets/icons/previous.svg";
import PlusSquare from "../../assets/icons/plus-square.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";
import axios from "axios";
import Modal from "../../components/Modal/Modal";

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
  //---------state to display Modal---------
  const [isOpen, setIsOpen] = useState(false);
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
        setIsOpen(true);
        console.log(isOpen);
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
  // ---------event handlers Canada FORM/4-----------------
  function hasBeen(event) {
    setBeenCanada(true);
    event.preventDefault();
  }

  function hasNotBeen(event) {
    setBeenCanada(false);
    setFormItem(formItem + 1);
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

  const formTitles = [
    "Please Fill out the form:",
    "What is your level of education:",
    "Work experience in the last 10 years:",
    "Have you been In Canada before?",
    "Have you taken an official english test?",
    "Partner information:",
    "Province or city of preference:",
    "Review all information before submitting",
  ];
  //----------------------------------
  return (
    <>
      {isOpen && <Modal />}

      <section className="questions">
        <div className="questions__container">
          <h1 className="questions__title">{formTitles[formItem - 1]}</h1>
          <form
            onSubmit={handleSubmit(submitForm)}
            action="submit"
            className="form"
          >
            {formItem === 1 && (
              <>
                <div className="form__two-inputs">
                  <label
                    className="form__label form__full-name"
                    htmlFor="firstName"
                  >
                    First Name
                    <input
                      type="text"
                      name="firstName"
                      className="form__first-name form__input-text"
                      placeholder="First Name"
                      {...register("firstName")}
                    />
                    <span className="form__error">
                      {" "}
                      {errors.firstName?.message}{" "}
                    </span>
                  </label>

                  <label
                    className="form__label form__full-name"
                    htmlFor="last-name"
                  >
                    Last Name
                    <input
                      type="text"
                      name="lastName"
                      className="form__last-name form__input-text"
                      placeholder="Last Name"
                      {...register("lastName")}
                    />
                    <span className="form__error">
                      {" "}
                      {errors.lastName?.message}{" "}
                    </span>
                  </label>
                </div>

                <label className="form__label" htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    className="form__email form__input-text"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <span className="form__error"> {errors.email?.message} </span>
                </label>

                <label className="form__label" htmlFor="phone-number">
                  Phone Number
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="form__phone form__input-text"
                    placeholder="Phone Number"
                    {...register("phoneNumber")}
                  />
                  <span className="form__error">
                    {" "}
                    {errors.phoneNumber?.message}{" "}
                  </span>
                </label>
              </>
            )}
            {formItem === 2 && (
              <>
                <select
                  className="form__input-text form__education"
                  {...register("educationLevel")}
                  name="educationLevel"
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
                    technical school
                  </option>
                  <option
                    value="Two-year program at a university, college, trade or technical
          school"
                  >
                    Two-year program at a university, college, trade or
                    technical school
                  </option>
                  <option
                    value="Bachelor's degree(three or more year program at a university,
          college, trade or technical school, or another institute)"
                  >
                    Bachelor's degree(three or more year program at a
                    university, college, trade or technical school)
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
                <span className="form__error">
                  {" "}
                  {errors.educationLevel?.message}{" "}
                </span>
              </>
            )}
            {formItem === 3 && (
              <>
                <div className="form__work-exp">
                  {workExp.map((jobExp) => {
                    return (
                      <div
                        className="form__two-inputs form__work-inputs"
                        key={jobExp}
                      >
                        <label className="form__full-name" htmlFor="job">
                          Job title:
                          <input
                            className="form__input-text"
                            {...register(`job${jobExp + 1}`)}
                            type="text"
                            name={`job${jobExp + 1}`}
                            placeholder="enter occupation"
                          />
                        </label>
                        <label className="form__full-name" htmlFor="yearsOfExp">
                          Years of experience:
                          <input
                            className="form__input-text"
                            {...register(`yearsOfExp${jobExp + 1}`)}
                            type="number"
                            name={`yearsOfExp${jobExp + 1}`}
                          />
                        </label>
                      </div>
                    );
                  })}
                  <h4 onClick={handleWorkExp} className="form__work-title">
                    <img src={PlusSquare} alt="Plus Icon" /> add another work
                    experience
                  </h4>
                </div>
              </>
            )}
            {formItem === 4 && (
              <>
                {!beenCanada && (
                  <div className="form__button">
                    <button className="form__button button" onClick={hasBeen}>
                      Yes
                    </button>
                    <button
                      className="form__button button"
                      onClick={hasNotBeen}
                    >
                      No
                    </button>
                  </div>
                )}

                {beenCanada && (
                  <>
                    <h2>As a:</h2>
                    <div className="form__button">
                      <button
                        className="button"
                        onClick={(event) => {
                          handleTypeOfStay("visitor", event);
                        }}
                      >
                        Visitor
                      </button>
                      <button
                        className="button"
                        onClick={(event) => {
                          handleTypeOfStay("study", event);
                        }}
                      >
                        Student
                      </button>
                      <button
                        className="button"
                        onClick={(event) => {
                          handleTypeOfStay("work", event);
                        }}
                      >
                        Worker
                      </button>
                    </div>
                  </>
                )}
                {typeOfStay === "visitor" && (
                  <>
                    <h4>When did or will your visa expire?</h4>
                    <label className="form__label" htmlFor="visa-expires">
                      Date of expiry:
                      <input
                        className="form__input-text"
                        {...register("canadaVisitor")}
                        type="date"
                        name="canadaVisitor"
                      />
                    </label>
                    <p className="form__error">
                      {" "}
                      {errors.canadaVisitor?.message}{" "}
                    </p>
                  </>
                )}
                {typeOfStay === "study" && (
                  <>
                    {/* <h2>
                    Have you studied in Canada a degree, diploma or
                    certificate??
                  </h2>
                  <button
                    onClick={(event) => {
                      handleHasStudy(event);
                    }}
                  >
                    Yes
                  </button> */}

                    <>
                      <label
                        className="form__label form__spacing"
                        htmlFor="study"
                      >
                        Enter program studied in Canada:
                        <input
                          className="form__input-text"
                          {...register("canadaStudent")}
                          type="text"
                          name="canadaStudent"
                        />
                      </label>
                      <span className="form__error">
                        {" "}
                        {errors.canadaStudent?.message}{" "}
                      </span>
                    </>
                  </>
                )}
                {typeOfStay === "work" && (
                  <>
                    {/* <h2>Have you worked in Canada??</h2>
                  <button
                    onClick={(event) => {
                      handleHasWorked(event);
                    }}
                  >
                    Yes
                  </button> */}

                    <div className="form__two-inputs form__spacing">
                      <label className="form__label" htmlFor="job-title">
                        Job title:
                        <input
                          className="form__input-text"
                          {...register("canadaWorker")}
                          type="text"
                          name="canadaWorker"
                        />
                      </label>
                      <span className="form__error">
                        {" "}
                        {errors.canadaWorker?.message}{" "}
                      </span>
                      <label className="form__label" htmlFor="years-experience">
                        Canadian work experience:
                        <input
                          className="form__input-text"
                          {...register("canadaYearsOfExpirience")}
                          type="number"
                          name="canadaYearsOfExpirience"
                        />
                      </label>
                      <span className="form__error">
                        {" "}
                        {errors.canadaYearsOfExpirience?.message}{" "}
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
            {formItem === 5 && (
              <>
                <div className="form__button">
                  <button
                    className="button"
                    onClick={(event) => {
                      handleHasEnglish(event);
                    }}
                  >
                    Yes
                  </button>
                  <button className="button" onClick={nextQuestion}>
                    No
                  </button>
                </div>
                {hasEnglish && (
                  <>
                    <label className="form__label" htmlFor="english-test">
                      Select which english test have you taken:
                      <select
                        className="form__input-text"
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
                    <span className="form__errorspan">
                      {" "}
                      {errors.englishTest?.message}{" "}
                    </span>
                    <div className="form__two-inputs">
                      <label className="form__label" htmlFor="speaking">
                        Enter score for speaking:
                        <input
                          className="form__input-text"
                          {...register("englishSpeaking")}
                          type="number"
                          name="englishSpeaking"
                        />
                      </label>
                      <span className="form__error">
                        {" "}
                        {errors.englishSpeaking?.message}{" "}
                      </span>
                      <label className="form__label" htmlFor="listening">
                        Enter score for listening:
                        <input
                          className="form__input-text"
                          {...register("englishListening")}
                          type="number"
                          name="englishListening"
                        />
                      </label>
                      <span className="form__error">
                        {" "}
                        {errors.englishListening?.message}{" "}
                      </span>
                    </div>
                    <div className="form__two-inputs">
                      <label className="form__label" htmlFor="reading">
                        Enter score for reading:
                        <input
                          className="form__input-text"
                          {...register("englishReading")}
                          type="number"
                          name="englishReading"
                        />
                      </label>
                      <span className="form__error">
                        {" "}
                        {errors.englishReading?.message}{" "}
                      </span>
                      <label className="form__label" htmlFor="writing">
                        Enter score for writing:
                        <input
                          className="form__input-text"
                          {...register("englishWriting")}
                          type="number"
                          name="englishWriting"
                        />
                      </label>
                      <span className="form__error">
                        {" "}
                        {errors.englishWriting?.message}{" "}
                      </span>
                    </div>
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
                <label className="form__label" htmlFor="province">
                  Select a province or Territory:
                  <select
                    className="form__input-text"
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

                <label className="form__label" htmlFor="city">
                  City of preference:
                  <input
                    className="form__input-text"
                    {...register("cityOfPreference")}
                    type="text"
                    name="cityOfPreference"
                    placeholder="name a city or leave blank if no preference"
                  />
                </label>
                <label className="form__label" htmlFor="study">
                  Are you open to study in Canada?
                  <select
                    className="form__input-text"
                    defaultValue={""}
                    {...register("studyInCanada")}
                    name="studyInCanada"
                  >
                    <option disabled></option>
                    <option value="yes">yes</option>
                    <option value="no">No</option>
                  </select>
                  <span className="form__error">
                    {" "}
                    {errors.studyInCanada?.message}{" "}
                  </span>
                </label>
              </>
            )}
            {formItem === 8 && (
              <>
                <div className="form__review">
                  <div className="form__two-inputs">
                    <p className="form__review-line">
                      <h4 className="form__review-title">First Name: </h4>
                      {watch("firstName")}
                    </p>
                    <p className="form__review-line">
                      <h4 className="form__review-title">Last Name:</h4>{" "}
                      {watch("lastName")}
                    </p>
                  </div>
                  <div className="form__two-inputs">
                    <p className="form__review-line">
                      <h4 className="form__review-title">Email:</h4>{" "}
                      {watch("email")}
                    </p>
                    <p className="form__review-line">
                      <h4 className="form__review-title">Phone Number:</h4>{" "}
                      {watch("phoneNumber")}
                    </p>
                  </div>
                  <p className="form__review-line">
                    <h4 className="form__review-title">Education Level:</h4>{" "}
                    {watch("educationLevel")}
                  </p>
                  {workExp.map((job) => {
                    return (
                      <div key={job} className="form__two-inputs">
                        <p className="form__review-line">
                          <h4 className="form__review-title"> job exp:</h4>{" "}
                          {watch(`job${job + 1}`)}
                        </p>
                        <p className="form__review-line">
                          <h4 className="form__review-title">
                            {" "}
                            Years of experience:
                          </h4>
                          {watch(`yearsOfExp${job + 1}`)}
                        </p>
                      </div>
                    );
                  })}
                  {watch("canadaVisitor") && (
                    <p className="form__review-line">
                      <h4 className="form__review-title">
                        {" "}
                        Date visa expire or will expire:
                      </h4>{" "}
                      {watch("canadaVisitor")}
                    </p>
                  )}
                  {watch("canadaStudent") && (
                    <p className="form__review-line">
                      <h4 className="form__review-title">
                        {" "}
                        Program studied in Canada:{" "}
                      </h4>{" "}
                      {watch("canadaStudent")}
                    </p>
                  )}
                  {watch("canadaWorker") && (
                    <p>
                      Job held in Canada: {watch("canadaWorker")} Years of
                      Expirience: {watch("canadaYearsOfExpirience")}{" "}
                    </p>
                  )}
                  {watch("englishTest") && (
                    <>
                      <p className="form__review-line">
                        <h4 className="form__review-title">
                          {" "}
                          Type of test taken:
                        </h4>{" "}
                        {watch("englishTest")}
                      </p>
                      <p className="form__review-line">
                        <h4 className="form__review-title">Writing Score:</h4>
                        {watch("englishWriting")}
                        <h4 className="form__review-title">
                          Listening Score:
                        </h4>{" "}
                        {watch("englishListening")}
                        <h4 className="form__review-title">Reading Score:</h4>
                        {watch("englishReading")}
                        <h4 className="form__review-title">
                          Speaking Score:
                        </h4>{" "}
                        {watch("englishSpeaking")}
                      </p>
                    </>
                  )}
                  {watch("provinceOfPreference") && (
                    <>
                      <div className="form__two-inputs">
                        <p className="form__review-line">
                          <h4 className="form__review-title">
                            Province of preference:
                          </h4>{" "}
                          {watch("provinceOfPreference")}
                        </p>
                        <p className="form__review-line">
                          <h4 className="form__review-title">
                            City of preference:
                          </h4>{" "}
                          {watch("cityOfPreference")}{" "}
                        </p>
                      </div>

                      <p className="form__review-line">
                        <h4 className="form__review-title">
                          Willing to study in Canada:
                        </h4>{" "}
                        {watch("studyInCanada")}
                      </p>
                    </>
                  )}
                </div>
                <button className="button">Submit</button>
              </>
            )}
          </form>
        </div>
        <div className="form__navigation-arrows">
          {formItem !== 1 && (
            <img
              className="form__arrows"
              onClick={previousQuestion}
              src={PreviousIcon}
              alt=""
            />
          )}
          {formItem !== 8 && (
            <img
              className="form__arrows"
              onClick={nextQuestion}
              src={NextIcon}
              alt=""
            />
          )}
        </div>
        <div className="progress">
          <div
            onClick={() => {
              setFormItem(1);
            }}
            className={`circle ${formItem >= 1 ? "done" : ""}`}
          >
            <span className="label">1</span>
            <span className="title">Personal</span>
          </div>
          <span className="bar done"></span>
          <div
            onClick={() => {
              setFormItem(2);
            }}
            className={`circle ${formItem >= 2 ? "done" : ""}`}
          >
            <span className="label">2</span>
            <span className="title">Education</span>
          </div>
          <span className="bar half"></span>
          <div
            onClick={() => {
              setFormItem(3);
            }}
            className={`circle ${formItem >= 3 ? "done" : ""}`}
          >
            <span className="label">3</span>
            <span className="title">Work</span>
          </div>
          <span className="bar"></span>
          <div
            onClick={() => {
              setFormItem(4);
            }}
            className={`circle ${formItem >= 4 ? "done" : ""}`}
          >
            <span className="label">4</span>
            <span className="title">Canada</span>
          </div>
          <span className="bar"></span>
          <div
            onClick={() => {
              setFormItem(5);
            }}
            className={`circle ${formItem >= 5 ? "done" : ""}`}
          >
            <span className="label">5</span>
            <span className="title">English</span>
          </div>
          <span className="bar"></span>
          <div
            onClick={() => {
              setFormItem(6);
            }}
            className={`circle ${formItem >= 6 ? "done" : ""}`}
          >
            <span className="label">6</span>
            <span className="title">Partner</span>
          </div>
          <span className="bar"></span>
          <div
            onClick={() => {
              setFormItem(7);
            }}
            className={`circle ${formItem >= 7 ? "done" : ""}`}
          >
            <span className="label">7</span>
            <span className="title">Preference</span>
          </div>
          <span className="bar"></span>
          <div
            onClick={() => {
              setFormItem(8);
            }}
            className={`circle ${formItem >= 8 ? "done" : ""}`}
          >
            <span className="label">8</span>
            <span className="title">Review</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Questionnaire;
