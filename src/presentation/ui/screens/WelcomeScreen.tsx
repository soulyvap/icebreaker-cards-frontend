import { Text } from "react-native";
import React from "react";
import Column from "../components/common/Column";
import BasicButton from "../components/common/BasicButton";
import Center from "../components/common/Center";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import Flex from "../components/common/Flex";
import Padding from "../components/common/Padding";
import styled from "styled-components/native";
import { Heading } from "../components/common/Heading";
import Icon from "react-native-vector-icons/MaterialIcons";
import Card from "../components/common/Card";

type WelcomeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Welcome"
>;
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
