import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";

function Login() {
  return (
    <main className="authorization">
      <AuthorizationForm
        header={"Рады видеть!"}
        buttonName={"Войти"}
        formText={"Еще не зарегистированы?"}
        path={"/signup"}
        linkText={"Регистрация"}
      />
    </main>
  );
}

export default Login;
