import {
    Box,
    Container,
    Flex,
    Heading,
    Stack,
    Link,
    Text,
    Avatar,
    Button,
    LinkBox,
    LinkOverlay,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { getUserAccount } from "../ethereum/web3";
import { useUserAddress,useUserUpdateAddress } from "./UserContext";
import { useRouter } from "next/router";
import token from "../ethereum/token";

const LinkItem = ({ children }: { children: React.ReactNode }) => {
    return <Link p="2">{children}</Link>;
};

const Nav = () => {

    const router = useRouter();

    const [userAddress,setUserAddress] = useState(""); 

    console.log(userAddress)

    const [isLoading,setIsLoading] = useState<boolean>(false); 
    const [hasMetamask, setHasMetamask] = useState<boolean>(true);
    const [isConnected,setIsConnected] = useState<boolean>(userAddress ? true : false);
    const [isFundButtonLoading, setIsFundButtonLoading] = useState<boolean>(false);
    const [hasFunds, setHasFunds] = useState<boolean>(true);
    
    

    const checkUserBalance = async () => {
        const addFundThreshold = 5;  // maximum token balance for getting the funds from a faucet

        const account = await getUserAccount();

        try {
            const balance = await token.methods.balanceOf(account).call();
            if (balance <= addFundThreshold) {
                setHasFunds(false);
            }
        } catch (error) {
            console.log(error);     // the user may connect to a wrong network
        }
    }

    const connectToMetamask = async () => {
        setIsLoading(true); 

       const account = await getUserAccount(); 
       setUserAddress(account);
       setIsConnected(true); 
       
       setIsLoading(false);
    }

    const addFunds = async () => {
        setIsFundButtonLoading(true);
        
        await new Promise(resolve => setTimeout(resolve, 10000));  // 10 second wait for simulating transaction
        
        setIsFundButtonLoading(false);
    }
    
    useEffect( () => {
        if((window as any).ethereum === undefined){  // the user doesn't have metamask !! warning this code might break if metamask introduce changes such as not injecting a ethereum object anymore. 
            router.push("/metamask");
            setHasMetamask(false)
        }
    },[])

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
               
               <Button onClick={() => router.push("./")}>
                <Heading letterSpacing={"tighter"} p="2">
                    BAM DevArcade
                </Heading>
               </Button>
    
                <Stack
                    direction="row"
                    display="flex"
                    alignItems="center"
                    flexGrow={1}
                >
                    <LinkItem>Item 1</LinkItem>
                    <LinkItem>Item 2</LinkItem>
                    <LinkItem>Item 3</LinkItem>
                </Stack>
                {console.log(hasMetamask)}
                <Stack display="flex" direction="row" align="center">
                    {!hasFunds && <Button
                    colorScheme="pink"
                    size="sm"
                    isLoading={isFundButtonLoading}
                    onClick={addFunds}>
                        Add Funds
                    </Button>}
                   {!isConnected ? <Button
                   isDisabled={!hasMetamask}
                   colorScheme="blue"
                   isLoading={isLoading}
                   onClick={connectToMetamask}
                   >Connect to Metamask</Button> :
                   <div>
                       <Text p="2">
                       <a href={`https://rinkeby.etherscan.io/address/${userAddress}`} target="_blank" rel="noreferrer">{userAddress}</a>
                       </Text>
                       <Avatar size="sm" name="John Doe" src="https://bit.ly/dan-abramov" />
                    </div>}
                </Stack>
            </Container>
        </Box>
    );
};

export default Nav;
