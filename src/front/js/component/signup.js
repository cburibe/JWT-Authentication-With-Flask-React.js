import React, { useContext, useState, Fragment } from "react";
import { Context } from "../store/appContext";

export const Signup = () => {
  const { actions } = useContext(Context);

  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const send = (event) => {
    event.preventDefault();
    actions.register(datos.email, datos.password);
    console.log("enviando datos..." + datos.email + " " + datos.password);
  };
  return (
    <Fragment>
      <form onSubmit={send}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="email"
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Fragment>
  );
};
