import "./Clients.scss";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import sortArrows from "../../assets/icons/sort-24px.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Clients() {
  const [clientInfo, setClientInfo] = useState(null);
  const [axiosError, setAxiosError] = useState("");

  const baseUrl = "http://localhost:8080";
  const profileUrl = `${baseUrl}/clients`;

  useEffect(() => {
    // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
    axios
      .get(profileUrl, {
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
  }, []);

  // --------------------trying to sort--------------------

  const [allWarehouses, setAllWarehouses] = useState([]);
  // state to conditionally open the modal
  const [isOpen, setIsOpen] = useState(false);
  // state to reload component after delete
  const [reload, setReload] = useState(1);
  const [sorted, setSorted] = useState(false);

  function upOrDown() {
    setSorted((current) => !current);
  }

  function handleSortWarehouse() {
    upOrDown();
    if (sorted) {
      const sortedByName = allWarehouses.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setAllWarehouses(sortedByName);
    }

    if (!sorted) {
      const sortedByName = allWarehouses.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      setAllWarehouses(sortedByName);
    }
  }

  function handleSortAddress() {
    const sortedByName = allWarehouses.sort((a, b) => {
      if (a.address < b.address) {
        return -1;
      }
      if (a.address > b.address) {
        return 1;
      }
      return 0;
    });

    setAllWarehouses(sortedByName);
    setSorted(sorted + 1);
  }

  function handleSortContactName() {
    const sortedByName = allWarehouses.sort((a, b) => {
      if (a.contact.name < b.contact.name) {
        return -1;
      }
      if (a.contact.name > b.contact.name) {
        return 1;
      }
      return 0;
    });

    setAllWarehouses(sortedByName);
    setSorted(sorted + 1);
  }

  function handleSortContactPhone() {
    const sortedByName = allWarehouses.sort((a, b) => {
      if (a.contact.email < b.contact.email) {
        return -1;
      }
      if (a.contact.email > b.contact.email) {
        return 1;
      }
      return 0;
    });
    setAllWarehouses(sortedByName);
    setSorted(sorted + 1);
  }
  // -------end sorting---------------------
  //if the data isnt here yet
  if (!clientInfo) {
    return <h1>Loading Data</h1>;
  }
  //if http request fails show the error message
  if (!clientInfo && axiosError) {
    return <p>{axiosError}</p>;
  }

  return (
    
    <div className="warehouse">
      <header className="warehouse__header">
        <h1 className="warehouse__title">Clients</h1>
        <div className="warehouse__header-formbtn">
          <form className="warehouse__form" action="">
            <input
              type="text"
              placeholder="Search..."
              className="warehouse__header-input"
            />
          </form>

          <Link to="/warehouses/add-new" className="warehouse__link">
            <button className="warehouse__header-button inventory-form__button--before">
              + Add New Client
            </button>
          </Link>
        </div>
      </header>
      <div className="warehouse__subheaders">
        <div className="warehouse__subheader  warehouse__name">
          <h4 className="warehouse__subheader-text">
            CLIENT{" "}
            <img
              onClick={handleSortWarehouse}
              className="warehouse__subheader-arrows"
              src={sortArrows}
              alt="sorting arrows"
            />
          </h4>
        </div>
        <div className="warehouse__subheader warehouse__address">
          <h4 className="warehouse__subheader-text">
            EMAIL{" "}
            <img
              onClick={handleSortAddress}
              className="warehouse__subheader-arrows"
              src={sortArrows}
              alt="sorting arrows"
            />
          </h4>
        </div>
        <div className="warehouse__subheader warehouse__contact-name">
          <h4 className="warehouse__subheader-text">
            PHONE NUMBER{" "}
            <img
              onClick={handleSortContactName}
              className="warehouse__subheader-arrows"
              src={sortArrows}
              alt="sorting arrows"
            />
          </h4>
        </div>
        <div className="warehouse__subheader warehouse__subheader--info warehouse__contact-info">
          <h4 className="warehouse__subheader-text">
            CITIZENSHIP{" "}
            <img
              onClick={handleSortContactPhone}
              className="warehouse__subheader-arrows"
              src={sortArrows}
              alt="sorting arrows"
            />
          </h4>
        </div>
        <div className="warehouse__subheader warehouse__subheader-icons warehouse__actions">
          <h4 className="warehouse__subheader-text warehouse__actions-tex">
            ACTIONS
          </h4>
        </div>
      </div>
      {clientInfo.map((client) => {
        return (
          <div key={client.id} className="warehouse__card">
            <div className="warehouse__card-item warehouse__card-item--warehouse">
              <h4 className="warehouse__card-title warehouse__card-title--name">
                Client
              </h4>
              <Link
                to={`/warehouses/warehouse/${client.id}`}
                className="warehouse__card-link warehouse__card-info"
              >
                {client.firstName} {client.lastName}
                {
                  <img
                    className="warehouse__card-arrow"
                    src={chevronRight}
                    alt="right arrow"
                  />
                }
              </Link>
            </div>

            <div className="warehouse__card-item warehouse__card-item--contact">
              <h4 className="warehouse__card-title">EMAIL</h4>
              <p className="warehouse__card-info">{client.phoneNumber}</p>
            </div>

            <div className="warehouse__card-item warehouse__card-item--address">
              <h4 className="warehouse__card-title ">Phone Number</h4>
              <p className="warehouse__card-info">{client.email}</p>
            </div>

            <div className="warehouse__card-item warehouse__card-item--info">
              <h4 className="warehouse__card-title">Citizenship</h4>
              <p className="warehouse__card-info">birth citizenship</p>
              <p className="warehouse__card-info">double citizenship?</p>
            </div>
            <div className="warehouse__card-icons warehouse__card-item--icons">
              <img
                className="warehouse__card-icon"
                src={deleteIcon}
                alt="delete button"
              />
              <Link to={`/warehouses/edit/${client.id}`}>
                <img
                  className="warehouse__card-icon"
                  src={editIcon}
                  alt="edit button"
                />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Clients;

// {client.email},{" "}
//             {client.phoneNumber} {client.educationLevel}
//             {client.englishTest}
//             {client.englishWriting}
//             {client.englishSpeaking}
//             {client.englishListening}
//             {client.englishReading}
//             {client.studyInCanada}
//             {client.provinceOfPreference}
//             {client.cityOfPreference}
