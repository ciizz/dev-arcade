import {
    Box,
    Container,
    Heading,
    Stack,
    Link,
    Text,
    Avatar,
} from "@chakra-ui/react";
import React from "react";

const LinkItem = ({ children }: { children: React.ReactNode }) => {
    return <Link p="2">{children}</Link>;
};

const Footer = () => {
    return (
        <Box width="100%" paddingY="2" bg="cyan.100">
            <Container
                display="flex"
                p="2"
                maxW="container.lg"
                wrap="wrap"
                align="center"
                justify="space-between"
            >
                <Stack display="flex" direction="row">
                    <Text p="2"> @Copyright Blockchain at McGill</Text>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
