import { Box, Container } from "@chakra-ui/react";
import React, {useState} from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import {UserProvider} from './UserContext'; 


export const UserContext = React.createContext(undefined); 

const MainPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserProvider>
            <Nav />
            <Container maxW="container.lg" align="left">
                {children}
            </Container>
            <Footer />
        </UserProvider>
    );
};

export default MainPageLayout;
