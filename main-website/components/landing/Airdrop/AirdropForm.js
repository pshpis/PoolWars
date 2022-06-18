import {Button, FormControl, Input, InputGroup, InputRightElement, Text, useToast} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {useState} from "react";
import {useWallet} from "@solana/wallet-adapter-react";

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
    const {publicKey, connected} = useWallet();
    const toast = useToast();

    const MintNft = () => {
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (input === "") return;
        if (!address){
            let id = "NotMetamaskConnect";
            if (!toast.isActive(id))
                toast({
                    id,
                    title: "At first connect you metamask wallet",
                    status: "warning",
                    isClosable: "true",
                    position: "top",
                });
            return;
        }


        setFreeze(true);
        const serverAnswer = await checkCode(input);
        console.log(serverAnswer);
        if (!serverAnswer) {
            setFreeze(false);
        }
        await setCheck(serverAnswer);


        let id1 = "successChecking";
        const id2 = "notSuccessChecking";
        let id;
        if (!toast.isActive(id1) && serverAnswer){
            let id = id1;
            toast({
                id,
                title: "Your code was checked",
                description: "Now you can mint your nft and see it at your profile",
                status: "success",
                isClosable: "true",
                position: "top",
            });
        }
        else if (!toast.isActive(id2)){
            id = id2;
            toast({
                id,
                title: "Your code is wrong" ,
                status: "error",
                isClosable: "true",
                position: "top",
            });
        }


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
                   width="100%" height="107px" backgroundColor="rgba(232, 227, 221, 0.09);" pl="25px"
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