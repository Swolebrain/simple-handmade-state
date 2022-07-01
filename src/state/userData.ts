import { SimpleLink } from "./index";

export interface UserData {
    name: string;
    tagLine: string;
    pictureUrl: string;
    profileUrl: string;
    profileBannerUrl: string;
    hasPremium: boolean;
    pages: {name: string; pageNotifications: number; iconUrl: string}[],
    recent: {
        summary: SimpleLink[];
        groups: SimpleLink[];
        events: SimpleLink[];
        followedHashTags: SimpleLink[];
    },
}