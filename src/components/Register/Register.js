import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import { useState } from "react";

function Register({ onHandleRegister, serverError, setServerError }) {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e, func) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    func(e);
  };

  const { name, email, password } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    onHandleRegister(name, email, password);
  };

  return (
    <section className="authorization register">
      <AuthorizationForm
        header={"Добро пожаловать!"}
        buttonName={"Зарегистироваться"}
        formText={"Уже зарегистированы?"}
        path={"/signin"}
        linkText={"Войти"}
        handleChange={handleChange}
        name={name}
        email={email}
        password={password}
        handleSubmit={handleSubmit}
        serverError={serverError}
        setServerError={setServerError}
      />
    </section>
  );
}

export default Register;
