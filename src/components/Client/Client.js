import "./Client.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BackArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";

function Client() {
  const [clientInfo, setClientInfo] = useState({});
  const [clientAppointments, setClientAppointments] = useState([]);
  const [clientWorkExp, setClientWorkExp] = useState([]);
  const [axiosError, setAxiosError] = useState("");

  const { clientId } = useParams();
  const navigate = useNavigate();

  //State to track size of browser window for styling
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
    axios
      .get(`http://localhost:8080/client/${clientId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
          email: localStorage.getItem("email"),
        },
      })
      .then((response) => {
        console.log(response.data[0][0]);
        setClientInfo(response.data[0][0]);
        console.log(response.data[1]);
        setClientAppointments(response.data[1]);
        console.log(response.data[2]);
        setClientWorkExp(response.data[2]);
      })
      .catch((error) => {
        console.log(error);
        setAxiosError(error);
      });
    // Remember to include the token in Authorization header
  }, [clientId]);
  return (
    <>
      <div className="warehouse-details__top">
        <div className="warehouse-details__left">
          <img
            onClick={() => navigate(-1)}
            src={BackArrowIcon}
            alt="Back arrow"
            className="warehouse-details__icon"
          />
          <h1 className="warehouse-details__title">
            {clientInfo.firstName} {clientInfo.lastName}
          </h1>
        </div>
        <Link to={`/warehouses/edit/${clientInfo.id}`}>
          <button className="button--primary warehouse-details__edit-button">
            {width < 767 ? null : "Edit"}
          </button>
        </Link>
      </div>
      <div className="warehouse-details__bottom">
        <div className="warehouse-details__box">
          <div className="warehouse-details__box-title">
            <h2 className="warehouse-details__box-title-text">Personal:</h2>
          </div>
          <div className="warehouse-details__address">
            <h4 className="warehouse-details__label">Email:</h4>
            <p className="warehouse-details__content">
              {clientInfo.email}
              {/* {width >= 767
              ? null
              : ` `} */}
            </p>
            {/* {width < 767 ? null : (
            <p className="warehouse-details__content">
              {}, {}
            </p>
          )} */}
          </div>
          <div className="warehouse-details__address">
            <h4 className="warehouse-details__label">Phone Number:</h4>
            <p className="warehouse-details__content">
              {clientInfo.phoneNumber}
            </p>
            <p className="warehouse-details__content">{}</p>
          </div>
          <div className="warehouse-details__address">
            <h4 className="warehouse-details__label">Education Level:</h4>
            <p className="warehouse-details__content">
              {clientInfo.educationLevel}
            </p>
          </div>
        </div>

        {clientInfo.englishTest && (
          <>
            {" "}
            <div className="warehouse-details__box">
              <div className="warehouse-details__box-title">
                <h2 className="warehouse-details__box-title-text">English:</h2>
              </div>
              <div className="warehouse-details__contacts-right">
                <h4 className="warehouse-details__label">English Test:</h4>
                <p className="warehouse-details__content">
                  {clientInfo.englishTest}
                </p>
              </div>
              <div className="warehouse-details__contacts-right">
                <h4 className="warehouse-details__label">Listening:</h4>
                <p className="warehouse-details__content">
                  {clientInfo.englishListening}
                </p>
              </div>
              <div className="warehouse-details__contacts-right">
                <h4 className="warehouse-details__label">Speaking:</h4>
                <p className="warehouse-details__content">
                  {clientInfo.englishSpeaking}
                </p>
              </div>
              <div className="warehouse-details__contacts-right">
                <h4 className="warehouse-details__label">Reading:</h4>
                <p className="warehouse-details__content">
                  {clientInfo.englishReading}
                </p>
              </div>
              <div className="warehouse-details__contacts-right">
                <h4 className="warehouse-details__label">Writing:</h4>
                <p className="warehouse-details__content">
                  {clientInfo.englishWriting}
                </p>
              </div>
            </div>
          </>
        )}
        <div className="warehouse-details__box">
          <div className="warehouse-details__box-title">
            <h2 className="warehouse-details__box-title-text">Preference:</h2>
          </div>
          <div className="warehouse-details__contacts-right">
            <h4 className="warehouse-details__label">
              Province Of Preference:
            </h4>
            <p className="warehouse-details__content">
              {clientInfo.provinceOfPreference}
            </p>
          </div>
          <div className="warehouse-details__contacts-right">
            <h4 className="warehouse-details__label">
              Willing to study in Canada:
            </h4>
            <p className="warehouse-details__content">
              {clientInfo.studyInCanada}
            </p>
          </div>
          <div className="warehouse-details__contacts-right">
            <h4 className="warehouse-details__label">City Of Preference:</h4>
            <p className="warehouse-details__content">
              {clientInfo.cityOfPreference}
            </p>
          </div>
        </div>

        {(clientInfo.canadaVisitor ||
          clientInfo.canadaStudent ||
          clientInfo.canadaWorker) && (
          <div className="warehouse-details__box">
            <div className="warehouse-details__box-title">
              <h2 className="warehouse-details__box-title-text">Canada:</h2>
            </div>
            {clientInfo.canadaVisitor && (
              <div className="warehouse-details__contacts-right">
                <h4 className="warehouse-details__label">
                  Canada visa expiry date:
                </h4>
                <p className="warehouse-details__content">
                  {clientInfo.canadaVisitor.slice(0, 10)}
                </p>
              </div>
            )}
            {clientInfo.canadaWorker && (
              <div className="warehouse-details__contacts-right">
                <h4 className="warehouse-details__label">Work in Canada as:</h4>
                <p className="warehouse-details__content">
                  {clientInfo.canadaWorker}
                </p>
                <p className="warehouse-details__content">
                  for {clientInfo.canadaWorker} years
                </p>
              </div>
            )}
            {clientInfo.canadaStudent && (
              <div className="warehouse-details__contacts-right">
                <h4 className="warehouse-details__label">Studied in Canada:</h4>
                <p className="warehouse-details__content">
                  {clientInfo.canadaStudent}
                </p>
              </div>
            )}
          </div>
        )}
        <div className="warehouse-details__box">
          <div className="warehouse-details__contacts-right">
            <h4 className="warehouse-details__label">
              Work Experience Outside Canada:
            </h4>
            {clientWorkExp.map((client) => {
              return (
                <p className="warehouse-details__content">
                  As: {client.jobTitle} For:{client.yearsOfExperience} Years
                </p>
              );
            })}
          </div>
        </div>
        <div className="warehouse-details__contacts-right">
          <h4 className="warehouse-details__label">Appointment with us:</h4>
          {clientAppointments.map((client) => {
            return (
              <p className="warehouse-details__content">
                Date: {client.dateOfAppointment} Time:{client.timeOfAppointment}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Client;
