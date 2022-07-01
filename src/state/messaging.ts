

export interface MessageDraft {
    text: string;
    recipientId: string;
}

export interface ConversationPreview {
    senderProfilePictureUrl: string;
    lastMessageSlug: string;
    receiptTimeStampUTC: number;
}

export interface MessagingState {
    drafts: MessageDraft[];
    conversations: ConversationPreview[];
}