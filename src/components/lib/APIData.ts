export interface ChallengeData {
    challengeID: string,
    title: string,
    instructions: string,
    difficulty: number,
    teamsCompleted: string[]
}

export interface TeamData {
    teamID: string,
    teamName: string,
    password: string,
    players: string[],
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
    order?: number
    status: number,
    data: string 
}

export interface ChallengeSubmission {
    userID: string,
    teamData: TeamData,
    challengeID: string,
    submissionImage: File,
    submissionText: string
}

export interface SubmissionData {
    userID: string,
    teamID: string,
    teamName: string,
    challengeID: string,
    submissionText: string,
    submissionImage: string,
    time: any
}

export interface Teams {
    teams: TeamData[]
}

export const hashCode = (s: string) => {
    var h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
};
