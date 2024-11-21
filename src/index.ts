import {login, registration} from "./factories/auth-factoriy";
import {fetchClients} from "./factories/client-factoriy";
import {writeClientsToSheet} from "./factories/google-factoriy";
import {GOOGLE_SHEETS_ID} from "./constants";

export const start = async (name: string) => {

    let token: string;

    try {

        const registrationData = await registration(name);

        if ("token" in registrationData) {

            token = registrationData.token;

            console.log("Registration Token:", token);
        } else if (registrationData.statusCode  === 400) {

            token = await login(name);

            console.log("Login Token:", token);
        } else {
            throw new Error("Unexpected registration response");
        }

        console.log("Final Token:", token);
    } catch (error: any) {
        console.error("Error", error.response?.data || error.message);
        throw error;
    }

    const clients = await fetchClients(token,1000);

    await writeClientsToSheet(GOOGLE_SHEETS_ID, clients);

};

// https://docs.google.com/spreadsheets/d/12FyaSygasrEEYPbrEcnL5jQzpv34bQNIH3l0qIVc-LY/edit?usp=sharing
start("testUser0199")
