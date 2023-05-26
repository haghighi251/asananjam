import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";

import {
  View,
  Box,
  Button,
  FormControl,
  Input,
  Spinner,
  Alert,
  Text,
  VStack,
  HStack,
  Center,
  Heading,
  Link,
} from "native-base";
import { user, actionLogin } from "../../services/redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Iuser } from "../../utils/types";
import { AppDispatch } from "../../services/redux/actions/store";

type HomeScreenRouteProp = RouteProp<any, "Login">;

type Props = {
  navigation: any;
  route: HomeScreenRouteProp;
};

const Login = ({ navigation }: Props) => {
  // states for storing datas
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Loading redux store settings
  const ditpatch: AppDispatch = useDispatch();
  const currentUser: Iuser = useSelector(user);
  if (currentUser.isLoggedIn !== false) navigation.navigate("Home");

  // We have to change the current screen to home screen after rendering the component,
  // Otherwise we will get a warning, Because when the current component's state is changing(currentUser after success login),
  // React would try to change the screen at the same time and you would see that warning!
  useEffect(() => {
    navigation.navigate("Home");
  }, [currentUser]);

  const handleSubmit = async () => {
    let errorMsg = "";

    try {
      if (
        username === undefined ||
        username === null ||
        password === undefined ||
        password === null
      )
        errorMsg += "Username or password is not correct.\n";

      if (errorMsg === "") {
        // Handling the submit event of the registration of the form
        setIsLoading(true);
        setError(null);
        const response = await fetch(process.env.API_URL + "/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        const res = await response.json();
        if (res.success) {
          ditpatch(
            actionLogin({
              user: {
                user_id: res.data.user_id,
                username: res.data.username,
              },
              isLoggedIn: true,
            })
          );
        } else {
          setError(res.error);
          setIsLoading(false);
        }
      } else {
        setError(errorMsg);
        setIsLoading(false);
      }
    } catch (e) {
      setError("We got an error. Please try a few seconds later.");
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Center w="100%">
        <Box
          safeArea
          p="2"
          py="8"
          w="90%"
          maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.600",
            }}>
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="warmGray.600"
            fontWeight="medium"
            size="xs">
            Sign in to continue!
          </Heading>

          <VStack
            space={3}
            mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input
                type="text"
                value={username}
                onChangeText={(textValue) => setUsername(textValue)}
                color="warmGray.700"
                fontSize="lg"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={password}
                onChangeText={(textValue) => setPassword(textValue)}
                color="warmGray.700"
                fontSize="lg"
              />
              <Link
                _text={{
                  fontSize: "sm",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                href={`${process.env.API_URL}/user/recovery-password`}
                mt="1">
                Forget Password?
              </Link>
            </FormControl>
            {error && (
              <Alert
                mb="4"
                maxW="400"
                status="error">
                <VStack
                  space={1}
                  flexShrink={1}
                  w="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center">
                      <Alert.Icon />
                      <Text
                        fontSize="md"
                        fontWeight="medium"
                        _dark={{
                          color: "coolGray.800",
                        }}>
                        Please try again!
                      </Text>
                    </HStack>
                  </HStack>
                  <Box
                    pl="6"
                    _dark={{
                      _text: {
                        color: "coolGray.600",
                      },
                    }}>
                    {error}
                  </Box>
                </VStack>
              </Alert>
            )}
            {!isLoading && (
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={handleSubmit}>
                Sign in
              </Button>
            )}
            {isLoading && (
              <Spinner
                mt="2"
                size="lg"
                accessibilityLabel="Loading, Please wait"
              />
            )}
            <HStack
              mt="6"
              justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}>
                I'm a new user.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => {
                  navigation.navigate("Register");
                }}>
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </View>
  );
};

export default Login;
