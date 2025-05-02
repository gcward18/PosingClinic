// This file exports TypeScript types and interfaces used throughout the application.
export type Sex = 'Male' | 'Female';

export interface User {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface Judge {
    id: number;
    firstname: string;
    lastname: string;
}

export interface Division {
    id: number;
    name: string;
    sexAllowed: Sex
}

export interface Competitor {
    id: number;
    userId: number;
    height: number;
    weight: number;
    sex: Sex;
}

export interface Competition {
    id: number;
    firstname: string;
    lastname: string;
    dob: string;
}

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
