import React from "react";

interface Props {
  page: boolean;
}

const ButtonGreen: React.FC<Props> = (props: Props) => {
  return (
    <button className="green-btn">{props.page ? "Sign in" : "Sign up"}</button>
  );
};

export default ButtonGreen;
