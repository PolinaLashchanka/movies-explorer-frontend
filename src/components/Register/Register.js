import "./Register.css";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";

function Register() {
  return (
    <main className="authorization">
      <AuthorizationForm
        header={"Добро пожаловать!"}
        buttonName={"Зарегистироваться"}
        formText={"Уже зарегистированы?"}
        path={"/signin"}
        linkText={"Войти"}
      />
    </main>
  );
}

export default Register;
