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
    Checkbox
} from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

export interface CenteredCardProps {
	children: React.ReactNode;
	title: string
}

export function CenteredCard(ccprops: CenteredCardProps) {
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
                    <CardHeader textAlign={'center'} rounded="sm" bg="pink">
                        <Heading>{ccprops.title}</Heading>
                    </CardHeader>
                    <CardBody>
                        {ccprops.children}
                    </CardBody>
                </Card>
            </Box>
        </Flex>
      );
}