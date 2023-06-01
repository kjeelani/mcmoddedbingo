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
import { ChallengeData, TeamData } from "../lib/APIData";
import axios from "axios";
import { useRouter } from "next/router";

export interface NodeModalProps {
	userID: string,
    challenge: ChallengeData,
    team: TeamData,
    isOpen: boolean,
    isSubmitting: boolean,
    isResubmitting: boolean
    onCloseWithSubmit: () => void,
    onCloseWithOutSubmit: () => void
}

//This is the type of the "submission" state
interface SubmissionData {
    image: any,
    text: string
}

export function NodeModal(nmprops: NodeModalProps) {
    const [currentImage, setCurrentImage] = useState<any>(null);
    const [currentText, setCurrentText] = useState("");
    const [submission, setSubmission] = useState<any>(null);
    

    useEffect(() => {
        const submitImage = async () => {
            const formData = new FormData();
            formData.append("teamData", JSON.stringify(nmprops.team));
            formData.append("challengeID", nmprops.challenge.challengeID);
            formData.append("userID", nmprops.userID);
            if (submission.image !== null) {
                formData.append("submissionImage", submission.image);
            }
            formData.append("submissionText", submission.text);


            await axios.post(`api/teams/updateSubmission`, formData, {
                method: "PATCH",
                headers: {
                    "Content-Type": "multipart/form-data"
                }, 
            });
            nmprops.onCloseWithSubmit();
        }
        if (submission === null || 
            (submission.image == null 
                && (submission.text == ""
                || submission.text == "Submit Google Drive link to media alongside any comments"))) {
            return;
        } else {
            submitImage();
        }
    },[submission, nmprops])

    return (
        <Modal size="xl" isOpen={nmprops.isOpen} onClose={nmprops.onCloseWithOutSubmit}>
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
                    {nmprops.challenge.title}
                </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {nmprops.isResubmitting &&
                    <Text color="red.600" mb="1.5vh">
                        Please contact the moderators for questions on
                        why your submission was rejected
                    </Text>
                }
                <Text fontSize="lg" mb = "5vh">
                    {nmprops.challenge.instructions}
                </Text>
                {nmprops.isSubmitting && 
                    <>
                    <Heading 
                        fontSize="md" 
                        mb = "3vh"
                    >
                    Submit Image Directly or Add Google Drive Link
                    </Heading>
                    <Input 
                        border={"transparent"}
                        type="file" 
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => {
                            e.preventDefault();
                            if (e.target.files){
                                setCurrentImage(e.target.files[e.target.files.length - 1]);
                            }
                        }}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    ></Input>
                    <Text color="gray.400" mb="3vh" mt="1vh">
                        Note: Only your last uploaded file will be submitted!
                    </Text>
                    <Textarea 
                        fontSize="sm"
                        placeholder="Submit Google Drive link to media alongside any comments"
                        onChange={(e) => {
                            setCurrentText(e.target.value);
                        }}
                    >
                    </Textarea>
                    </>
                }
            </ModalBody>

            <ModalFooter>
                {nmprops.isSubmitting &&
                    <Button colorScheme='blue' mr={3} onClick={(e) => {
                        e.preventDefault();
                        setSubmission({
                            "image": currentImage,
                            "text": currentText
                        });
                    }}>
                    Submit
                    </Button>
                }
            </ModalFooter>
        </ModalContent>
      </Modal>
    );
}