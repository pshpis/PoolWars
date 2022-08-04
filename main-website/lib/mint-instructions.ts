import { Connection, Keypair, PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY, TransactionInstruction } from "@solana/web3.js";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token"
import BN from "bn.js"

export type UserMintData = {
    mintAmount: number,
    lockTill: number
}

export const MINT_PROGRAM_ID = new PublicKey('9fHdkidrwJJamCk2EmFb45MzUoy4scoGRz1XJqqGZmGN');
export const MINT_CONFIG_ADDRESS = new PublicKey('7GpvkSRqxHvCwNMWcmHv3pWKo2qyk4ZSpBdamnDDaDW4');
export const MINT_AIRDROP_AUTHORITY = new PublicKey('A6cPHtm1AQUvYjBUBMMsVgLiRgZ54bRT7T6bXEkhQe8r');
export const MINT_ADMIN_ACCOUNT = new PublicKey('Gc2J1WxU2EpFfj2U3rbQkdd3WfVz7qVUXjNnS8ETvpsL');
export const MINT_REVENUES_WALLET = new PublicKey('DRLCySRyuKxgPTeiJVoKgPqK5SCMwtJDBLtNPQrwUoXL');


export async function getUserData(user: PublicKey, connection: Connection): Promise<UserMintData | null> {

    try {
        console.log('0')
        const account = await connection.getAccountInfo(await deriveUserAccount(user));

        console.log('1')
        console.log(account.owner.toBase58())
        if (account.owner.toBase58() !== MINT_PROGRAM_ID.toBase58()) {
            return null
        }

        console.log('2')
        const mintAmount = new BN(account.data.slice(65, 8), "le").toNumber();
        const lockTill = new BN(account.data.slice(73, 8), "le").toNumber();

        return {
            mintAmount,
            lockTill
        }
    }
    catch (e) {
        return null;
    }
}

const USER_DATA = "user_data";
const MINT_AUTHORITY = "mint_authority";
const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

async function deriveUserAccount(user: PublicKey): Promise<PublicKey> {

    return (await PublicKey.findProgramAddress([
        Buffer.from(USER_DATA),
        MINT_CONFIG_ADDRESS.toBytes(),
        user.toBytes()
    ], MINT_PROGRAM_ID))[0]
}

async function deriveMintAuthority(): Promise<PublicKey> {

    return (await PublicKey.findProgramAddress([
        Buffer.from(MINT_AUTHORITY),
        MINT_CONFIG_ADDRESS.toBytes()
    ], MINT_PROGRAM_ID))[0]
}

async function deriveMetaplexMetadata(mint: PublicKey): Promise<PublicKey> {

    return (await PublicKey.findProgramAddress([
        Buffer.from("metadata"),
        METADATA_PROGRAM_ID.toBytes(),
        mint.toBytes()
    ], METADATA_PROGRAM_ID))[0]
}

export async function createUserData(user: PublicKey): Promise<TransactionInstruction> {

    const userData = await deriveUserAccount(user);

    return new TransactionInstruction({
        programId: MINT_PROGRAM_ID,
        data: Buffer.of(
            ...new BN(2).toArray("le", 1)
        ),
        keys: [
            { pubkey: userData, isWritable: true, isSigner: false },

            { pubkey: user, isWritable: false, isSigner: false },

            { pubkey: MINT_CONFIG_ADDRESS, isWritable: true, isSigner: false },

            { pubkey: SYSVAR_RENT_PUBKEY, isWritable: false, isSigner: false },

            { pubkey: user, isWritable: true, isSigner: true },

            { pubkey: SystemProgram.programId, isWritable: false, isSigner: false },
        ]
    })
}

export async function mintOne(walletAddress: PublicKey, mint: Keypair): Promise<TransactionInstruction> {

    const userData = await deriveUserAccount(walletAddress);
    const metadata = await deriveMetaplexMetadata(mint.publicKey);
    const tokenAccount = await getAssociatedTokenAddress(mint.publicKey, walletAddress);
    const mintAuthority = await deriveMintAuthority();

    return new TransactionInstruction({
        programId: MINT_PROGRAM_ID,
        data: Buffer.of(
            ...new BN(3).toArray("le", 1)
        ),
        keys: [
            { pubkey: MINT_CONFIG_ADDRESS, isWritable: true, isSigner: false },

            { pubkey: userData, isWritable: true, isSigner: false },

            { pubkey: mint.publicKey, isWritable: true, isSigner: true },

            { pubkey: walletAddress, isWritable: false, isSigner: false },

            { pubkey: tokenAccount, isWritable: true, isSigner: false },

            { pubkey: metadata, isWritable: true, isSigner: false },

            { pubkey: mintAuthority, isWritable: false, isSigner: false },

            { pubkey: SystemProgram.programId, isWritable: false, isSigner: false },

            { pubkey: SYSVAR_CLOCK_PUBKEY, isWritable: false, isSigner: false },

            { pubkey: SYSVAR_RENT_PUBKEY, isWritable: false, isSigner: false },

            { pubkey: TOKEN_PROGRAM_ID, isWritable: false, isSigner: false },

            { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isWritable: false, isSigner: false },

            { pubkey: METADATA_PROGRAM_ID, isWritable: false, isSigner: false },

            { pubkey: walletAddress, isWritable: true, isSigner: true },

            { pubkey: MINT_AIRDROP_AUTHORITY, isWritable: false, isSigner: true },

            { pubkey: MINT_ADMIN_ACCOUNT, isWritable: false, isSigner: false },

            { pubkey: MINT_REVENUES_WALLET, isWritable: true, isSigner: false }
        ]
    })
}