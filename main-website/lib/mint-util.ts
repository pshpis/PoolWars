import { Connection } from "@solana/web3.js";
import axios from "axios";

export async function waitForConfirmation(connection: Connection, signature: string, timeout: number): Promise<boolean> {

    let confirmed = false

    const id = connection.onSignature(signature, (a, b) => {

        if (!a.err) {
            confirmed = true;
        }

    }, 'finalized');

    for (let i = 0; i < timeout && !confirmed; i++) {
        await delay(1000);
    }

    await connection.removeSignatureListener(id);

    if (confirmed) {
        return true;
    }

    const transaction = await connection.getTransaction(signature, {
        commitment: 'confirmed'
    });

    return !!transaction && !!transaction.transaction;
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function confirmMint(wallet: string) {

    try {
        await axios.post(`https://elderkatts.com/api/v1/mint/confirm?wallet=${wallet}`)
    }
    catch (e) {
        //
    }
}