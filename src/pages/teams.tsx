/* 
    TODO 
        Fix teams scoll behavior
        Finish implementing teams CSS
        Connect Firebase database
*/

import { useCallback, useEffect, useState, ReactNode, useRef } from 'react';
import getAllTeamsFromDB from "./api/getAllTeams.js"


interface TeamObject {
    children?: ReactNode,
    num?: number,
}

interface Children {
    children?: ReactNode
}


interface TeamJSON {
    teamID: string,
    teamName: string,
    players: string[], 
    isFull: boolean,
    challengesCompleted: number,
    nodes: {
        [challengeID: string]: Node
    }
}

function Team({ children, num }: TeamObject) {
    //let self: HTMLDivElement = document.querySelector(`.teams-item .n${num}`)!
    /*
    self.onclick = useCallback(async (ev) => {
        let allTeamItems = document.querySelectorAll(".teams-items")
    } ,[])
    */
    return (
        <div className={`teams-item n${num}`}>
            {children}
        </div>
    )
}

function getTeams(): TeamJSON[] {
    let teamArray: TeamJSON[] = []
    let amt: number[] = [1, 2, 3, 4, 5]

    amt.forEach((element: number) => {
        teamArray.push({
            teamID: `${element}`,
            teamName: `team-${element}`,
            players: [
                "Samarth",
                "Kaif",
                "Aditya"
            ],
            isFull: element % 2 ? true : false,
            challengesCompleted: element
        } as TeamJSON)
    })

    return teamArray;
}


/*getAllTeamsFromDB().map((team) => {
                    <div className='teams-item'>{team.teamName}</div>
                })*/

export default function Teams() {
    return (
        <div className="App">
            <div className='teams-box'>
                {getTeams().map((json) => 
                    <Team 
                        num={json.challengesCompleted}
                    >{json.players}</Team>
                )}
            </div>
        </div>
    )   
}