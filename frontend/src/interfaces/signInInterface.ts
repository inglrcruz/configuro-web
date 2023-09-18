export interface SingInProps {
    token: string;
    setAuth: (form: SingInForm, dispatch: any) => void;
    setUser: (form: SingInForm, dispatch: any) => void;
}

export interface SingInForm {
    name?: string;
    last_name?: string;
    username: string;
    password: string;
}