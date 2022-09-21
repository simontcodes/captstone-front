import "./Clients.scss";
import axios from "axios";
import { useEffect, useState } from "react";

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
        setAxiosError(error)
      });
    // Remember to include the token in Authorization header
  }, []);
  //if the data isnt here yet
  if (!clientInfo) {
    return <h1>Loading Data</h1>;
  }
//if http request fails show the error message
  if (!clientInfo && axiosError) {
    return <p>{axiosError}</p>;
  }

  return (
    <>
      {clientInfo.map((client) => {
        return (
          <p key={client.id}>
            {client.firstName}, {client.lastName}, {client.email},{" "}
            {client.phoneNumber}{" "}
          </p>
        );
      })}
    </>
  );
}

export default Clients;
