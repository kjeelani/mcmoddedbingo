//Need to take any new files uploaded by the team and upload them to storage, saving reference in DB
import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import {db, storage} from '../../../firebase.js';
import { TeamData, ChallengeData, SubmissionData, Node } from '@/components/APIData';
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

async function updateSubmissionsDB(submissionData: SubmissionData) {
    await setDoc(
        doc(
            db, 
            "Submissions", 
            `${submissionData.userID}-${submissionData.challengeID}-${Math.floor(Math.random()*1000)}`
        ), 
        submissionData
    );
}

async function updateSubmission(
        team: TeamData, 
        challengeID: string, 
        userID: string,
        submissionText: string, 
        files: any
    ) {
    /*
        Uploads image submission to server and updates database with saved image
    */
    const challengeToUpdate : Node = team.nodes[challengeID];
    challengeToUpdate.status = 1;

    //Has an Image been submitted
    let filepath = "";
    if (files.hasOwnProperty("submissionImage")) {
        filepath = `${team.teamName}/${challengeID}.${files.submissionImage.path.split('.')[1]}`;
        const imageRef = ref(storage, filepath);
        await uploadBytes(imageRef, readFileSync(files.submissionImage.path));
        challengeToUpdate.data = "F+" + filepath;
    } else {
        challengeToUpdate.data = "S+" + submissionText;
    }
    await updateChallengeWithSubmission(challengeID, team.teamID);
    await updateSubmissionsDB({
        "userID": userID,
        "teamID": team.teamID,
        "teamName": team.teamName,
        "challengeID": challengeID,
        "submissionText": submissionText,
        "submissionImage": filepath,
        "time": Timestamp.fromDate(new Date())
    });
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
            await updateSubmission(
                JSON.parse(data.fields.teamData), 
                data.fields.challengeID, 
                data.fields.userID,
                data.fields.submissionText, 
                data.files
            ); 
            res.status(200);
        } catch(error) {
            console.log(error)
            res.status(400);
        }
    } else {
        res.status(404);
    }
    res.end();
}