import axios from "axios";
import {MINT_API_URL} from "./mint-instructions";

export async function getCards(walletAddress: string): Promise<void> {
    try {
        const response = await axios.post<void>(`${MINT_API_URL}/api/v1/mint/parseCards?wallet=${walletAddress}`);
    }
    catch (e){
        return;
    }

}
