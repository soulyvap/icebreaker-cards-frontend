import React from "react";
import { observer } from "mobx-react-lite";
import { useDI } from "../../../di/DIContext";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const AuthScreen = observer(() => {
  const { authViewModel } = useDI();
  const mode = authViewModel.mode;

  switch (mode) {
    case "login":
      return <LoginForm />;
    case "register":
      return <RegisterForm />;
  }
});

export default AuthScreen;
