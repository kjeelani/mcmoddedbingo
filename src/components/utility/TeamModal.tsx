import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react'

import { useFetch } from "@/components/lib/AxiosHooks";
import { Box, Text, Button, VStack } from "@chakra-ui/react";

export interface TeamModalProps {
    teamName: string,
    team: string[],
    isOpen: boolean,
    onClose: () => void
}

interface PlayerToNameProp {
    userID: string
}

function PlayerToName(props: PlayerToNameProp) {
    const [data, error, loading, refetch] = useFetch({
        url: `api/users/${props.userID}`
    });

    return (
        <>
        {!!!data && 
        <Box
            _hover={{
                bg: "rgb(247, 250, 252)",
                cursor: "pointer"
            }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            px={5}
            py={1}
            border={"0.5px solid rgb(150, 150, 150)"}
            borderRadius={"10px"}
            w="fit-content"
        >
            ...
        </Box>
        }
        {data && 
        <Box
            _hover={{
                bg: "rgb(247, 250, 252)",
                cursor: "pointer"
            }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            px={5}
            py={1}
            border={"0.5px solid rgb(150, 150, 150)"}
            borderRadius={"10px"}
            w="fit-content"
        >
            {data.username}
        </Box>
        }
        </>
    )
}

export function TeamModal(tmprops: TeamModalProps) {
    return (
        <Modal onClose={tmprops.onClose} size={"xs"} isOpen={tmprops.isOpen}>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px)' 
            />
            <ModalContent>
                <ModalHeader
                    fontSize="2xl" 
                    display={"flex"} 
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Text 
                        display="flex" 
                        bg={"rgb(247, 250, 252)"}
                        border={"1px solid rgb(236, 241, 246)"}
                        w="fit-rounded"
                        px={"10px"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderRadius={"10px"}
                    >
                        {tmprops.teamName}
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <VStack>
                        {tmprops.team.map((player) => {
                            return <PlayerToName userID={player}></PlayerToName>
                        })}
                        </VStack>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={tmprops.onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}