import {
    Box,
    Container,
    Heading,
    StackDivider,
    VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import MainPageLayout from "../components/MainPageLayout";
import RollDice from "../components/GamePageComponents/RollDiceComponents/RollDice";
import Leaderboard from "../components/GamePageComponents/Leaderboard";
import { 
        web3
} from '../ethereum/web3';
import arcade from "../ethereum/arcade";

const Home: NextPage = (props) => {
    console.log(props)
    return (
        <MainPageLayout>
            <Container
                display="flex"
                p="10"
                justifyContent="space-between"
                maxW="100%"
            >
                <Box width="575px" h="500px" bg="cyan.200" borderRadius="xl">
                    <RollDice />
                </Box>
                <Box
                    width="300px"
                    h="500px"
                    bg="cyan.200"
                    borderRadius="xl"
                    p="3"
                >
                    <Leaderboard />
                </Box>
            </Container>
        </MainPageLayout>
    );
};

export default Home;

/*
 * input boxes: bet amount
 * input box: players score
 * Leader board choice: by no. of wins, by amount won
 *
 */
