import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useDI } from "../../../di/DIContext";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

/**
 * The screen for the authentication flow.
 * Contains the login and register forms.
 */
const AuthScreen = observer(() => {
  const { authViewModel, gameViewModel } = useDI();
  const mode = authViewModel.mode;

  useEffect(() => {
    gameViewModel.setNeedsReload(true);
  }, []);

  switch (mode) {
    case "login":
      return <LoginForm />;
    case "register":
      return <RegisterForm />;
  }
});

export default AuthScreen;
