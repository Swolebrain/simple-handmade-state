import React, { createContext } from "react";
import {UserData} from "./userData";
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

const appContext = createContext<AppContext|null>(null);

export function AppContextProvider({children}: {children: React.ReactNode}) {

}
