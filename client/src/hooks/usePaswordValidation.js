import { useState } from "react";


export default function usePasswordValidation () {
  const [typePassword, setTypePassword] = useState("password");
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordLetters, setPasswordLetters] = useState(false);

  function validatePassword(e) {
    const password = e.target.value;
    if (password.length > 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }

    const pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    if (pattern.test(password)) {
      setPasswordLetters(true);
    } else {
      setPasswordLetters(false);
    }
  }

  function changeType(type) {
    setTypePassword(type)
  }

  return {
    passwordLength,
    passwordLetters,
    typePassword,
    typePassword,
    changeType,
    validatePassword,
  }
}