import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  getAccessToken = async () => {
    return await AsyncStorage.getItem(`${this.namespace}:token`);
  };

  setAccessToken = async (accessToken) => {
    await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
  };

  removeAccessToken = async () => {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  };
}

export default AuthStorage;
