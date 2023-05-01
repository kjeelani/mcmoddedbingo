//Need to take any new files uploaded by the team and upload them to storage, saving reference in DB
import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import {db, storage} from '../firebase.js';

interface TeamData {
    teamID: string,
    teamName: string,
    players: string[], 
    isFull: boolean,
    challengesCompleted: number,
    nodes: {
        [challengeID: string]: Node
    }
}

interface ChallengeData {
    challengeID: string,
    title: string,
    instructions: string,
    teamsCompleted: string[]
}


interface Node {
    challengeID: string,
    completed: boolean,
    data: string 
}

interface ChallengeSubmission {
    teamData: TeamData,
    challengeID: string,
    submissionImage: Blob
}

async function updateChallengeWithSubmission(chalID: string, teamID: string) {
    const docRef = doc(db, "Challenges", chalID);
    const docSnap = await getDoc(docRef);    
    const challengeToUpdate : ChallengeData | null = docSnap.data() as ChallengeData;
    
    if (challengeToUpdate === null) {
        return ;
    } else {
        challengeToUpdate.teamsCompleted.push(teamID);
        await setDoc(doc(db, "Challenges", chalID), challengeToUpdate);
    }
}

async function updateSubmission(teamToUpdate: ChallengeSubmission) {
    /*
        Uploads image submission to server and updates database with saved image
    */
    const team : TeamData = teamToUpdate.teamData;
    const challengeToUpdate : Node = team.nodes[teamToUpdate.challengeID];
    challengeToUpdate.completed = true;
    const filepath = `images/${team.teamName}-${teamToUpdate.challengeID}`;
    const imageRef = ref(storage, filepath);
    challengeToUpdate.data = filepath;
    await updateChallengeWithSubmission(teamToUpdate.challengeID, team.teamID);

    //TODO: Test this function to see if Firebase Storage Updates
    await uploadBytes(imageRef, teamToUpdate.submissionImage);
    await setDoc(doc(db, "Teams", team.teamID.toString()), team);
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            await updateSubmission(req.body); 
            res.status(200);
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}