import axios from 'axios';
import {API_BASE_URL} from "../constants";

type RegistrationSuccessResponse = {
    token: string;
};
type LoginSuccessResponse = RegistrationSuccessResponse;

type RegistrationErrorResponse = {
    statusCode: number;
    message: string;
};

type RegistrationResponse = RegistrationSuccessResponse | RegistrationErrorResponse;


export const registration = async (username: string): Promise<RegistrationResponse> => {
    try {
        const response = await axios.post<RegistrationResponse>(`${API_BASE_URL}/auth/registration`, {
            username
        });
        return  response.data;
    } catch (error: any) {
        console.error("Error registering user:", error.response.data);
        return  error.response.data;
    }
}

export const login = async (username: string) => {
    try {
        const response = await axios.post<LoginSuccessResponse>(`${API_BASE_URL}/auth/login`,  { username },{
        });
        console.log("Login completed successfully.");
        return response.data.token;
    } catch (error: any) {
        console.error("Login failed:", error.response.data);
        throw error;
    }
}