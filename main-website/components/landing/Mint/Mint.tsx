import Layout from "../Layout/Layout";
import { Box, Flex } from "@chakra-ui/react";
import React, { MouseEvent } from "react";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { useWalletAuth } from "../../../hooks/useWalletAuth";
import { Keypair, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createUserData, getUserData, mintOne } from "../../../lib/mint-instructions";

const airdropAuthority = Keypair.fromSecretKey(new Uint8Array([87, 63, 47, 245, 211, 198, 55, 243, 138, 201, 237, 198, 57, 34, 88, 224, 234, 49, 51, 191, 224, 89, 45, 31, 199, 95, 209, 129, 178, 203, 158, 88, 135, 41, 24, 119, 139, 239, 142, 50, 14, 223, 31, 244, 177, 196, 221, 109, 149, 38, 54, 24, 206, 7, 176, 72, 52, 175, 40, 209, 211, 239, 86, 51]))

export const Mint = () => {
    const size = useWindowSize();

    const walletAuthObj = useWalletAuth();
    const { connected } = walletAuthObj;
    const wallet = useWallet();
    const { connection } = useConnection();

    async function mintClick(e: MouseEvent<HTMLDivElement>) {

        if (!wallet.publicKey) {
            return;
        }

        const userData = await getUserData(wallet.publicKey, connection);
        const tx = new Transaction();
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        if (!userData) {
            tx.add(await createUserData(wallet.publicKey));
        }

        const mint = new Keypair();
        tx.add(await mintOne(wallet.publicKey, mint));

        tx.partialSign(mint, airdropAuthority);
        const signedTransaction = await wallet.signTransaction(tx);

        try {
            const result = await connection.sendRawTransaction(signedTransaction.serialize());
        }
        catch (e) {
            console.error(e)
        }
    }

    return <Layout>
        {!connected ?

            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">Connect wallet
                to see your profile page.</Flex>
            :
            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">
                <Box onClick={mintClick} w="300px" h="72px" backgroundColor="#202020" color="#71CFC3" border="2px" borderColor="#71CFC3"
                    borderRadius="20px"
                    fontWeight="400" fontSize="36px" lineHeight="68px" textAlign="center" transition="all 1s" _hover={{
                        backgroundColor: "#71CFC3",
                        color: "#202020",
                    }}>Mint</Box>
            </Flex>
        }
    </Layout>
}