import { Heading, VStack, StackDivider, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import web3 from '../../ethereum/web3'
import arcade from '../../ethereum/arcade'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import { useState } from "react";

interface LeaderboardTuple {
    playerAddress: string;
    playerWins: number; 
    playerScore: number;
}
interface Leaderboard {
    records: LeaderboardTuple[] 
}

const getLeaderboard = async (setLeaderboard: any) => // update setLeaderboard attribute to exact function description
{
    // load every game room and retrieve from each Load event the wins and score 
    // call this function on the server side if possible, otherwise in the use effect
    
    const localL: Leaderboard = {records: []}
    const numPlayers = await arcade.methods.getNumberOfPlayers().call();
    //console.log(numPlayers)
    let currentPlayer; 
    let playerWins; 
    let playerScore; 

    for(var i = 0; i < numPlayers; i++) {
        // get the player address
        currentPlayer = await arcade.methods.players(i).call(); 
        // get their number of wins and score
        playerWins = await arcade.methods.getPlayerWins(currentPlayer).call(); 
        playerScore = await arcade.methods.getPlayerScore(currentPlayer).call(); 

        //console.log(playerScore,playerWins)
        // save the tuple in the leaderboard variable
        let record: LeaderboardTuple = {playerAddress:"", playerWins:0,playerScore:0}
        record.playerAddress = currentPlayer; 
        record.playerScore = playerScore;
        record.playerWins = playerWins; 

        localL.records.push(record); 
        setLeaderboard(localL)   
    }
}
const sortLeaderboard = (leaderboard: Leaderboard,sortAttribute: string) : Leaderboard => {
    // sort the leaderboard based on the sort attribute
    if(sortAttribute === "wins") {
        leaderboard.records.sort((a:LeaderboardTuple,b:LeaderboardTuple) => (a.playerWins < b.playerWins)  ? 1 : -1)
     } else {
        leaderboard.records.sort((a:LeaderboardTuple,b:LeaderboardTuple) => (a.playerScore < b.playerScore)  ? 1 : -1)
        }
    return leaderboard; 
}

// need update leaderboard function that will be triggered after a bet; 

const Leaderboard = (props: any) => {

    const [leaderboard, setLeaderboard] = useState<Leaderboard>({records: []}); 
    const sortAttribute = "score";

    useEffect(() => {
        if(leaderboard.records.length == 0)
            getLeaderboard(setLeaderboard);  
    },[leaderboard])

    return (
        <> 
            {console.log(leaderboard)}
            <TableContainer>
                <Table variant="simple" size="lg">
                    <Thead>
                        <Tr>
                            <Th>
                                Player
                            </Th>
                            <Th>
                                Wins
                            </Th>
                            <Th>
                                Score
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sortLeaderboard(leaderboard,sortAttribute).records.map((record: LeaderboardTuple,index) => 
        {
            return (
                <Tr key={index}><Td>{`${record.playerAddress.substring(0,10)}...`}</Td><Td style={{textAlign:"center"}}>{record.playerWins}</Td><Td style={{textAlign:"center"}}>{record.playerScore}</Td></Tr>
            ); 
        })};
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Leaderboard;
