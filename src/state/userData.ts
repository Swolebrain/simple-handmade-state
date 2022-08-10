import { SimpleLink } from "./index";
import {resolveWithFakeDelay} from "../junkHelpers";

export interface UserData {
    name: string;
    tagLine: string;
    pictureUrl: string;
    profileUrl: string;
    profileBannerUrl: string;
    hasPremium: boolean;
    pages: {name: string; pageNotifications: number; iconUrl: string}[];
    recent: {
        summary: SimpleLink[];
        groups: SimpleLink[];
        events: SimpleLink[];
        followedHashTags: SimpleLink[];
    };
    loading: boolean;
}

export function followNewHashTag(hashtagId: string): Promise<SimpleLink> {
    return resolveWithFakeDelay({
        label: `label${hashtagId}`,
        icon: `icon${hashtagId}`,
        url: `url-${hashtagId}`
    });
}