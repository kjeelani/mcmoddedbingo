import React, { useEffect, useState } from "react";
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
import { useFetch } from "../lib/AxiosHooks"
import { NodeModal, NodeModalProps } from "./NodeModal"
import { TeamData } from "../lib/APIData";

export interface BingoNodeProps {
    userID: string
	challengeID: string,
    teamData: TeamData,
    status: number,
}

/*
DISCLAIMER!!!!!

Statuses:
0 -> Nothing submitted for this node
1 -> Something submitted, but under review
2 -> Reviewed and accepted
3 -> Reviewed and rejected
*/

export function BingoNode(bnprops: BingoNodeProps) {
    const [ data, error, loading,  refetch] = useFetch({
        url: `api/challenges/${bnprops.challengeID}`,
        manual: true
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setStatus] = useState(bnprops.status);
    const getColorFromStatus = () => {
        switch (status) {
            case 1:
                return "yellow.300";
            case 2:
                return "green.300";
            case 3: 
                return "red.300";
            default:
                return "gray.100";
        }
    }

    useEffect(() => {
        if (!!!data) {
            refetch({
                url: `api/challenges/${bnprops.challengeID}`,
                manual: true
            });
        }
    })

    return (
        <Link onClick={onOpen}>
            <Box p="8" fontSize="lg" bgColor={getColorFromStatus()}>
                {loading && <Text>Loading...</Text>}
                {!!data && 
                    <>
                    <Text>{`${data.title}-${data.difficulty}`}</Text>
                    <NodeModal 
                        userID={bnprops.userID}
                        team={bnprops.teamData}
                        challenge={data}
                        isOpen={isOpen}
                        isSubmitting={(status === 0 || status === 3)}
                        isResubmitting={status == 3}
                        onCloseWithSubmit={() => {
                            setStatus(1);
                            onClose();
                        }}
                        onCloseWithOutSubmit={onClose}
                    />
                    </>
                }
            </Box>
        </Link>
    );
}