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
    submissionImage: File
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
