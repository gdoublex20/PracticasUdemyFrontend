export interface Usuario {
    id?: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    creationDate: Date | null;
    lastDate: Date | null;
    avatar: string;
    role: string;
}
