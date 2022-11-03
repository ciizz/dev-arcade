import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    FormLabel,
    InputGroup,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Spacer,
    Stack,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Dice from "./Dice";

// TODO: this needs to be fetched from the backend using web3.js
const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const RollDice = () => {
    const [dice1, setDice1] = useState(1);

    const [isRolling, setIsRolling] = useState(false);

    const [betAmount, setBetAmount] = useState(1);

    const toast = useToast();

    const onRollClick = async () => {
        setIsRolling(true);

        for (let i = 0; i < 10; i++) {
            setDice1(getRandomInt(1, 6));
            await sleep(400);
        }

        setIsRolling(false);

        toast({
            title: "Dice Successfully Rolled.",
            description: "Dice has rolled successfully",
            status: "success",
            duration: 2500,
            isClosable: true,
            position: "top-right",
        });
    };

    return (
        <>
            <Flex px="100" py="100">
                <Container>
                    <Center>
                    <Dice face={dice1} />
                    </Center>
                </Container>
            </Flex>

            <Box p="5">
                <FormControl bg="white" p="6" borderRadius="xl">
                    <Stack spacing={3}>
                        <InputGroup>
                            <FormLabel htmlFor="amount">Bet amount:</FormLabel>
                            <NumberInput
                                min={1}
                                value={betAmount + ' BAM'}
                                onChange={(_, valNum) => {
                                    setBetAmount(valNum);
                                }}
                                max={15}
                            >
                                <NumberInputField id="amount" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </InputGroup>

                        <Button
                            colorScheme="cyan"
                            isLoading={isRolling}
                            onClick={onRollClick}
                            loadingText="Rolling"
                        >
                            Roll Dice
                        </Button>
                    </Stack>
                </FormControl>
            </Box>
        </>
    );
};

export default RollDice;
