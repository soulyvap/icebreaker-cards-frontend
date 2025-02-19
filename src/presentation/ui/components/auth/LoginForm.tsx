import { observer } from "mobx-react-lite";
import Center from "../common/Center";
import Column from "../common/Column";
import { Button, Text, TextInput, TouchableOpacity } from "react-native";
import Row from "../common/Row";
import OutlinedButton from "../common/OutlinedButton";
import { useDI } from "../../../../di/DIContext";
import BasicButton from "../common/BasicButton";
import { Heading } from "../common/Heading";
import Input from "../common/Input";
import Padding from "../common/Padding";
import Flex from "../common/Flex";
import Icon from "react-native-vector-icons/MaterialIcons";

/**
 * The login form for the authentication flow.
 * Contains the email and password fields.
 */
const LoginForm = observer(() => {
  const { authViewModel } = useDI();

  return (
    <Flex>
      <Padding paddingHorizontal={24}>
        <Column
          align="center"
          justify="center"
          gap={12}
          width="100%"
          height="100%"
        >
          <Heading>Login</Heading>
          <Input
            value={authViewModel.email}
            placeholder="email"
            onChangeText={authViewModel.changeEmail}
            leading={<Icon name="mail" size={30} />}
            showValidation={authViewModel.showEmailValidation}
            errorMessage={authViewModel.emailError}
          />
          <Input
            value={authViewModel.password}
            placeholder="password"
            onChangeText={authViewModel.changePassword}
            leading={<Icon name="lock" size={30} />}
            secureTextEntry={!authViewModel.showPassword}
            showValidation={authViewModel.showPasswordValidation}
            errorMessage={authViewModel.passwordError}
            trailing={
              <TouchableOpacity onPress={authViewModel.toggleShowPassword}>
                <Icon
                  name={
                    authViewModel.showPassword ? "visibility-off" : "visibility"
                  }
                  size={30}
                />
              </TouchableOpacity>
            }
          />
          <BasicButton
            title="Login"
            onPress={() => {
              authViewModel.login();
            }}
          />
          <Row gap={12}>
            <Text>Don't have an account?</Text>
            <OutlinedButton
              color="gray"
              borderColor="transparent"
              title="Register"
              onPress={() => {
                authViewModel.changeMode("register");
              }}
            />
          </Row>
        </Column>
      </Padding>
    </Flex>
  );
});

export default LoginForm;
