import React, { useState, useEffect } from "react";
import { 
    Flex,
    Heading,
    Spacer,
    Text,
    Textarea ,
    Input,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'

export interface TeamPasswordModalProps {
    password: string,
    isOpen: boolean,
    onCloseWithSubmit: () => void,
    onCloseWithOutSubmit: () => void
}

//This is the type of the "submission" state
interface SubmissionData {
    image: any,
    text: string
}

export function TeamPasswordModal(nmprops: TeamPasswordModalProps) {
    const [errorText, setErrorText] = useState("");
    const [input, setInput] = useState("");
    const [finalInput, setFinalInput] = useState("");

    useEffect(() => {
        if (finalInput !== "") {
            nmprops.onCloseWithSubmit();
        }
    }, [finalInput, nmprops])

    useEffect(() => {}, [errorText])

    return (
        <Modal isOpen={nmprops.isOpen} onClose={nmprops.onCloseWithOutSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex 
                bgColor='gray.100'
                rounded='md'
                mb=".5vh"
                p={3} 
                minWidth='max-content' 
                alignItems='center' 
                gap='2'
            >
                <Text width="10vh" fontSize='l'>Enter Password: </Text>
                <Input 
                    fontSize='l' 
                    value={input} 
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                >
                </Input>
                <Spacer />
            </Flex>
            <Text color="red.800">{errorText}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' 
                    mr={3} 
                    onClick={(e) => {
                        e.preventDefault();
                        if (input !== nmprops.password) {
                            setErrorText("Incorrect Passcode")
                        } else {
                            setFinalInput(input);
                        }
                    }}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}