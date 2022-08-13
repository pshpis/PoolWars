import axios from "axios";
import {MINT_API_URL} from "./mint-instructions";

export async function submitWallet(wallet: string): Promise<boolean> {
    try {
        await axios.post<void>(`${MINT_API_URL}/api/v1/submissions/submit?wallet=${wallet}`)
        return true;
    }
    catch (e) {
        return false;
    }
}

export async function getWalletStatus(wallet: string) : Promise<boolean> {
    try {
        const submitStatus = await axios.get<boolean>(`${MINT_API_URL}/api/v1/submissions/status?wallet=${wallet}`)
        return submitStatus.data;
    }
    catch (e) {
        return;
    }
}