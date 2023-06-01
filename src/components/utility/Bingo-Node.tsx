import React, { useEffect, useState } from "react";
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    useDisclosure,
    Link
} from '@chakra-ui/react';

import { useFetch } from "../lib/AxiosHooks"
import { NodeModal, NodeModalProps } from "./NodeModal"
import { TeamData } from "../lib/APIData";

export interface BingoNodeProps {
    userID: string
	challengeID: string,
    teamData: TeamData,
    status: number,
}

function IMAGE(difficulty: number) {
    switch(difficulty) {
        case 1:
            return "/chicken_1.png";
        case 2:
            return "/zombie_2.jpg";
        case 3:
            return "/wither_skeleton_3.jpg";
        case 4:
            return "/ender_dragon_4.png";
    }
}

export function BingoNode(bnprops: BingoNodeProps) {
    const [data, error, loading,  refetch] = useFetch({
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
                return "white";
        }
    }

    function truncate(teamName: string) {
        if(teamName.length > 24) {
            return teamName.substring(0, 18) + "...";
        }
        return teamName;
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
        <Link onClick={onOpen} _hover={{textDecoration: "none"}}>
        {loading && <Text>Loading...</Text>}
        {!!data && 
            <>
        <Center py={5} position={"relative"} zIndex={1}>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                role={'group'}
                p={6}
                w={'full'}
                bg={getColorFromStatus()}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={2}
            >
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'30px'}
                    transition={"0.2s ease-in-out"}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: '82px',
                        h: '60px',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${IMAGE(data.difficulty)})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        transform: "scale(1.1)",
                        _after: {
                            filter: 'blur(20px)'
                        },
                    }}
                >
                    <Image
                        rounded={'lg'}
                        height={"60px"}
                        width={"70px"}
                        src={IMAGE(data.difficulty)}
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Text fontSize={'sm'}>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            position={"relative"}
                            w="30px"
                            h="30px"
                            bg={"rgb(224, 130, 173)"}
                            borderRadius="7px"
                            zIndex={"5"}
                        >
                            <Text zIndex={2}>{data.difficulty}</Text>
                        </Box>
                    </Text>
                    <Heading fontSize={'sm'} fontFamily={'body'} fontWeight={500}>
                        {truncate(data.title)}
                    </Heading>
                </Stack>
            </Box>
        </Center>
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
        </Link>
    );
}