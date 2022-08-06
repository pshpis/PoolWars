import { PublicKey, Transaction } from "@solana/web3.js"
import axios from "axios"

const POOL_WARS_API = 'https://elderkatts.com'

export type PoolType = 'attack' | 'defence'
export type PoolWar = {
    description: string | undefined,
    end: string,
    pools: Pool[]
}

export type Pool = {
    address: string
}

export type PoolState = Pool & {
    totalStrength: number,
    userStrength: number
}

export async function getPoolWar(): Promise<PoolWar | undefined> {

    try {

        const poolWars = await axios.get<PoolWar[]>(`${POOL_WARS_API}/api/v1/wars/getActual`)

        if (poolWars.data.length == 0) {
            return;
        }

        return poolWars.data[0];
    }
    catch (e) {
        return;
    }

}

export async function getPoolStatus(pool: string, user: PublicKey | undefined): Promise<PoolState | undefined> {

    try {

        const poolState = await axios.get<PoolState>(`${POOL_WARS_API}/api/v1/pools/state?pool=${pool}${!!user ? `&user=${user.toBase58()}` : ''}`);
        return poolState.data;
    }
    catch (e) {
        return;
    }
}

export async function depositMintToPool(pool: PublicKey, transaction: Transaction, mint: PublicKey): Promise<PoolState | undefined> {

    const body = {
        transactionMessage: transaction.serializeMessage().toString('base64'),
        messageSignature: transaction.signature.toString('base64'),
        cardMintAddress: mint.toBase58(),
        poolAddress: pool.toBase58()
    };

    try {
        const response = await axios.post<PoolState>(`${POOL_WARS_API}/api/v1/pools/deposit`, body);
        return response.data;

    } catch (e) {
        console.error(e);
    }

}