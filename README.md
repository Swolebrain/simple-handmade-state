# Simple handmade state

This app shows an example of how you might structure global state with hooks. It uses an example of what global state might look like for a simplified linkedin client.

The essence of it is I create a global context containing a global state shaped like so: 

```
interface GlobalAppState {
    userData: UserData;
    profileAnalytics: ProfileAnalytics;
    messagingState: MessagingState;
    feed: FeedState;
}
```

Then you create individual hooks for each of those pieces: userData, profileAnalytics, messaging, feed. 

Why global state? Well because otherwise you have to be thoughtful of the order in which you nest context providers and you can't really have cyclical dependencies between your various hooks.

I have written apps of over 50k lines in length with this approach and it's quite scalable. You don't need state management libraries.
