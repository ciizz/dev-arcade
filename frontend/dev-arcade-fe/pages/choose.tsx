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
    Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import type { NextPage } from "next";
import MainPageLayout from "../components/MainPageLayout";

const Choose: NextPage = () => (
    <Container py="10" maxW="100%" h="75vh">
        <SimpleGrid minChildWidth="10px" spacing="0px">
            <Box
                maxW="300px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
            >
                <Center mt="3">
                    <NextLink href="/dice" passHref>
                        <Link>
                            <Image src="/dice.svg" alt="Dice Icon"/>
                        </Link>
                    </NextLink>
                </Center>
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
                            A simple web3 roll dice game
                        </Box>
                    </Box>
                    <NextLink href="/dice" passHref>
                        <Link mt="1" fontWeight="semibold" as="h4">
                            Roll Dice
                        </Link>
                    </NextLink>
                </Box>
            </Box>
        </SimpleGrid>
    </Container>
);

export default Choose;
