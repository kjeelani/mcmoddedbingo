export interface ChallengeData {
    challengeID: string,
    title: string,
    instructions: string,
    teamsCompleted: string[]
}

export interface TeamData {
    teamID: string,
    teamName: string,
    players: string[], 
    isFull?: boolean,
    challengesCompleted: number,
    nodes: {
        [challengeID: string]: Node
    }
}

export interface UserData {
    username: string,
    email: string,
    userID: string,
    teamID: string
}

export interface Node {
    challengeID: string,
    completed: boolean,
    data: string 
}

export interface ChallengeSubmission {
    teamData: TeamData,
    challengeID: string,
    submissionImage: Blob
}

export interface Teams {
    teams: TeamData[]
}