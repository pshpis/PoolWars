import { Transaction } from "@solana/web3.js";
import axios from "axios";

const URL_PREFIX = 'https://eldercatts.com';

export async function getSwapAuthoritySignature(tx: Transaction): Promise<Buffer | undefined> {

    try {

        const message = tx.serializeMessage()
        const messageEncoded = message.toString('base64');

        const response = await axios.post<string>(`${URL_PREFIX}/api/v1/metadata/signSwap`, {
            message: messageEncoded
        })

        return Buffer.from(response.data, 'base64');
    }
    catch (e) {
        console.log(e);
        return;
    }
}