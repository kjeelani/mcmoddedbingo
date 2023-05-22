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
    Spacer
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
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          >
            <Box
                rounded={'lg'}
                bg={'white'}
                w={'50vh'}
                boxShadow={'lg'}
            >
                <Card>
                    <CardHeader textAlign={'center'} rounded="sm" bg="teal.300">
                        <Flex>
                            {ccprops.goBackURL !== undefined && 
                            <Link onClick={() => router.push({
                                pathname: ccprops.goBackURL,
                                query: ccprops.goBackParams
                            })}>
                                <ArrowLeftIcon></ArrowLeftIcon>
                            </Link>
                            }
                            <Spacer></Spacer>
                            <Heading>{ccprops.title}</Heading>
                            <Spacer></Spacer>
                            <Text style={{display: "none"}}>.</Text>
                        </Flex>
                    </CardHeader>
                    <CardBody bg="blue.200">
                        {ccprops.children}
                    </CardBody>
                </Card>
            </Box>
        </Flex>
      );
}