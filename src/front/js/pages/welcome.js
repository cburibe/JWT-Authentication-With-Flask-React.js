import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Welcome = () => {
  const { actions } = useContext(Context);
  let history = useHistory();

  const handleOut = (e) => {
    e.preventDefault();
    actions.logout();
    history.push("/");
  };

  return (
    <div className="text-center mt-5">
      <h1>Bienvenido, te has logeado</h1>

      <button type="button" className="btn btn-danger" onClick={handleOut}>
        Salir
      </button>
    </div>
  );
};
