import {
  Text,
  View,
  Heading,
  StatusBar,
  Center,
  Box,
  Menu,
  Pressable,
  HamburgerIcon,
  Button,
} from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { actionLogout, user } from "../services/redux/reducers/userReducer";
import { AppDispatch } from "../services/redux/actions/store";
import { Iuser } from "../utils/types";

const HomeScreen = ({ navigation }: any) => {
  const currentUser: Iuser = useSelector(user);
  const dispatch: AppDispatch = useDispatch();
  return (
    <SafeAreaView>
      <View>
        <Heading>
          <Box
            w="90%"
            alignItems="center">
            <Menu
              w="190"
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}>
                    <HamburgerIcon />
                  </Pressable>
                );
              }}>
              <Menu.Item>Arial</Menu.Item>
              <Menu.Item>Nunito Sans</Menu.Item>
              <Menu.Item>Roboto</Menu.Item>
              <Menu.Item>Poppins</Menu.Item>
              <Menu.Item>SF Pro</Menu.Item>
              <Menu.Item>Helvetica</Menu.Item>
              <Menu.Item isDisabled>Sofia</Menu.Item>
              <Menu.Item>Cookie</Menu.Item>
            </Menu>
          </Box>
        </Heading>
        <Text
          pt="3"
          color="green.300">
          NativeBase is a simple, modular and accessible component library that
          gives you building blocks to build you React applications.
        </Text>

        <Center
          flex={1}
          px="3">
          <StatusBar />
        </Center>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
