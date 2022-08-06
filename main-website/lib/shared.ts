import { PublicKey } from "@solana/web3.js";
import { NFTStatWithMints } from "./nft-helper";

export interface ChooseNode{
    id: string,
    value: number,
    points: number
}

export interface ChooseState {
    chooseArr: ChooseNode[],
    sumPoints: number,
    setChooseArr: (id: string, value: number) => void
}

export const mapChooseStateToMints = (chooseState: ChooseState, nftStats: NFTStatWithMints[]): PublicKey[] => {

    const mints: PublicKey[] = []

    chooseState.chooseArr.forEach(chosen => {

        let stat: NFTStatWithMints | undefined = undefined;

        if (chosen.id === 'attack_1') {
            stat = nftStats[0];
        } else if (chosen.id === 'defence_1') {
            stat = nftStats[1];
        } else if (chosen.id === 'intelligence_1') {
            stat = nftStats[2];
        } else if (chosen.id === 'attack_3') {
            stat = nftStats[3];
        } else if (chosen.id === 'defence_3') {
            stat = nftStats[4];
        } else if (chosen.id === 'intelligence_3') {
            stat = nftStats[5];
        } else if (chosen.id === 'attack_6') {
            stat = nftStats[6];
        } else if (chosen.id === 'defence_6') {
            stat = nftStats[7];
        } else if (chosen.id === 'intelligence_6') {
            stat = nftStats[8];
        }

        console.log(stat)
        
        mints.push(...stat.mints.slice(0, chosen.value));
    });

    return mints;
}