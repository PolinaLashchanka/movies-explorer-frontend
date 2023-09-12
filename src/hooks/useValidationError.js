import { useState, useEffect } from "react";

export const useValidationError = (path) => {
  const hidden = `${path === "/signup" ? "hidden" : ""}`;
  const [formValid, setFormValid] = useState(false);
  const [errorNameValue, setErrorNameValue] = useState(
    `${path === "/signup" || path === "/profile" ? "" : "Это поле не может быть пустым"}`
  );
  const [errorEmailValue, setErrorEmailValue] = useState(
    `${path === "/profile" ? "" : "Это поле не может быть пустым"}`
  );
  const [errorPasswordValue, setErrorPasswordValue] = useState(
    `${path === "/profile" ? "" : "Это поле не может быть пустым"}`
  );




  const handleNameErrorMessage = async (e) => {
    const { value } = e.target;
    const reg = /[^a-zа-яё -]/gi;
    if (value === "") {
      setErrorNameValue("Это поле не может быть пустым");
    } else if (value.length < 2 || value.length > 30) {
      setErrorNameValue("Имя должно быть не менее 2 и не больше 30 символов");
    } else if (value.match(reg)) {
      setErrorNameValue(
        "Это поле может содержать только латиницу, кириллицу, пробелы и тире"
      );
    } else {
      setErrorNameValue("");
    }
    return errorNameValue;
  };

  function isDirty(setter) {
    setter(true);
  }

  const handleEmailErrorMessage = async (e) => {
    const { value } = e.target;
    const re =
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/i;
    if (value === "") {
      setErrorEmailValue("Это поле не может быть пустым");
    } else if (!re.test(String(value).toLocaleLowerCase())) {
      setErrorEmailValue("Вы ввели некорректный имейл");
    } else {
      setErrorEmailValue("");
    }
    return errorEmailValue;
  };

  const handlePasswordErrorMessage = async (e) => {
    const { value } = e.target;
    if (value === "") {
      setErrorPasswordValue("Это поле не может быть пустым");
    } else if (value.length < 5) {
      setErrorPasswordValue("Пароль должен быть не менее 5 символов");
    } else {
      setErrorPasswordValue("");
    }
    return errorPasswordValue;
  };

  useEffect(() => {
    if (errorNameValue || errorEmailValue || errorPasswordValue) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [errorNameValue, errorEmailValue, errorPasswordValue]);

  return {
    hidden,
    handleNameErrorMessage,
    handleEmailErrorMessage,
    handlePasswordErrorMessage,
    errorNameValue,
    errorEmailValue,
    errorPasswordValue,
    formValid,
    isDirty,
  };
};
