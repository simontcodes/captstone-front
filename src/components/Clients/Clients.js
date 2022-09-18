import "./Clients.scss";
import axios from "axios";
import { useEffect, useState} from "react";

function Clients() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

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
        setIsLoading(false);
        setUserInfo(response.data);
      });
    // Remember to include the token in Authorization header
  });
  return isLoading ? <h1>Loading...</h1> : <h1>{userInfo.message}</h1> ;
}

export default Clients;
