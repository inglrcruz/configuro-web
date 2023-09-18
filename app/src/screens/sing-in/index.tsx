import { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { setAuth, setUser } from '../../redux/actions/users'
import { SingInForm, SingInProps } from '../../interfaces/signInInterface';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerTab: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginBottom: 20
    },

    buttonTab: {
        backgroundColor: '#a0b3b0',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 0,
    },

    buttonTabActive: {
        backgroundColor: '#1ab188',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 0,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#e7eaf3"
    },

    inputError: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#b11a1a"
    },

    h1: {
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
        textAlign: "center"
    },

    label: {
        marginTop: 20,
        marginBottom: 3,
        fontSize: 15,
        fontWeight: "bold",
        color: "#333"
    },

    buttonSubmit: {
        backgroundColor: "#1ab188",
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20
    },

    buttonSubmitText: {
        fontSize: 15,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
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
    },

    footer: {
        marginTop: 30,
        fontSize: 13,
        textAlign: "center",
        width: 250,
        paddingBottom: 20,
        alignSelf: "center"
    }

});

const SignInScreen = ({ setAuth, setUser, token, navigation }: SingInProps) => {

    const [tab, setTab] = useState<string>('sign-in')
    const dispatch = useDispatch()
    const [formData, setFormData] = useState<SingInForm>({
        name: "",
        last_name: "",
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState<any>()

    useEffect(() => {
        if (token) {
            navigation.navigate('profile')
            setFormData({
                name: "",
                last_name: "",
                username: "",
                password: ""
            })
        }
    }, [token])

    /**
     * Handles changes in input fields and updates the form data accordingly.
     */
    const handleChange = (value: string, input: string) => {
        setFormData({ ...formData, [input]: value })
    }

    /**
     * Handle authentication form submission.
     */
    const handleSubmit = async () => {
        setErrors({})
        const newErrors: Partial<any> = {}
        const form: any = formData
        const fields = ['username', 'password']
        fields.forEach((field: string) => {
            if (!form[field].trim()) newErrors[field] = true;
        })
        if (!Object.keys(newErrors).length) setAuth(formData, dispatch)
        setErrors(newErrors);
    }

    /**
     * Handle user registration form submission.
     */
    const handleSingUp = async () => {
        setErrors({})
        const newErrors: Partial<any> = {}
        const form: any = formData
        const fields = ['name', 'last_name', 'username', 'password']
        fields.forEach((field: string) => {
            if (!form[field].trim()) newErrors[field] = true;
        })
        if (!Object.keys(newErrors).length) setUser(formData, dispatch)
        setErrors(newErrors);
    }

    return (<>
        <View style={{ flex: 1, backgroundColor: "#eaeaea" }}>
            <View style={[{ flex: 1, flexDirection: 'column', padding: 10 }]}>
                <View style={styles.card}>
                    <View style={styles.containerTab}>
                        <TouchableHighlight
                            style={[styles.buttonTabActive, { borderTopLeftRadius: 10 }]}
                            underlayColor="#ccc" onPress={() => { setTab('sign-in'); setErrors({}) }}>
                            <Text style={styles.buttonText}>Iniciar Sesión</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[((tab === 'sing-up') ? styles.buttonTabActive : styles.buttonTab), { borderTopRightRadius: 10 }]}
                            underlayColor="#ccc" onPress={() => { setTab('sign-up'); setErrors({}) }}>
                            <Text style={styles.buttonText}>Registrarse</Text>
                        </TouchableHighlight>
                    </View>
                    {
                        (tab == "sign-up") && <>
                            <Text style={styles.h1}>Registrarse</Text>
                            <View>
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    style={(errors?.name) ? styles.inputError : styles.input}
                                    placeholder="Escriba el nombre..."
                                    onChangeText={(text) => handleChange(text, 'name')}
                                    value={formData.name}
                                />
                                <Text style={styles.label}>Apellido</Text>
                                <TextInput
                                    style={(errors?.last_name) ? styles.inputError : styles.input}
                                    placeholder="Escriba la apellido..."
                                    secureTextEntry={true}
                                    onChangeText={(text) => handleChange(text, 'last_name')}
                                    value={formData.last_name}
                                />
                                <Text style={styles.label}>Usuario</Text>
                                <TextInput
                                    style={(errors?.username) ? styles.inputError : styles.input}
                                    placeholder="Escriba el nombre de usuario..."
                                    onChangeText={(text) => handleChange(text, 'username')}
                                    value={formData.username}
                                />
                                <Text style={styles.label}>Contraseña</Text>
                                <TextInput
                                    style={(errors?.password) ? styles.inputError : styles.input}
                                    placeholder="Escriba la contraseña..."
                                    secureTextEntry={true}
                                    onChangeText={(text) => handleChange(text, 'password')}
                                    value={formData.password}
                                />
                            </View>
                            <TouchableHighlight underlayColor="transparent" onPress={handleSingUp}>
                                <View style={styles.buttonSubmit}>
                                    <Text style={styles.buttonSubmitText}>Registrarse</Text>
                                </View>
                            </TouchableHighlight>
                        </>
                    }{
                        (tab == "sign-in") && <>
                            <Text style={styles.h1}>Iniciar Sesión</Text>
                            <View>
                                <Text style={styles.label}>Usuario</Text>
                                <TextInput
                                    style={(errors?.username) ? styles.inputError : styles.input}
                                    placeholder="Escriba el nombre de usuario..."
                                    onChangeText={(text) => handleChange(text, 'username')}
                                    value={formData.username}
                                />
                                <Text style={styles.label}>Contraseña</Text>
                                <TextInput
                                    style={(errors?.password) ? styles.inputError : styles.input}
                                    placeholder="Escriba la contraseña..."
                                    secureTextEntry={true}
                                    onChangeText={(text) => handleChange(text, 'password')}
                                    value={formData.password}
                                />
                            </View>
                            <TouchableHighlight underlayColor="transparent" onPress={handleSubmit}>
                                <View style={styles.buttonSubmit}>
                                    <Text style={styles.buttonSubmitText}>Iniciar Sesión</Text>
                                </View>
                            </TouchableHighlight>
                        </>
                    }
                    <Text style={styles.footer}>© Copyright 2023 All rights reserved. Version 1.0</Text>
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
        setAuth: (form: SingInForm) => setAuth(form, dispatch),
        setUser: (form: SingInForm) => setUser(form, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)