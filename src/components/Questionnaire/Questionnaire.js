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

function Questionnaire() {
  const [formItem, setFormItem] = useState(1);

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

  return (
    <section className="questions">
      <div className="questions__container">
        <p>Step{formItem} out of 8</p>
        <form action="submit" className="form">
          {formItem === 1 && <Personal />}
          {formItem === 2 && <Education />}
          {formItem === 3 && <Work />}
          {formItem === 4 && <Canada />}
          {formItem === 5 && (
            <English formItem={formItem} setFormItem={setFormItem} />
          )}
          {formItem === 6 && (
            <Married formItem={formItem} setFormItem={setFormItem} />
          )}
          {formItem === 7 && <Province />}
          {formItem === 8 && <Submit />}
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
