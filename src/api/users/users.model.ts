export interface UserType {
    key?: string;
    first_name: string;
    last_name: string;
    email: string;
    company: string;
}

export interface UserValidationType {
    first_name: boolean;
    last_name: boolean;
    email: boolean;
    company: boolean;
}