import {useEffect, useState} from "react";
import {Box, BoxProps} from "@chakra-ui/react";
import {array} from "zod";

type TimerDownProps = {
    needDate: Date
}

export const TimerDown = ({needDate, ...boxProps} : TimerDownProps & BoxProps) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let intervalId = setInterval(() => {
            let allSeconds = Math.floor((needDate.getTime() -  Date.now()) / 1000);
            let newDays = Math.floor(allSeconds / (24 * 60 * 60));
            allSeconds -= newDays * 24 * 60 * 60;
            let newHours = Math.floor(allSeconds / (60 * 60));
            allSeconds -= newHours * 60 * 60;
            let newMinutes = Math.floor(allSeconds / 60);
            allSeconds -= newMinutes * 60;
            let newSeconds = allSeconds;

            if (newDays !== days) setDays(newDays);
            if (newHours !== hours) setHours(newHours);
            if (newMinutes !== minutes) setMinutes(newMinutes);
            if (newSeconds !== seconds) setSeconds(newSeconds);
        }, 1000);
        return () => clearInterval(intervalId);
    });

    return <Box {...boxProps}>
        {days} days {hours} hours {minutes} minutes {seconds} seconds
    </Box>
}