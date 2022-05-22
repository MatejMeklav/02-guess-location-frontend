import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function EmailConfirmed({}: Props) {
  const { token } = useParams();
  const navigate = useNavigate();
  const [responseMsg, setResponseMsg] = useState("ConfirmingEmail");

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_ACCESS_ID + "email-confirmation/confirm/" + token
      )
      .then((response) => {
        navigate("/signin");
      })
      .catch((error) => {
        setResponseMsg("Email already confirmed");
      });
  }, [responseMsg]);
  return <div>{responseMsg}</div>;
}
