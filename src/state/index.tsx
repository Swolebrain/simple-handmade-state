import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {followNewHashTag, UserData} from "./userData";
import {ProfileAnalytics} from "./profileAnalytics";
import {MessagingState} from "./messaging";
import {FeedState} from "./feed";

export interface SimpleLink {
    icon: string,
    label: string,
    url: string,
}

// important to not export this, stuffing everything in here is a matter of convenience and using a single context,
// coding with this global state object would be very nasty
interface GlobalAppState {
    userData: UserData;
    profileAnalytics: ProfileAnalytics;
    messagingState: MessagingState;
    feed: FeedState;
}

type AppContext = [
    GlobalAppState,
    React.Dispatch<React.SetStateAction<GlobalAppState>>
]

function getInitialState(){
    return {
        userData: {
            name: "",
            tagLine: "",
            pictureUrl: "",
            profileUrl: "",
            profileBannerUrl: "",
            hasPremium: false,
            pages: [],
            recent: {
                summary: [],
                groups: [],
                events: [],
                followedHashTags: [],
            },
            loading: true,
        },
        profileAnalytics: {
            loading: true,
            profileViews: 0,
            postImpressions: 0,
        },
        messagingState: {
            loading: true,
            drafts: [],
            conversations: [],
        },
        feed: {
            loading: true,
            newPostsAlert: false,
            activity: [],
        }
    }
}

export const appContext = createContext<AppContext>([getInitialState(), value => {}]);

export function AppContextProvider({children}: {children: React.ReactNode}) {
    const [globalState, setGlobalState] = useState<GlobalAppState>(getInitialState);

    const context = useMemo<AppContext>(
        () => [globalState, setGlobalState],
        [globalState]
    );

    return <appContext.Provider value={context}>{children}</appContext.Provider>
}


export function useUserData() {
    const [globalState, setGlobalState] = useContext(appContext);
    return {
        userData: globalState.userData,
        setUserData(userData: UserData) {
            setGlobalState((oldState) => ({
                ...oldState,
                userData
            }));
        },
        setLoading(newLoadingValue: boolean){
            setGlobalState((oldState) => ({
                ...oldState,
                userData: {
                    ...oldState.userData,
                    loading: newLoadingValue
                }
            }));
        },
        async addFollowedHashtags(hashtagId: string) {
            const newFollowedHashtag = await followNewHashTag(hashtagId);
            setGlobalState((oldState) => ({
                ...oldState,
                userData: {
                    ...oldState.userData,
                    recent: {
                        ...oldState.userData.recent,
                        followedHashTags: [
                            newFollowedHashtag,
                            ...oldState.userData.recent.followedHashTags,
                        ]
                    }
                }
            }));
        }
    };
}

export function useMessagingState() {
    const [globalState, setGlobalState] = useContext(appContext);
    return {
        messagingState: globalState.messagingState,
    };
}

export function useProfileAnalytics() {
    const [globalState, setGlobalState] = useContext(appContext);
    return {
        profileAnalytics: globalState.profileAnalytics,
    };
}

export function useFeedState(){
    const [globalState, setGlobalState] = useContext(appContext);
    return {
        feedState: globalState.feed,

    };
}

export function useFeed(){
    const [feedState, setFeedState] = useState({
        loading: true,
        error: null,
        feed: []
    });
    useEffect(() => {
        fetch('/api/feed')
            .then(res => res.json())
            .then(feedArray => {
                setFeedState(() => ({
                    loading: false,
                    error: null,
                    feed: feedArray
                }));
            })
            .catch(error => setFeedState((prevState) => ({
                ...prevState,
                error
            })));
    });
    return feedState;
}


