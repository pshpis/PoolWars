import React from "react";
import {Img} from "@chakra-ui/react";

export const ProfileCard = ({data}) => {
    return <Img src={data.metadata.image} width="320px" height="448px" borderRadius="10px" />
}