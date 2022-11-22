import "./Clients.scss";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import sortArrows from "../../assets/icons/sort-24px.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Clients() {
  const [clientInfo, setClientInfo] = useState(null);
  const [axiosError, setAxiosError] = useState("");
  // state to reload component after delete
  const [reload, setReload] = useState(1);

  const baseUrl = "http://localhost:8080";
  const profileUrl = `${baseUrl}/clients`;

  // react hook form useForm
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  function handleKeyPress() {
    const filteredClient = clientInfo.filter((client) =>
      client.firstName.startsWith(`${watch("searchBar")}`)
    );
    console.log(filteredClient);
    if (filteredClient.length) {
      setClientInfo(filteredClient);
    }
    if (!watch("searchBar")) {
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
    }
  }

  function handleSubmitSearch(event) {
    event.preventDefault();
  }

  useEffect(() => {
    // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.

    axios
      .get(profileUrl, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
          email: localStorage.getItem("email"),
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
  // state to conditionally open the modal
  const [isOpen, setIsOpen] = useState(false);

  const [sorted, setSorted] = useState(false);

  function upOrDown() {
    setSorted((current) => !current);
  }

  function handleSortName() {
    upOrDown();
    if (sorted) {
      const sortedByName = clientInfo.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
      setClientInfo(sortedByName);
    }

    if (!sorted) {
      const sortedByName = clientInfo.sort((a, b) => {
        if (a.firstName > b.firstName) {
          return -1;
        }
        if (a.firstName < b.firstName) {
          return 1;
        }
        return 0;
      });
      setClientInfo(sortedByName);
    }
  }

  function handleSortEmail() {
    upOrDown();
    if (sorted) {
      const sortedByEmail = clientInfo.sort((a, b) => {
        if (a.email < b.email) {
          return -1;
        }
        if (a.email > b.email) {
          return 1;
        }
        return 0;
      });
      setClientInfo(sortedByEmail);
    }

    if (!sorted) {
      const sortedByEmail = clientInfo.sort((a, b) => {
        if (a.email > b.email) {
          return -1;
        }
        if (a.email < b.email) {
          return 1;
        }
        return 0;
      });
      setClientInfo(sortedByEmail);
    }
  }

  function handleSortPhoneNumber() {
    upOrDown();
    if (sorted) {
      const sortedByPhoneNumber = clientInfo.sort((a, b) => {
        if (a.phoneNumber < b.phoneNumber) {
          return -1;
        }
        if (a.phoneNumber > b.phoneNumber) {
          return 1;
        }
        return 0;
      });
      setClientInfo(sortedByPhoneNumber);
    }

    if (!sorted) {
      const sortedByPhoneNumber = clientInfo.sort((a, b) => {
        if (a.phoneNumber > b.phoneNumber) {
          return -1;
        }
        if (a.phoneNumber < b.phoneNumber) {
          return 1;
        }
        return 0;
      });
      setClientInfo(sortedByPhoneNumber);
    }
  }

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
          <form
            className="warehouse__form"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input
              onKeyDownCapture={handleKeyPress}
              name="searchBar"
              type="text"
              placeholder="Search..."
              className="warehouse__header-input"
              {...register("searchBar")}
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
              onClick={handleSortName}
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
              onClick={handleSortEmail}
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
              onClick={handleSortPhoneNumber}
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
              // onClick={handleSortContactPhone}
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
                to={`/clients/client/${client.id}`}
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
