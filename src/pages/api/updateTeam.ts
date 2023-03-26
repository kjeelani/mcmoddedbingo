//Need to take any new files uploaded by the team and upload them to storage, saving reference in DB
import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, setDoc } from "firebase/firestore";
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

interface Node {
    challengeID: string,
    completed: boolean,
    data: string 
}

interface UpdatedTeamData {
    teamData: TeamData,
    challengeID: string,
    submissionImage: Blob
}

async function updateTeam(teamToUpdate: UpdatedTeamData) {
    /*
        Uploads image submission to server and updates database with saved image
    */
    const challengeToUpdate = teamToUpdate.teamData.nodes[teamToUpdate.challengeID]
    const filepath = `images/${teamToUpdate.challengeID}`;
    const imageRef = ref(storage, filepath);
    challengeToUpdate.data = filepath;

    //TODO: Test this function to see if Firebase Storage Updates
    await uploadBytes(imageRef, teamToUpdate.submissionImage);
    await setDoc(doc(db, "Teams", teamToUpdate.teamData.teamID.toString()), teamToUpdate);
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            await updateTeam(req.body); 
            res.status(200);
        } catch(error) {
            res.status(404);
        }
    } else {
        res.status(400);
    }
    res.end();
}