import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import Center from "../common/Center";
import BasicButton from "../common/BasicButton";
import Column from "../common/Column";
import OutlinedButton from "../common/OutlinedButton";
import Row from "../common/Row";
import { observer } from "mobx-react-lite";
import { useDI } from "../../../../di/DIContext";
import { Heading } from "../common/Heading";
import Input from "../common/Input";
import Icon from "react-native-vector-icons/MaterialIcons";
import Padding from "../common/Padding";
import Flex from "../common/Flex";

const RegisterForm = observer(() => {
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
          <Heading>Register</Heading>
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
            title="Register"
            onPress={() => {
              authViewModel.register();
            }}
          />
          <Row gap={12}>
            <Text>Already have an account?</Text>
            <OutlinedButton
              color="gray"
              borderColor="transparent"
              title="Login"
              onPress={() => {
                authViewModel.changeMode("login");
              }}
            />
          </Row>
        </Column>
      </Padding>
    </Flex>
  );
});

export default RegisterForm;
