//Need to take any new files uploaded by the team and upload them to storage, saving reference in DB
import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import {db, storage} from '../../firebase.js';
import { TeamData, ChallengeData, ChallengeSubmission, Node } from '@/components/APIData';
import { readFileSync } from "node:fs";
import formidable from 'formidable-serverless'

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

async function updateSubmission(team: TeamData, challengeID: string, submissionImage: any) {
    /*
        Uploads image submission to server and updates database with saved image
    */
    const challengeToUpdate : Node = team.nodes[challengeID];
    challengeToUpdate.completed = true;
    const filepath = `${team.teamName}/${challengeID}.${submissionImage.path.split('.')[1]}`;
    const imageRef = ref(storage, filepath);
    challengeToUpdate.data = filepath;
    await updateChallengeWithSubmission(challengeID, team.teamID);

    //TODO: Test this function to see if Firebase Storage Updates
    await uploadBytes(imageRef, readFileSync(submissionImage.path));
    await setDoc(doc(db, "Teams", team.teamID.toString()), team);
}

export const config = {
    api: {
      bodyParser: false,
    },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method == "PATCH" || req.method == "POST") {
        try {
            const data: any = await new Promise((resolve, reject) => {
                const form = new formidable.IncomingForm()
                form.keepExtensions = true;
                form.parse(req, (err: any, fields: any, files: any) => {
                  if (err) reject({ err })
                  resolve({ err, fields, files })
                }) 
            });
            console.log(data);
            await updateSubmission(JSON.parse(data.fields.teamData), data.fields.challengeID, data.files.submissionImage); 
            res.status(200);
        } catch(error) {
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}