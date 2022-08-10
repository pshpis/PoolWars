import { AccountMeta, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { BN } from "bn.js";
import { off } from "process";

export type swapType = '3' | '6' | '9'

const MINT_AUTHORITY = "mint_authority";

const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

const SWAP_PROGRAM_ID = new PublicKey('HWeQ1ntizxmbMwVHemf9zncf2h6RTTfLiuzbjD9wAN9e')
const LEGENDARY_SWAP_CONFIG = new PublicKey('H3ahi5w41BCUyq1rqJCnajVohxFGqxhGk4Z9sqciFbi7')
const POINTS3_SWAP_CONFIG = new PublicKey('Dqnx4WiF1RMqtzm31Amg1MGbG2QaFdL4vr2NPybH4tJ3')
const POINTS6_SWAP_CONFIG = new PublicKey('E1DaHgRg8fUFEd8BNwbxiTd6VgLqRPTA8kuyqDWWYqvx')


const SWAP_ADMIN = new PublicKey('2XRgdUEKfvhtVTURZKzJ9UzwA7FeEPeF8qa2NFSSBpmL')
const SWAP_REVENUES = new PublicKey('Ekp5qHiSnH7WGH9bqbHXm3FDqc9BxMsimfpAw7LoQzZk')
export const SWAP_AUTHORITY = new PublicKey('44Z46Nzn1hpsAZJ4TuX1CUG6kmKo7NEn2VDjztT5uUz3')

const getConfig = (swap: swapType): PublicKey => {

    if (swap === '3') {
        return POINTS3_SWAP_CONFIG;
    } else if (swap === '6') {
        return POINTS6_SWAP_CONFIG;
    } else if (swap === '9') {
        return LEGENDARY_SWAP_CONFIG;
    }
}

async function deriveMintAuthority(config: PublicKey): Promise<PublicKey> {

    return (await PublicKey.findProgramAddress([
        Buffer.from(MINT_AUTHORITY),
        config.toBytes()
    ], SWAP_PROGRAM_ID))[0]
}

async function deriveMetaplexMetadata(mint: PublicKey): Promise<PublicKey> {

    return (await PublicKey.findProgramAddress([
        Buffer.from("metadata"),
        METADATA_PROGRAM_ID.toBytes(),
        mint.toBytes()
    ], METADATA_PROGRAM_ID))[0]
}


export async function swapCards(
    user: PublicKey,
    mints: PublicKey[],
    mint: PublicKey,
    swap: swapType): Promise<TransactionInstruction> {

    const config = getConfig(swap);

    const destinationTokenAccount = await getAssociatedTokenAddress(mint, user);
    const metadata = await deriveMetaplexMetadata(mint);
    const mintAuthority = await deriveMintAuthority(config);

    const keys: AccountMeta[] = [
        { pubkey: user, isWritable: false, isSigner: true },
        { pubkey: config, isWritable: true, isSigner: false },
        { pubkey: mint, isWritable: true, isSigner: true },
        { pubkey: user, isWritable: true, isSigner: false },
        { pubkey: destinationTokenAccount, isWritable: true, isSigner: false },
        { pubkey: metadata, isWritable: true, isSigner: false },
        { pubkey: mintAuthority, isWritable: false, isSigner: false },
        { pubkey: SystemProgram.programId, isWritable: false, isSigner: false },
        { pubkey: SYSVAR_RENT_PUBKEY, isWritable: false, isSigner: false },
        { pubkey: TOKEN_PROGRAM_ID, isWritable: false, isSigner: false },
        { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isWritable: false, isSigner: false },
        { pubkey: METADATA_PROGRAM_ID, isWritable: false, isSigner: false },
        { pubkey: user, isWritable: true, isSigner: true },
        { pubkey: SWAP_AUTHORITY, isWritable: false, isSigner: true },
        { pubkey: SWAP_ADMIN, isWritable: false, isSigner: false },
        { pubkey: SWAP_REVENUES, isWritable: false, isSigner: false }
    ]

    for (let i = 0; i < mints.length; i++) {

        const m = mints[i];
        const source = await getAssociatedTokenAddress(m, user);
        const destination = await getAssociatedTokenAddress(m, SWAP_ADMIN);

        keys.push(
            { pubkey: source, isWritable: true, isSigner: false },
            { pubkey: m, isWritable: true, isSigner: false },
            { pubkey: destination, isWritable: true, isSigner: false }
        );
    }

    return new TransactionInstruction({
        programId: SWAP_PROGRAM_ID,
        data: Buffer.of(
            ...new BN(2).toArray("le", 1),
            ...new BN(mints.length).toArray("le", 1)
        ),
        keys
    })
}