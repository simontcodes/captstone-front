import "./Questionnaire.scss";
import Work from "../Work/Work";
import Personal from "../Personal/Personal";
import Education from "../Education/Education";
import Canada from "../Canada/Canada";
import English from "../English/English";
import Married from "../Married/Married";
import Province from "../Province/Province";
import Submit from "../Submit/Submit";
import NextIcon from "../../assets/icons/next.svg";
import PreviousIcon from "../../assets/icons/previous.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
});



function Questionnaire() {
  const [formItem, setFormItem] = useState(1);
  // --------states to display forms in Canada/FORM 4----------------------
  const [beenCanada, setBeenCanada] = useState(false);
  const [typeOfStay, setTypeOfStay] = useState(null);
  const [hasStudy, setHasStudy] = useState(null);
  const [hasWorked, setHasWorked] = useState(null);
  //---------------------------------------

  // trying to use react hook form with yups
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  
//function passed to handleSubmit
  const submitForm = (data) => {
    console.log(data)
    
    
  };

  console.log(watch('firstName'))

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
  //-----------------------------------
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
  //------------------------------------
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
            </>
          )}
          {formItem === 3 && (
            <>
              <h1>
                In the last ten years, how many years of work experience do you
                have? Main Job Title & duration (up to 3 entries)
              </h1>
              <label htmlFor="job1">
                Job1:
                <input
                  {...register("job1")}
                  type="text"
                  name="job1"
                  placeholder="enter occupation"
                />
              </label>
              <label htmlFor="job2">
                Job2:
                <input
                  {...register("job2")}
                  type="text"
                  name="job2"
                  placeholder="enter occupation"
                />
              </label>
              <label htmlFor="job3">
                Job3:
                <input
                  {...register("job3")}
                  type="text"
                  name="job3"
                  placeholder="enter occupation"
                />
              </label>
            </>
          )}
          {formItem === 4 && <>
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
            <input {...register("canadaVisitor")} type="date" name="canadaVisitor" />
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
              <input {...register("canadaStudent")} type="text" name="canadaStudent" />
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
                <input {...register("canadaYearsOfExpirience")} type="number" name="canadaYearsOfExpirience" />
              </label>
              <label htmlFor="job-title">
                Job title:
                <input {...register("canadaWorker")} type="text" name="canadaWorker" />
              </label>
            </>
          )}
        </>
      )}
    </>}
          {formItem === 5 && (
            <English formItem={formItem} setFormItem={setFormItem} />
          )}
          {formItem === 6 && (
            <Married formItem={formItem} setFormItem={setFormItem} />
          )}
          {formItem === 7 && <Province />}
          {formItem === 8 && <>
      <h2>Please confirm all information is correct before submitting</h2>
        <p>First Name: {watch("firstName")}</p>
        <p>Last Name: {watch("lastName")}</p>
        <p>Email: {watch('email')}</p>
      
      
      
      <button>Submit</button>
    </>}
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
    </section>
  );
}

export default Questionnaire;
