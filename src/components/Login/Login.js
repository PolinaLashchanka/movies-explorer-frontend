import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import { useState } from "react";

function Login({onHandleLogin, serverError, setServerError}) {

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, func) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    func(e);
};

  const { email, password } = formValue;


  const handleSubmit = (e) => {
    e.preventDefault();
    onHandleLogin(email, password);
  };

  return (
    <section className="authorization login">
      <AuthorizationForm
        header={"Рады видеть!"}
        buttonName={"Войти"}
        formText={"Еще не зарегистированы?"}
        path={"/signup"}
        linkText={"Регистрация"}
        handleChange={handleChange}
        email={email}
        password={password}
        handleSubmit={handleSubmit}
        serverError={serverError}
        setServerError={setServerError}
      />
    </section>
  );
}

export default Login;
