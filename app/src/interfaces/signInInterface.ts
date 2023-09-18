import { StackNavigationProp } from "@react-navigation/stack";

type ProfileScreenNavigationProp = StackNavigationProp<any, 'Profile'>;

export interface SingInProps {
    token: string;
    setAuth: (form: SingInForm, dispatch: any) => void;
    setUser: (form: SingInForm, dispatch: any) => void;
    navigation: ProfileScreenNavigationProp;
}

export interface SingInForm {
    name?: string;
    last_name?: string;
    username: string;
    password: string;
}

type SignInScreenNavigationProp = StackNavigationProp<any, 'sing-in'>;

export interface ProfileProps {
    token: string;
    setSignOff: (token: string, dispatch: any) => void;
    navigation: SignInScreenNavigationProp;
}