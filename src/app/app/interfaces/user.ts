export interface User {
    id?: number;
    name?: string;
    email: string;
    cpf?: string;
    pwd?: string;
}

export interface NewUser extends User {
    confirmPwd?: string;
}

export interface LoginUser extends User {
    token?: string;
}

