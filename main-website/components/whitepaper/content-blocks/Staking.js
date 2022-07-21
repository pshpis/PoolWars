import {Heading, Text} from "@chakra-ui/react";

export const Staking = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Staking</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Information about staking and our token</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">What NFT project can launch without staking? Holders will be able to receive <b>$KATT</b>, for which they will be able to participate in <b>raffles</b> and <b>1/1 NFT auctions</b>, as well as in <b>Pool Wars events</b>, in which they will be able to win <b>legendary</b> Katts and upgrades and multiply their token amount.
            Staking will be rarity-sensitive - the rare Katts will earn more <b>$KATT</b>.
        </Text>

        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">
            The <b>$KATT</b> token will be backed by the liquidity pool on <b>raydium</b>. Everyone will be able to exchange their <b>$KATT</b> token for USDC, and other way around. <b>10%</b> of earnings from the mint and <b>20%</b> of royalties will go to the liquidity pool.
        </Text>
    </>
}
