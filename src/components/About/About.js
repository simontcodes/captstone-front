import "./About.scss"
import Certified from "../../assets/images/certified-logo.png"


function About () {
    return(
     <section id="about" className="about">
        <div className="about__certified">
            <img className="about__logo" src={Certified} alt="" />
        </div>
        
            <h2 className="about__text">Albina Kuramshina is a Regulated Canadian Immigration Consultant RCIC #R706301.
Check our status with the College of Immigration and Citizenship Consultants <span className="about__link"> here</span> </h2>
        

     </section>
    )
}

export default  About;