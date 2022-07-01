

interface SimpleAuthorIdentity {
    name: string;
    tagLine: String;
    profilePictureUrl: string;
}

interface SimplePost {
    author: SimpleAuthorIdentity;
    timeStamp: number;
    textContent: string;
    reactions: {
        like: number;
        love: number;
        support: number;
        celebrate: number;
        brilliant: number;
    },
}

export type PostComment = SimplePost;

export interface Post extends SimplePost {
    activityContext?: {
        contextType: "commentedOn"|"liked";
        subject: string;
        subjectProfileUrl: string;
    };
    promoted: boolean;
    numComments: number;
    numShares: 3;
    topComments: [];
}

export interface FeedState {
    newPostsAlert: boolean;
    activity: Post[];
}