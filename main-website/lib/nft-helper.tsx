import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metadata } from '@metaplex-foundation/mpl-token-metadata'
import axios from "axios";

export type Attribute = {
    trait_type: string,
    value: string
}

export type NFTStat = {
    src: string;
    maxValue: number;
}

type NFTAmounts = {
    attack1: number,
    attack3: number,
    attack6: number,
    defence1: number,
    defence3: number,
    defence6: number,
    intelligence1: number,
    intelligence3: number,
    intelligence6: number,
}

export type Mints = {
    attack1mints: PublicKey[],
    attack3mints: PublicKey[],
    attack6mints: PublicKey[],
    defence1mints: PublicKey[],
    defence3mints: PublicKey[],
    defence6mints: PublicKey[],
    intelligence1mints: PublicKey[],
    intelligence3mints: PublicKey[],
    intelligence6mints: PublicKey[],
}

export type NFTAmountsWithMints = NFTAmounts & Mints;
export type NFTStatWithMints = NFTStat & {
    mints: PublicKey[]
}

const allowedCreators = [
    new PublicKey('HQqpHR1DE7o8qorjDanWFedxi5bH9rmyQksfLKYkZfZq')
]

const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

async function deriveMetaplexMetadata(mint: PublicKey): Promise<PublicKey> {

    return (await PublicKey.findProgramAddress([
        Buffer.from("metadata"),
        METADATA_PROGRAM_ID.toBytes(),
        mint.toBytes()
    ], METADATA_PROGRAM_ID))[0]
}

export function amountsToArray(amounts: NFTAmountsWithMints): NFTStatWithMints[] {

    return [
        {
            maxValue: amounts.attack1,
            src: 'https://elderkatts.com/json-metadata/attack_1.png',
            mints: amounts.attack1mints
        },
        {
            maxValue: amounts.attack3,
            src: 'https://elderkatts.com/json-metadata/attack_3.png',
            mints: amounts.attack3mints
        },
        {
            maxValue: amounts.attack6,
            src: 'https://elderkatts.com/json-metadata/attack_6.png',
            mints: amounts.attack6mints
        },
        {
            maxValue: amounts.defence1,
            src: 'https://elderkatts.com/json-metadata/defence_1.png',
            mints: amounts.defence1mints
        },
        {
            maxValue: amounts.defence3,
            src: 'https://elderkatts.com/json-metadata/defence_3.png',
            mints: amounts.defence3mints
        },
        {
            maxValue: amounts.defence6,
            src: 'https://elderkatts.com/json-metadata/defence_6.png',
            mints: amounts.defence6mints
        },
        {
            maxValue: amounts.intelligence1,
            src: 'https://elderkatts.com/json-metadata/intelligence_1.png',
            mints: amounts.intelligence1mints
        },
        {
            maxValue: amounts.intelligence3,
            src: 'https://elderkatts.com/json-metadata/intelligence_3.png',
            mints: amounts.intelligence3mints
        },
        {
            maxValue: amounts.intelligence6,
            src: 'https://elderkatts.com/json-metadata/intelligence_6.png',
            mints: amounts.intelligence6mints
        },
    ]
}

async function parseMints(address: PublicKey | null, connection: Connection): Promise<PublicKey[]> {

    try {
        const mints: string[] = (await connection.getParsedTokenAccountsByOwner(address, {
            programId: TOKEN_PROGRAM_ID
        })).value
            .filter(t => t.account.data.parsed.info.tokenAmount.uiAmount === 1 && t.account.data.parsed.info.tokenAmount.decimals == 0)
            .map(t => t.account.data.parsed.info.mint);


        return mints.map(m => new PublicKey(m))
    } catch (e) {
        return []
    }
}

async function processMint(mint: PublicKey, amounts: NFTAmountsWithMints, connection: Connection): Promise<NFTAmountsWithMints> {

    try {
        const metadata = await Metadata.fromAccountAddress(connection, mint);

        if (!metadata.data.creators[0].verified) {
            return amounts;
        }

        if (!allowedCreators.some(c => c.toBase58() === metadata.data.creators[0].address.toBase58())) {
            return amounts;
        }

        const uri = metadata.data.uri;
        const data = await axios.get<{ attributes: Attribute[] }>(uri);
        const attributes: Attribute[] = data.data.attributes;

        const type = attributes.find(a => a.trait_type === 'Type').value;
        const strength = attributes.find(a => a.trait_type === 'Strength').value;

        switch (type) {

            case 'Attack':
                if (strength === '1') {
                    amounts.attack1 += 1;
                    amounts.attack1mints.push(mint);

                } else if (strength === '3') {
                    amounts.attack3 += 1;
                    amounts.attack3mints.push(mint);

                } else if (strength === '6') {
                    amounts.attack6 += 1;
                    amounts.attack6mints.push(mint);

                }

                break;

            case 'Defence':
                if (strength === '1') {
                    amounts.defence1 += 1;
                    amounts.defence1mints.push(mint);

                } else if (strength === '3') {
                    amounts.defence3 += 1;
                    amounts.defence3mints.push(mint);

                } else if (strength === '6') {
                    amounts.defence6 += 1;
                    amounts.defence6mints.push(mint);

                }

                break;

            case 'Intelligence':
                if (strength === '1') {
                    amounts.intelligence1 += 1;
                    amounts.intelligence1mints.push(mint);

                } else if (strength === '3') {
                    amounts.intelligence3 += 1;
                    amounts.intelligence1mints.push(mint);

                } else if (strength === '6') {
                    amounts.intelligence6 += 1;
                    amounts.intelligence6mints.push(mint);

                }

                break;

            default:
                break;
        }

        return amounts;
    }
    catch (e) {
        return amounts;
    }
}

export async function parseCards(address: PublicKey | null, connection: Connection): Promise<NFTStatWithMints[]> {

    console.log('parse started');

    let amounts: NFTAmountsWithMints = {
        attack1: 0,
        attack3: 0,
        attack6: 0,
        defence1: 0,
        defence3: 0,
        defence6: 0,
        intelligence1: 0,
        intelligence3: 0,
        intelligence6: 0,
        attack1mints: [],
        attack3mints: [],
        attack6mints: [],
        defence1mints: [],
        defence3mints: [],
        defence6mints: [],
        intelligence1mints: [],
        intelligence3mints: [],
        intelligence6mints: [],
    }

    if (!address) {
        return amountsToArray(amounts);
    }

    const mints = await parseMints(address, connection);

    for (let i = 0; i < mints.length; i++) {
        amounts = await processMint(mints[i], amounts, connection);
    }

    return amountsToArray(amounts);
}