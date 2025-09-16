import "react-native-gesture-handler";
import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import MapScreen from "./screens/MapScreen"; 
import RegistrationScreen from "./screens/RegistrationScreen";
import EmergencyScreen from "./screens/EmergencyScreen"; 

// ---- Auth Context (to call signIn / signOut anywhere)
type AuthContextType = {
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string) => Promise<void>;
  userEmail: string | null;
};
export const AuthContext = React.createContext<AuthContextType | null>(null);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2E86C1",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Explore") iconName = "compass-outline";
          else if (route.name === "Emergency") iconName = "alert-circle-outline"; 
          else if (route.name === "Profile") iconName = "person-circle-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Emergency" component={EmergencyScreen} /> 
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}

function Splash() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState<string | null>(null);
  const [userEmail, setUserEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        const email = await AsyncStorage.getItem("auth_email");
        if (token) setUserToken(token);
        if (email) setUserEmail(email);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const auth: AuthContextType = {
    signIn: async (email: string) => {
      await AsyncStorage.setItem("auth_token", "demo-token");
      await AsyncStorage.setItem("auth_email", email);
      setUserEmail(email);
      setUserToken("demo-token");
    },
    signUp: async (email: string) => {
      await AsyncStorage.setItem("auth_token", "demo-token");
      await AsyncStorage.setItem("auth_email", email);
      setUserEmail(email);
      setUserToken("demo-token");
    },
    signOut: async () => {
      await AsyncStorage.removeItem("auth_token");
      await AsyncStorage.removeItem("auth_email");
      setUserEmail(null);
      setUserToken(null);
    },
    userEmail,
  };

  if (isLoading) return <Splash />;

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        {userToken ? <MainTabs /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
