import {Button, FormControl, Input, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {useState} from "react";
import {useAddress, useNFTDrop} from "@thirdweb-dev/react";

async function updateCode(id) {
    await fetch(`/api/update/${id}`, {
        method: "PUT",
    });
}
async function checkCode(id) {
    const res = await fetch(`/api/check/${id}`, {
        method: "GET",
    });
    const data = await res.json();
    return data.value;
}

export const AirdropForm = () => {
    const size = useWindowSize();

    const [input, setInput] = useState("");
    const [check, setCheck] = useState(false);
    const [freeze, setFreeze] = useState(false);
    const nftDrop = useNFTDrop("0x60D8e84b75A0965CBB6DA91bAB98800fC8B57969");
    const address = useAddress();
    const MintNft = () => {
        console.log(address);
        console.log(nftDrop);
        if (!nftDrop || !address) return;
        nftDrop
            .claimTo(address, 1)
            .then(async (tx) => {
                console.log(tx);
                updateCode(input);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFreeze(true);
        const serverAnswer = await checkCode(input);
        console.log(serverAnswer);
        if (!serverAnswer) {
            setFreeze(false);
        }
        await setCheck(serverAnswer);
    };
    const handleInputChange = (e) => {
        if (!freeze) {
            setInput(e.target.value);
        }
    };


    return <FormControl pl="5.5%" onSubmit={handleSubmit}>
        <Text fontFamily="Trap" fontWeight="900" fontSize={size.width >= 768 ? "80px" : "40px"}  mt="77px" mb="44px" lineHeight="1.1">
            Write your code here
        </Text>
        <InputGroup width="88.8vw" size="md" height="107px" >
            <Input type="text" disabled={freeze} onChange={handleInputChange} value={input}
                   width="100%" height="107px" backgroundColor="rgba(232, 227, 221, 0.09);"
                   boxShadow=" inset 4.51333px -4.51333px 4.51333px rgba(195, 191, 186, 0.464), inset -4.51333px 4.51333px 4.51333px rgba(255, 255, 255, 0.464)"
                   backdropFilter="blur(29.788px)" borderRadius="60px" fontSize="30px"/>
            <InputRightElement width={size.width >= 768 ? "197px" : "100px"} height="65px" borderRadius="52px" mt="21px" mr="30px">
                {check ? <Button onClick={MintNft}
                                 backgroundColor="#B8C3E6" color="#333CED"
                                 width={size.width >= 768 ? "197px" : "100px"} height="65px" borderRadius="52px"
                                 lineHeight="65px" textAlign="center"
                                 fontWeight="800" fontFamily="Trap" fontSize="34px">
                    Mint
                </Button> : <Button type="submit" onClick={handleSubmit}
                                    backgroundColor="#B8C3E6" color="#333CED"
                                    width={size.width >= 768 ? "197px" : "100px"} height="65px" borderRadius="52px"
                                    lineHeight="65px" textAlign="center"
                                    fontWeight="800" fontFamily="Trap" fontSize="34px">
                    Check
                </Button> }



            </InputRightElement>
        </InputGroup>
    </FormControl>
}