import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { setSignOff } from '../../redux/actions/users'
import { Alert, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { ProfileProps } from '../../interfaces/signInInterface';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    h1: {
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
        textAlign: "center"
    },

    buttonSubmit: {
        backgroundColor: "#1ab188",
        padding: 13,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 5
    },

    buttonSubmitText: {
        fontSize: 15,
        color: "white",
        fontWeight: "bold"
    },

    card: {
        margin: 10,
        backgroundColor: "white",
        padding: 20,
        marginTop: 80,
        borderTopWidth: 5,
        borderTopColor: "#1ab188",
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    }

});

const ProfileScreen = ({ setSignOff, token, navigation }: ProfileProps) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (!token) navigation.navigate('sing-in');
    }, [token])

    /**
     * Handle the submission of the logout action.
     */
    const handleSubmit = async () => {
        Alert.alert("Cerrar sesión", "¿Está seguro de que desea cerrar la sesión?", [
            {
                text: 'Aceptar',
                onPress: () => {
                    setSignOff(token, dispatch)
                }
            },
            {
                text: 'Cancelar'
            }
        ], { cancelable: false })
    }

    return (<>
        <View style={{ flex: 1, backgroundColor: "#eaeaea" }}>
            <View style={[{ flex: 1, flexDirection: 'column', padding: 10 }]}>
                <View style={styles.card}>
                    <Text style={styles.h1}>Bienvenido</Text>
                    <View style={{ alignItems: 'center', marginTop: 25 }}>
                        <TouchableHighlight underlayColor="transparent" onPress={handleSubmit}>
                            <View style={styles.buttonSubmit}>
                                <Text style={styles.buttonSubmitText}>Cerrar Sesión</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    </>)
}

const mapStateToProps = (state: any) => ({
    token: state.users.token
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        setSignOff: (token: string) => setSignOff(token, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)