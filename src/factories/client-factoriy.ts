import axios from "axios";
import {API_BASE_URL} from "../constants";


export type Client = {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    address: string;
    city: string;
    phone: string;
    email: string;
};


export const fetchClients = async (
    token: string,
    limit: number = 10,
    offset: number = 0
): Promise<Client[]> => {
    try {
        const response = await axios.get<Client[]>(
            `${API_BASE_URL}/clients?limit=${limit}&offset=${offset}`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        console.log("Fetched clients successfully.");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching clients:", error.response?.data || error.message);
        throw error;
    }
};
