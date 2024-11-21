import { google, sheets_v4 } from "googleapis";
import path from "path";
import {Client} from "./client-factoriy";

export const googleAuth = async () => {

    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, "../../google-keys.json"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return google.sheets({ version: "v4", auth });
};



export const writeClientsToSheet = async (sheetId: string, clients: Client[]) => {
    try {
        const sheets: sheets_v4.Sheets = await googleAuth();

        const rows = clients.map(client => [
            client.id,
            client.firstName,
            client.lastName,
            client.gender,
            client.address,
            client.city,
            client.phone,
            client.email,
        ]);

        rows.unshift([
            "ID",
            "First Name",
            "Last Name",
            "Gender",
            "Address",
            "City",
            "Phone",
            "Email",
        ]);



        await sheets.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: "Sheet1!A1",
            valueInputOption: "RAW",
            requestBody: {
                values: rows,
            },
        });

        console.log("Data successfully written to Google Sheets.");
    } catch (error: any) {
        console.error("Error writing to Google Sheets:", error.message);
        throw error;
    }
};

