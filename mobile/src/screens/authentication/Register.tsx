import React, { useState } from "react";
//import { API_URL, API_URLB } from "@env";
import {
  View,
  ScrollView,
  Stack,
  Box,
  Button,
  FormControl,
  Input,
  Divider,
  WarningOutlineIcon,
  Spinner,
  Alert,
  Text,
  VStack,
  HStack,
} from "native-base";

import {
  isValidUsername,
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../../utils/validate";

const Register = () => {
  // states for storing datas
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setsuccessMessage] = useState<string | null>(null);

  // states for storing error status
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [mobileError, setMobileError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [rePasswordError, setRePasswordError] = useState<boolean>(false);

  const handleUsernameChange = (username: string) => {
    setUsername(username);
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handleMobileChange = (mobile: string) => {
    setMobile(mobile);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const handleRePasswordChange = (rePassword: string) => {
    setRePassword(rePassword);
  };

  const handleSubmit = async () => {
    let errorMsg = "";

    try {
      if (!isValidUsername(username)) {
        setUsernameError(true);
        errorMsg += "Username is not correct.\n";
      } else setUsernameError(false);

      if (!isValidEmail(email)) {
        setEmailError(true);
        errorMsg += "Email is not correct.\n";
      } else setEmailError(false);

      if (!isValidPassword(password)) {
        setPasswordError(true);
        errorMsg +=
          "Password must be at least 8 characters long, and contain at least one digit, one lowercase letter, one uppercase letter, and one letter (any case).\n";
      } else setPasswordError(false);

      if (!isValidPassword(rePassword)) {
        setRePasswordError(true);
        errorMsg +=
          "RePassword must be at least 8 characters long, and contain at least one digit, one lowercase letter, one uppercase letter, and one letter (any case).\n";
      } else setRePasswordError(false);

      if (password !== rePassword) {
        setPasswordError(true);
        setRePasswordError(true);
        errorMsg += "Password and Repassword are not the same.\n";
      } else {
        setPasswordError(false);
        setRePasswordError(false);
      }

      if (mobile.length > 0 && !isValidPhone(mobile)) {
        setMobileError(true);
        errorMsg +=
          "Mobile is not correct. A right format sample is: 09111111111\n";
      } else setMobileError(false);

      if (errorMsg === "") {
        // Handling the submit event of the registration of the form
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          process.env.API_URL + "/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
              mobile: mobile,
            }),
          }
        );
        const data = await response.json();
        if (data.success) {
          setsuccessMessage(data.message);
        } else {
          setError(data.error);
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
      <ScrollView w="100%">
        <Stack
          space={2.5}
          alignSelf="center"
          px="4"
          safeArea
          mt="4"
          w={{
            base: "100%",
            md: "25%",
          }}
        >
          <Box>
            <FormControl mb="5">
              <FormControl.Label>Username</FormControl.Label>
              <Input
                placeholder="Enter a valid username"
                type="text"
                value={username}
                onChangeText={handleUsernameChange}
                onSubmitEditing={handleSubmit}
                color="coolGray.600"
              />
              <FormControl.HelperText>
                Please enter a valid username.
              </FormControl.HelperText>
              {usernameError === true && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  username is not valid.
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <Divider />
          </Box>
          <Box>
            <FormControl mb="5">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                type="text"
                placeholder="Enter a valid email"
                value={email}
                onChangeText={handleEmailChange}
                onSubmitEditing={handleSubmit}
                color="coolGray.600"
              />
              {emailError === true && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Email format is not valid.
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <Divider />
          </Box>
          <Box>
            <FormControl mb="5">
              <FormControl.Label>Mobile</FormControl.Label>
              <Input
                type="text"
                placeholder="Mobile number"
                value={mobile}
                onChangeText={handleMobileChange}
                onSubmitEditing={handleSubmit}
                color="coolGray.600"
              />
              <FormControl.HelperText>
                Standard format for mobile is: 09112345678
              </FormControl.HelperText>
              {mobileError === true && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Mobile number is not correct.
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <Divider />
          </Box>
          <Box>
            <FormControl mb="5">
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                placeholder="Enter a valid password"
                value={password}
                onChangeText={handlePasswordChange}
                onSubmitEditing={handleSubmit}
                color="coolGray.600"
              />
              <FormControl.HelperText>
                At least an upercase and one special carachter.
              </FormControl.HelperText>
              {passwordError === true && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Password is not correct.
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <Divider />
          </Box>
          <Box>
            <FormControl mb="5">
              <FormControl.Label>RePassword</FormControl.Label>
              <Input
                type="password"
                placeholder="Repeat your password"
                value={rePassword}
                onChangeText={handleRePasswordChange}
                onSubmitEditing={handleSubmit}
                color="coolGray.600"
              />
              <FormControl.HelperText>
                Please ReEnter your password.
              </FormControl.HelperText>
              {rePasswordError === true && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  RePassword is not correct.
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          </Box>
          <Box>
            {error && (
              <Alert mb="4" maxW="400" status="error">
                <VStack space={1} flexShrink={1} w="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <HStack flexShrink={1} space={2} alignItems="center">
                      <Alert.Icon />
                      <Text
                        fontSize="md"
                        fontWeight="medium"
                        _dark={{
                          color: "coolGray.800",
                        }}
                      >
                        Please try again later!
                      </Text>
                    </HStack>
                  </HStack>
                  <Box
                    pl="6"
                    _dark={{
                      _text: {
                        color: "coolGray.600",
                      },
                    }}
                  >
                    {error}
                  </Box>
                </VStack>
              </Alert>
            )}
            {!isLoading && (
              <Button mb="5" onPress={handleSubmit}>
                Register
              </Button>
            )}
            {isLoading && successMessage === null && (
              <Spinner accessibilityLabel="Loading, Please wait" />
            )}
            {successMessage && (
              <Alert w="100%" status="success" mb="4">
                <VStack space={1} flexShrink={1} w="100%" alignItems="center">
                  <Alert.Icon size="md" />
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    _dark={{
                      color: "coolGray.800",
                    }}
                  >
                    Congratulations!
                  </Text>

                  <Box
                    _text={{
                      textAlign: "center",
                    }}
                    _dark={{
                      _text: {
                        color: "coolGray.600",
                      },
                    }}
                  >
                    You have registered successfully, Now you can login into
                    your account.
                  </Box>
                </VStack>
              </Alert>
            )}
          </Box>
        </Stack>
      </ScrollView>
    </View>
  );
};

export default Register;
