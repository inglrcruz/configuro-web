import { changeStage } from '../slices/users';
import { get, post, remove } from '../../library/requests';
import { Alert } from 'react-native';

export const configDialogDefault = {
    title: "Lo Sentimos, Ha Ocurrido un Problema",
    message: "Lo sentimos, ha ocurrido un error interno. Por favor, inténtalo de nuevo más tarde o ponte en contacto con el soporte técnico si el problema persiste."
}

/**
 * Authenticate a user.
 * 
 * @param form - User authentication form data.
 * @param dispatch - Redux dispatch function.
 * @returns {Promise<void>}
 */
export const setAuth = async (form: any, dispatch: any) => {
    try {
        dispatch(changeStage({ loading: true }));
        const resp = await post(`sign-in`, form);
        const { token } = resp.data;
        dispatch(changeStage({ token }));
    } catch (error: any) {
        if (error.response.status === 404) {
            Alert.alert("Error de autenticación", "Nombre de usuario o contraseña incorrecta", [{ text: "Aceptar" }], { cancelable: false });
        } else if (error.response.status === 403) {
            Alert.alert("Error de autenticación", "Esta cuenta ha sido desactivada.", [{ text: "Aceptar" }], { cancelable: false });
        }
    } finally {
        dispatch(changeStage({ loading: false }));
    }
}

/**
 * Register a new user.
 * 
 * @param form - User registration form data.
 * @param dispatch - Redux dispatch function.
 * @returns {Promise<void>}
 */
export const setUser = async (form: any, dispatch: any) => {
    try {
        dispatch(changeStage({ loading: true }));
        const resp = await post(`users`, form);
        const { token } = resp.data;
        dispatch(changeStage({ token }));
    } catch (error: any) {
        let errorText;
        if (error.response.status === 404) {
            errorText = {
                title: "Registration Error",
                message: "The username is already in use."
            };
        }
        setDialogConfig(errorText, dispatch);
    } finally {
        dispatch(changeStage({ loading: false }));
    }
}

/**
 * Sign off and log out the user.
 * 
 * @param token - User authentication token.
 * @param dispatch - Redux dispatch function.
 */
export const setSignOff = async (token: string, dispatch: any) => {
    try {
        dispatch(changeStage({ loading: true }));
        const resp = await post(`sign-off`, {}, token);
        dispatch(changeStage({ token: null }));
    } catch (error: any) {
        setDialogConfig(configDialogDefault, dispatch);
    } finally {
        dispatch(changeStage({ loading: false }));
    }
}

/**
 * Get a list of users.
 * 
 * @param token - User authentication token.
 * @param dispatch - Redux dispatch function.
 */
export const getUsers = async (token: string, dispatch: any) => {
    try {
        dispatch(changeStage({ loading: true }));
        const resp = await get(`users`, token);
        dispatch(changeStage({ list: resp.data.reverse() }));
    } catch (error: any) {
        setDialogConfig(configDialogDefault, dispatch);
    } finally {
        dispatch(changeStage({ loading: false }));
    }
}

/**
 * Remove a user from the list.
 * 
 * @param id - User ID to be removed.
 * @param list - List of users.
 * @param token - User authentication token.
 * @param dispatch - Redux dispatch function.
 */
export const setRemove = async (id: number, list: any, token: string, dispatch: any) => {
    try {
        dispatch(changeStage({ loading: true }));
        await remove(`users/${id}`, token);
        dispatch(changeStage({ list: list.filter((item: any) => item.user_id !== id) }));
    } catch (error: any) {
        setDialogConfig(configDialogDefault, dispatch);
    } finally {
        dispatch(changeStage({ loading: false }));
    }
}

/**
 * Sets the dialog configuration in the application state.
 * @param {*} config 
 * @param {*} dispatch 
 */
export const setDialogConfig = (config: any, dispatch: any) => {
    ///dispatch(changeStage({ dialogConfig: config }));
}
