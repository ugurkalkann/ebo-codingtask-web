export interface User{
    UserID?: number;
    Username?: string;
    Password?: string;
}

export interface AuthResponse{
    IsSuccessful: boolean;
    Message: string;
    AuthToken: string;
    UserInfo: User;
}