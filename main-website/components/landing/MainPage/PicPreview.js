import {Flex} from "@chakra-ui/react";
import Image from 'next/image';

export const PicPreview = () => {
    return <Flex w="100%" mt="100px" maxW="100%" overflowY="hidden" overflowX="auto"
                 flexWrap="nowrap" justifyContent="spaceBetween" whiteSpace="nowrap" mb="100px" paddingLeft="14px"
                 css={{'&::-webkit-scrollbar': {
                         width: '0',
                     },}}>

        <Image src="/increaseNft/5.png" width="320px" height="448px" borderRadius="10px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 320px"/>


        <Image src="/increaseNft/10.png" width="320px" height="448px" borderRadius="10px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 320px"/>
        <Image src="/increaseNft/12.png" width="320px" height="448px" borderRadius="10px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 320px"/>
        <Image src="/increaseNft/6.png" width="320px" height="448px" borderRadius="10px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 320px"/>
        <Image src="/increaseNft/11.png" width="320px" height="448px" borderRadius="10px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 320px"/>
        <Image src="/increaseNft/7.png" width="320px" height="448px" borderRadius="10px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 320px"/>

        <Image src="/increaseNft/9.png" width="320px" height="448px" borderRadius="10px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 320px"/>
        <Image src="/increaseNft/8.png" width="320px" height="448px" borderRadius="10px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 320px"/>
        <Image src="/increaseNft/13.png" width="320px" height="448px" borderRadius="10px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 320px"/>



    </Flex>
}