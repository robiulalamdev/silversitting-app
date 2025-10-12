import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_NAME = "silversitting";
export const BASE_URL = "https://silversitting.eu";
// export const BASE_URL = "http://192.168.0.157:8443";

/**
 * Save data to AsyncStorage
 * @param {string} key - The key under which the data is saved.
 * @param {any} data - The data to save.
 */
export const SAVE_TO_STORAGE = async (key = "", data: any) => {
  try {
    await AsyncStorage.setItem(key, data);
    console.log(`Data saved successfully under key: ${key}`);
  } catch (error) {
    console.error(`Error saving data under key: ${key}`, error);
  }
};

/**
 * Retrieve data from AsyncStorage
 * @param {string} key - The key under which the data is saved.
 * @returns {Promise<any>} - The retrieved data or null if not found.
 */
export const GET_FROM_STORAGE = async (key: string = "") => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error retrieving data for key: ${key}`, error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param {string} key - The key to remove.
 */
export const REMOVE_FROM_STORAGE = async (key: string = "") => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data removed successfully for key: ${key}`);
  } catch (error) {
    console.error(`Error removing data for key: ${key}`, error);
  }
};

export const USER_CONFIG = {
  TOKEN_NAME: TOKEN_NAME,
  SAVE_TO_STORAGE: SAVE_TO_STORAGE,
  GET_FROM_STORAGE: GET_FROM_STORAGE,
  REMOVE_FROM_STORAGE: REMOVE_FROM_STORAGE,
};
