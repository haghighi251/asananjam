import { Text, View, Heading, Button } from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionLogout, user } from "../../services/redux/reducers/userReducer";
import { AppDispatch } from "../../services/redux/actions/store";
import { Iuser } from "../../utils/types";
import Register from "../authentication/Register";
import Login from "../authentication/Login";

const ProfileIndexScreen = ({ navigation }: any) => {
  const currentUser: Iuser = useSelector(user);
  const dispatch: AppDispatch = useDispatch();
  const handleRegisterPress = () => {
    navigation.navigate("ثبت نام");
  };
  return (
    <View>
      <Text>ProfileIndexScreen</Text>
      {currentUser.isLoggedIn === true && (
        <>
          <Heading color="primary.600">Hi {currentUser.user.username}</Heading>
          <Button
            mt="4"
            onPress={() => dispatch(actionLogout())}>
            Logout
          </Button>
        </>
      )}
      {currentUser.isLoggedIn === false && (
        <Button
          mt="4"
          onPress={() => navigation.navigate("ورود")}>
          ورود
        </Button>
      )}
      <Button
        mt="4"
        onPress={handleRegisterPress}>
        ثبت نام
      </Button>
    </View>
  );
};

export default ProfileIndexScreen;
