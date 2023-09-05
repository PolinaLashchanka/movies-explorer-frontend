import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import { useState } from "react";

function Register() {
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

  return (
    <main className="authorization register">
      <section>
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
        />
      </section>
    </main>
  );
}

export default Register;
