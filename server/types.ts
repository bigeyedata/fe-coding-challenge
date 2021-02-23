export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface Login {
    login_time: string;
    ip_v4: string;
}

export interface UserLogins {
    user_id: number;
    logins: Login[];
}
