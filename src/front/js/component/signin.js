import React, { useRef, useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Signin = () => {
  const history = useHistory();
  const { actions } = useContext(Context);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrorMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, pwd);
      let response = await actions.login(email, pwd);
      console.log(response);
      setEmail("");
      setPwd("");
      history.push(`/welcome/`);
    } catch (e) {
      if (e.message === "401") {
        alert("usuario y o contraseña no coinciden");
      }
      console.error(e);
    }
  };
  return (
    <>
      <section className="form1 mt-5">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            className="inp"
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className="inp"
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button type="submit">Log in</button>
        </form>
      </section>
    </>
  );
};
