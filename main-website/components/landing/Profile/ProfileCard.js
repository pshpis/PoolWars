import React from "react";
import {Img} from "@chakra-ui/react";

export const ProfileCard = ({data}) => {
    return <Img src={data.metadata.image} width="365px" height="450px" borderRadius="43px" />
}