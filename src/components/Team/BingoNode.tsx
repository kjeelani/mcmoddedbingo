import React, { useState } from "react";
import { 
    Flex,
    Heading,
    Spacer,
    Text,
    Box,
    Link,
    useDisclosure,
} from '@chakra-ui/react'
import {    
    AddIcon,
    LockIcon,
    UnlockIcon
} from '@chakra-ui/icons'
import useAxios from "axios-hooks";
import { NodeModal, NodeModalProps } from "./NodeModal"
import { TeamData } from "../APIData";

export interface BingoNodeProps {
	challengeID: string,
    teamData: TeamData,
    completed: boolean,
}

export function BingoNode(bnprops: BingoNodeProps) {
    const [{ data, loading }, refetch] = useAxios({
        url: `api/challenges/${bnprops.challengeID}`,
        method: "GET"
      }
    );
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isCompleted, setIsCompleted] = useState(bnprops.completed);

    return (
        <Link onClick={!isCompleted ? onOpen : function(){console.log("failed")}}>
            <Box p="8" fontSize="lg" bgColor={!!data && isCompleted ? "green.300" : "gray.100"}>
                {loading && <Text>Loading...</Text>}
                {!!data && 
                    <>
                    <Text>{data.title}</Text>
                    {!bnprops.completed && 
                        <NodeModal 
                            team={bnprops.teamData}
                            challenge={data}
                            isOpen={isOpen}
                            onCloseWithSubmit={() => {
                                setIsCompleted(true);
                                onClose();
                            }}
                            onCloseWithOutSubmit={onClose}
                        />
                    }
                    </>
                }
            </Box>
        </Link>
    );
}