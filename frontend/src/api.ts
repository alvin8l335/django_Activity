import axios from "axios";
import { Product } from "./types";

const API_URL = "http://127.0.0.1:8000/api/";

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}products/`);
    return response.data;
};

export const getCategories = async (): Promise<any[]> => {
    const response = await axios.get(`${API_URL}categories/`);
    return response.data;
};

export const createProduct = async (productData: any): Promise<Product> => {
    const response = await axios.post(`${API_URL}products/`, productData);
    return response.data;
};

export const updateProduct = async (id: number, productData: any): Promise<Product> => {
    const response = await axios.put(`${API_URL}products/${id}/`, productData);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}products/${id}/`);
};