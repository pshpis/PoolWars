import {Button, FormControl, FormLabel, Input, Stack} from "@chakra-ui/react";

export const DiscordFormControl = ({mb}) => {
    return <FormControl mb={mb}>
        <FormLabel mb="15px" fontSize="24px">Please subscribe our Discord chanel, get verified and write your discord username here.</FormLabel>
        <Stack direction="row" height="60px">
            <Input type="text" h="100%" fontSize="24px"/>
            <Button colorScheme="blue" width="150px" h="100%" fontSize="24px">Check</Button>
        </Stack>
    </FormControl>
}
