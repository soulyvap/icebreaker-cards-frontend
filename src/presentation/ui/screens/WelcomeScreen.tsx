import { Text } from "react-native";
import React from "react";
import Column from "../components/common/Column";
import BasicButton from "../components/common/BasicButton";
import Center from "../components/common/Center";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Flex from "../components/common/Flex";
import Padding from "../components/common/Padding";
import { Heading } from "../components/common/Heading";
import Icon from "react-native-vector-icons/MaterialIcons";
import Card from "../components/common/Card";
import { RootStackParamList } from "../../navigation/types";

type WelcomeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

/**
 * The welcome screen of the application.
 * Contains the logo, title, subtitle and get started button.
 */
const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProps>();
  return (
    <Padding padding={48}>
      <Column height="100%" width="100%" align="center" justify="flex-end">
        <Flex flex={0.5} />
        <Center fullScreen>
          <Card borderRadius={200}>
            <Icon name="style" size={240} color="black" />
          </Card>
        </Center>
        <Flex flex={0.5}>
          <Column
            align="center"
            justify="center"
            height="100%"
            width="100%"
            gap={16}
          >
            <Heading>IceBreaker Cards</Heading>
            <Text>Break the Ice, One Card at a Time</Text>
          </Column>
        </Flex>
        <BasicButton
          title="Get started"
          onPress={() => {
            navigation.replace("Auth");
          }}
        />
      </Column>
    </Padding>
  );
};

export default WelcomeScreen;
