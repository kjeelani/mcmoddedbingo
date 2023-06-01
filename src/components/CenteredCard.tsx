import React from "react";
import styles from "./CenteredCard.module.css";
import { 
    useColorModeValue, 
    Flex,
    Card, 
    CardHeader, 
    CardBody, 
    Heading,
    Button,
    FormControl,
    Stack,
    Text,
    Box,
    FormLabel,
    Input,
    Link,
    Checkbox,
    Spacer,
    VStack
} from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export interface CenteredCardProps {
	children: React.ReactNode;
	title: string;
    goBackURL?: string;
    goBackParams?: any
}

export function CenteredCard(ccprops: CenteredCardProps) {
    const router = useRouter();

    return (
            <Card
                mb={"45vh"}
                w={'50vh'}
                boxShadow={'0px 7px 15px black'}
                rounded="25px"
            >
                <CardHeader 
                    textAlign={'center'} 
                    bg="white" 
                    roundedTop="25px" 
                    h="fit-content"
                    overflow={"hidden"}
                >
                    <Flex>
                        {ccprops.goBackURL !== undefined && 
                        <Link 
                        zIndex={10}
                        onClick={() => router.push({
                            pathname: ccprops.goBackURL,
                            query: ccprops.goBackParams
                        })}>
                            <Box
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                position={"absolute"}
                                top={"25px"}
                                left={"30px"}
                                bg="rgb(237, 242, 247)"
                                w="35px"
                                h="35px"
                                rounded="10px"
                                _hover={{
                                    bg: "rgb(217, 222, 227)"
                                }}
                            >
                                <ArrowLeftIcon></ArrowLeftIcon>
                            </Box>
                        </Link>
                        }
                        <Box h="100%" w="100%">
                        <Heading position={"relative"}>
                            {ccprops.title}
                        </Heading>
                        </Box>
                    </Flex>
                </CardHeader>
                <CardBody bg="white" roundedBottom="25px">
                    {ccprops.children}
                </CardBody>
            </Card>
      );
}