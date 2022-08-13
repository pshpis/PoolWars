import axios from "axios";
import {MINT_API_URL, UserStageInfo} from "./mint-instructions";

export async function submitWallet(wallet: string): Promise<void> {

    try {
        const response = await axios.post<void>(`${MINT_API_URL}/api/v1/submissions/submit=${wallet}`)
    }
    catch (e) {
    }
}