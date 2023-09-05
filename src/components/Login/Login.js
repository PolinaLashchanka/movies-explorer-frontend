import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import { useState } from "react";

function Login() {

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
      />
    </section>
  );
}

export default Login;
