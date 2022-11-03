import React from "react";
import type { NextPage } from "next";
import MainPageLayout from "../components/MainPageLayout";
import { Button, Container, Heading, VStack, Text } from "@chakra-ui/react";

const metamask: NextPage = () => {
    return (
        <MainPageLayout>
            <Container align="center" py="10" maxW="100%">
                <VStack spacing="4">
                    <Button colorScheme="cyan" variant="outline">
                        Connect to Metamask
                    </Button>
                    <Container maxW="100%" align="left">
                        <Heading>Instructionsssss</Heading>
                        <VStack pt="5" spacing="4" align="left">
                            <Text>hahahahahah</Text>
                            <Text>hahahahahah</Text>
                            <Text>hahahahahah</Text>
                            <Text>hahahahahah</Text>
                            <Text>hahahahahah</Text>
                            <Text>hahahahahah</Text>
                            <Text>hahahahahah</Text>
                            <Text>hahahahahah</Text>
                            <Text>hahahahahah</Text>
                            <Text>hahahahahah</Text>
                        </VStack>
                    </Container>
                </VStack>
            </Container>
        </MainPageLayout>
    );
};

export default metamask;
