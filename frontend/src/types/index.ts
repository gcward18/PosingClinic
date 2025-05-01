// This file exports TypeScript types and interfaces used throughout the application.

export interface Critique {
    id: string;
    coachName: string;
    reviewDate: string;
    content: string;
    mediaType: 'photo' | 'video';
    mediaUrl: string;
}

export interface UploadFile {
    file: File;
    previewUrl: string;
}

export interface Coach {
    id: string;
    name: string;
    expertise: string;
}