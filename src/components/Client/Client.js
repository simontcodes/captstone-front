import "./Client.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BackArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";

function Client() {

    const [clientInfo, setClientInfo] = useState(null);
    const [axiosError, setAxiosError] = useState("");

    const navigate = useNavigate();

    const { id } = useParams();

    const clientByIdUrl = `http://localhost:8080/clients/client/${id}`;

    useEffect(() => {
        // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
        axios
          .get(clientByIdUrl, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            setClientInfo(response.data);
          })
          .catch((error) => {
            console.log(error);
            setAxiosError(error);
          });
        // Remember to include the token in Authorization header
      }, [id]);
  return (
    <>
       {/* <div className="warehouse-details__top">
        <div className="warehouse-details__left">
          <img
            onClick={() => navigate(-1)}
            src={BackArrowIcon}
            alt="Back arrow"
            className="warehouse-details__icon"
          />
          <h1 className="warehouse-details__title">{warehouseDetails.city}</h1>
        </div>
        <Link to={`/warehouses/edit/${id}`}>
          <button className="button--primary warehouse-details__edit-button">
            {width < 767 ? null : "Edit"}
          </button>
        </Link>
      </div>
      <div className="warehouse-details__bottom">
        <div className="warehouse-details__address">
          <h4 className="warehouse-details__label">Warehouse address:</h4>
          <p className="warehouse-details__content">
            {warehouseDetails.address},
            {width >= 767
              ? null
              : ` ${warehouseDetails.city}, ${warehouseDetails.country}`}
          </p>
          {width < 767 ? null : (
            <p className="warehouse-details__content">
              {warehouseDetails.city}, {warehouseDetails.country}
            </p>
          )}
        </div>
        <div className="warehouse-details__contacts-left">
          <h4 className="warehouse-details__label">Contact name:</h4>
          <p className="warehouse-details__content">
            {warehouseDetails.contact.name}
          </p>
          <p className="warehouse-details__content">
            {warehouseDetails.contact.position}
          </p>
        </div>
        <div className="warehouse-details__contacts-right">
          <h4 className="warehouse-details__label">Contact information:</h4>
          <p className="warehouse-details__content">
            {warehouseDetails.contact.phone}
          </p>
          <p className="warehouse-details__content">
            {warehouseDetails.contact.email}
          </p>
        </div>
      </div> */}
    </>
  );
}

export default Client;
