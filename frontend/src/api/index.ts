import axios from "axios";
import { User } from "../types";

const BASE_URL : string | undefined = process.env.REACT_APP_API_KEY;

export const fetchUsers = async (params: {
  query?: string;
  email?: string;
  phoneNumber?: string;
}): Promise<User[]> => {
  try {
    if (!BASE_URL) {
      throw new Error("BASE_URL is not defined.");
    }

    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const fetchUserById = async (userId: string): Promise<User | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const createUser = async (
  userData: Partial<User>
): Promise<User | null> => {
  try {
    if (!BASE_URL) {
      throw new Error("BASE_URL is not defined.");
    }
    const response = await axios.post(BASE_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const updateUser = async (
  userId: string,
  userData: Partial<User>
): Promise<User | null> => {
  try {
    const response = await axios.put(`${BASE_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
