import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomTheme } from "./src/theme/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";

import HomeScreen from "./src/screens/HomeScreen";
import Register from "./src/screens/authentication/Register";
import Login from "./src/screens/authentication/Login";
import { Provider } from "react-redux";
import store, { persistor } from "./src/services/redux/actions/store";
import { PersistGate } from "redux-persist/integration/react";
import ProfileIndexScreen from "./src/screens/profile/ProfileIndexScreen";
import StoreIndexScreen from "./src/screens/store/StoreIndexScreen";

const Tab = createBottomTabNavigator();

const SettingsStack = createNativeStackNavigator();

function ProfilesStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="حساب کاربری"
        component={ProfileIndexScreen}
      />
      <SettingsStack.Screen
        name="ورود"
        component={Login}
      />
      <SettingsStack.Screen
        name="ثبت نام"
        component={Register}
      />
    </SettingsStack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <NavigationContainer>
          <NativeBaseProvider theme={CustomTheme}>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
              <Tab.Screen
                name="شروع"
                component={HomeScreen}
                options={{
                  tabBarIcon: (props) => (
                    <Icon
                      name="home"
                      size={30}
                      color={props.color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Store"
                component={StoreIndexScreen}
                options={{
                  tabBarIcon: (props) => (
                    <FontAwesomeIcon
                      name="store"
                      size={25}
                      color={props.color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="کاربری"
                component={ProfilesStackScreen}
                options={{
                  tabBarIcon: (props) => (
                    <Icon
                      name="user"
                      size={30}
                      color={props.color}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          </NativeBaseProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
