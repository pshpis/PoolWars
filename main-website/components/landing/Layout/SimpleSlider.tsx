import React, { Component } from "react";
import Slider from "react-slick";
import Head from "next/head";
import {Box, HStack} from "@chakra-ui/react";

export const SimpleSlider = () =>  {
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: -1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 1000,
        cssEase: "linear",
        variableWidth: true

    };
    return (
        <div>
            <h2> Single Item</h2>
            <Slider {...settings}>
                <Box>
                    <Box backgroundColor="red" width={"500px"}>
                        <h3>1</h3>
                    </Box>
                </Box>
                <Box>
                    <Box backgroundColor="red" width={"500px"}>
                        <h3>2</h3>
                    </Box>
                </Box>
                <Box>
                    <Box backgroundColor="red" width={"500px"}>
                        <h3>3</h3>
                    </Box>
                </Box>
                <Box>
                    <Box backgroundColor="red" width={"500px"}>
                        <h3>4</h3>
                    </Box>
                </Box>
                <Box>
                    <Box backgroundColor="red" width={"500px"}>
                        <h3>5</h3>
                    </Box>
                </Box>
                <Box>
                    <Box backgroundColor="red" width={"500px"}>
                        <h3>6</h3>
                    </Box>
                </Box>

            </Slider>
        </div>
    );
}