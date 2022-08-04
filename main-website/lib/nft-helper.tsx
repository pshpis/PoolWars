import { Connection, PublicKey } from "@solana/web3.js";

export type NFTStat = {
    src: string;
    maxValue: number;
}

export async function parseCards(address: PublicKey | null, connection: Connection): Promise<NFTStat[]> {

    if (!address) {
        return []
    }

    return [
        {
            maxValue: 1,
            src: '/increaseNft/attack_1.png'
        },{
            maxValue: 1,
            src: '/increaseNft/attack_1.png'
        },{
            maxValue: 1,
            src: '/increaseNft/attack_1.png'
        },{
            maxValue: 1,
            src: '/increaseNft/attack_1.png'
        },{
            maxValue: 1,
            src: '/increaseNft/attack_1.png'
        },{
            maxValue: 1,
            src: '/increaseNft/attack_1.png'
        },{
            maxValue: 1,
            src: '/increaseNft/attack_1.png'
        },{
            maxValue: 1,
            src: '/increaseNft/attack_1.png'
        }
    ]
}