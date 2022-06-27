import {Img, ImgProps, useDisclosure} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'

type warlordCardProps = {
    cardId: number,
} & ImgProps;

export const WarlordCard = ({cardId, ...imgProps} : warlordCardProps) => {
    const imgPath = "/increaseNft/";
    const { isOpen, onOpen, onClose } = useDisclosure();

    return <>
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        <Img src={imgPath + (cardId + 1) + ".png"} {...imgProps}/>
    </>
};