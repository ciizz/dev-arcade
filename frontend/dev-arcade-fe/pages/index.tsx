import {
    Badge,
    Box,
    Container,
    Heading,
    SimpleGrid,
    StackDivider,
    VStack,
    Image,
    Center,
    LinkBox,
    LinkOverlay,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import MainPageLayout from "../components/MainPageLayout";
import { useUserAddress } from "../components/UserContext";
import arcade from "../ethereum/arcade.js";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {getUserAccount} from "../ethereum/web3"

const loadGameRoom = async (router:any) => { // event handling ???
    
    const userAddress =await getUserAccount(); 
    const gameRoom = await arcade.methods.gameRooms(userAddress).call();
    if (gameRoom === "0x0000000000000000000000000000000000000000") {
        await arcade.methods.createGameRoom().send({from: userAddress});
    } else {
        await arcade.methods.loadGameRoom().call({from: userAddress});
    }
   
    const test = await arcade.methods.gameRooms(userAddress).call();

    router.push("./diceroll")
};

const Choose = (props: any) => {

    const router = useRouter();

    return (
    <>
    <MainPageLayout>
        <Container py="10" h="75vh">
            <SimpleGrid minChildWidth="10px" spacing="0px">
                <LinkBox>
                    <Box
                        maxW="265px"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        onClick={() =>loadGameRoom(router)}
                    >  
                            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqyAjD1RkGCH1WsS-rc2rZtkJtLjWuxNNJ7qS9MwRz1_f2XArXgKf7-4gi1yu7AbHctg8&usqp=CAU" />
                            <Box p="6">
                                <Box display="flex" alignItems="baseline">
                                    <Badge
                                        borderRadius="full"
                                        px="2"
                                        colorScheme="teal"
                                    >
                                        New
                                    </Badge>
                                    <Box
                                        color="gray.500"
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        ml="2"
                                    >
                                        Min. bet 1 BAM &bull; Max. bet 15 BAM
                                    </Box>
                                </Box>

                                <Box
                                    mt="1"
                                    fontWeight="semibold"
                                    as="h4"
                                    lineHeight="tight"
                                    isTruncated
                                >
                                    Dice Roll Game - Win BAM!
                                </Box>
                            </Box>
                    </Box>
                </LinkBox>

                <Box
                    maxW="265px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated>
                    <Center h="200px">
                        MORE COMING SOON...
                    </Center>    
                </Box>
            </SimpleGrid>
        </Container>
    </MainPageLayout>
    </>
)
};

export default Choose;
