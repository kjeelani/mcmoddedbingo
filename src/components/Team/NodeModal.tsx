import React, { useState, useEffect } from "react";
import { 
    Flex,
    Heading,
    Spacer,
    Text,
    Box,
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
import { ChallengeData, TeamData } from "../APIData";
import axios from "axios";

export interface NodeModalProps {
	challenge: ChallengeData,
    team: TeamData,
    isOpen: boolean,
    onCloseWithSubmit: () => void,
    onCloseWithOutSubmit: () => void
}

export function NodeModal(nmprops: NodeModalProps) {
    const [currentImage, setCurrentImage] = useState<any>(null);
    const [finalImage, setFinalImage] = useState<any>(null);
    

    useEffect(() => {
        const submitImage = async () => {
            const formData = new FormData();
            formData.append("teamData", JSON.stringify(nmprops.team));
            formData.append("challengeID", nmprops.challenge.challengeID);
            formData.append("submissionImage", finalImage);

            await axios.post(`api/teams/updateSubmission`, formData, {
                method: "PATCH",
                headers: {
                    "Content-Type": "multipart/form-data"
                }, 
            });
            nmprops.onCloseWithSubmit();
        }
        if (finalImage === null) {
            return;
        } else {
            submitImage();
        }
    },[finalImage, nmprops])

    return (
        <Modal isOpen={nmprops.isOpen} onClose={nmprops.onCloseWithOutSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{nmprops.challenge.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" mb = "3vh">
                {nmprops.challenge.instructions}
            </Text>
            <Text color="gray.400" mb = "3vh">
                Warning: Only your last uploaded file will be submitted!
            </Text>
            <input 
                type="file" 
                accept=".png,.jpg,.jpeg,.mov,.gif,.mp4"
                onChange={(e) => {
                    e.preventDefault();
                    if (e.target.files){
                        setCurrentImage(e.target.files[e.target.files.length - 1]);
                    }
                }}
            ></input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={(e) => {
                e.preventDefault();
                setFinalImage(currentImage);
            }}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}