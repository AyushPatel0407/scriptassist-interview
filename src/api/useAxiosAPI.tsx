import { useCallback } from "react";
import axios, { AxiosResponse } from "axios";

// Define the types for your data
interface Params {
    [key: string]: string | number | boolean;
}

// Define a type for headers
type HeadersType = Record<string, string>;

const BASE_URL = import.meta.env.VITE_API_KEY;

const useAxiosAPI = () => {
    // Define your common headers with types
    const COMMON_HEADERS: HeadersType = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    };

    const FORM_DATA_HEADERS: HeadersType = {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    };

    const getData = useCallback(async (url: string, id: string | string[] | null = null, params?: Params) => {
        try {
            // Construct the base URL
            console.log("Creating, url: " , url, params,id)
            let fullUrl = `${BASE_URL}${url}`;
            const headers: HeadersType = COMMON_HEADERS;

            // Check if id is provided
            if (id) {
                if (Array.isArray(id)) {
                    // Join array elements into a single string separated by slashes
                    fullUrl = `${fullUrl}/${id.join("/")}`;
                } else {
                    // Use id directly if it's a string
                    fullUrl = `${fullUrl}/${id}`;
                }
            }

            // Append the params object as a query string if provided
            if (params) {
                const queryString = new URLSearchParams(params as unknown as URLSearchParams).toString();
                fullUrl = `${fullUrl}?${queryString}`;
            }

            // Make the GET request with the full URL
            const response: AxiosResponse<any> = await axios.get(fullUrl);

            // Return the response data
            return response.data;
        } catch (error) {
            console.error("Error with GET request:", error);
            throw error;
        }
    }, []);

    // Define your postData function with types
    const postData = useCallback(async (url: string, data: any = {}) => {
        const isFormData = data instanceof FormData;
        const headers: HeadersType = isFormData ? FORM_DATA_HEADERS : COMMON_HEADERS;

        try {
            const response: AxiosResponse<any> = await axios.post(`${BASE_URL}${url}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error("Error with POST request:", error);
            throw error;
        }
    }, []);

    // Define your putData function with types
    const putData = useCallback(async (url: string, id: string | null = null, data: any = {}) => {
        const isFormData = data instanceof FormData;
        const headers: HeadersType = isFormData ? FORM_DATA_HEADERS : COMMON_HEADERS;

        try {
            const finalUrl = id ? `${BASE_URL}${url}/${id}` : `${BASE_URL}${url}`;

            const response: AxiosResponse<any> = await axios.put(finalUrl, data, { headers });
            return response.data;
        } catch (error) {
            console.error("Error with PUT request:", error);
            throw error;
        }
    }, []);

    // Define your deleteData function with types
    const deleteData = useCallback(async (url: string, id: string = "") => {
        try {
            const fullUrl = id ? `${BASE_URL}${url}/${id}` : `${BASE_URL}${url}`;
            const response: AxiosResponse<any> = await axios.delete(fullUrl, { headers: COMMON_HEADERS });
            return response.data;
        } catch (error) {
            console.error("Error with DELETE request:", error);
            throw error;
        }
    }, []);

    return { getData, postData, putData, deleteData };
};

export default useAxiosAPI;
