import { useEffect, useState } from 'react'
import './style.scss'
import { connect, useDispatch } from 'react-redux'
import { setAuth, setUser } from '../../redux/actions/users'
import { useNavigate } from 'react-router-dom';
import { SingInForm, SingInProps } from '../../interfaces/signInInterface';

const SignIn = ({ setAuth, setUser, token }: SingInProps) => {

    const [tab, setTab] = useState<string>('sign-in')
    const dispatch = useDispatch(), navigate = useNavigate()
    const [formData, setFormData] = useState<SingInForm>({
        name: "",
        last_name: "",
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState<any>()

    useEffect(() => {
        if (token) navigate('/list')
    }, [token])

    /**
     * Handles changes in input fields and updates the form data accordingly.
     * @param e - React form event.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    /**
     * Handle authentication form submission.
     * 
     * @param e - React form event.
     */
    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
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
     * 
     * @param e - React form event.
     */
    const handleSingUp = async (e: React.FormEvent) => {
        e.preventDefault();
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
        <div id="sign-in">
            <div className="container-sign-in card">
                <div className="container-tabs">
                    <button className={(tab === 'sign-in') ? "tab active" : "tab"} onClick={() => { setTab('sign-in'); setErrors({}) }}>Iniciar Sesión</button>
                    <button className={(tab === 'sign-up') ? "tab active" : "tab"} onClick={() => { setTab('sign-up'); setErrors({}) }}>Registrarse</button>
                </div>
                <div className="content-tab">
                    <div id="sign-in-form" className={(tab === 'sign-in') ? "show" : "hide"}>
                        <h1>Iniciar Sesión</h1>
                        <form>
                            <div className="container-input mb-20">
                                <label className='mb-10'>Usuario <span className="req">*</span></label>
                                <input type="text" className={(errors?.username) ? "form-control form-control-lg required" : "form-control form-control-lg"}
                                    onChange={handleChange} name="username" placeholder='Escriba su nombre de usuario...' />
                            </div>
                            <div className="container-input mb-20">
                                <label className='mb-10'>Contraseña <span className="req">*</span></label>
                                <input type="password" className={(errors?.password) ? "form-control form-control-lg required" : "form-control form-control-lg"}
                                    onChange={handleChange} name="password" placeholder='Escriba su contraseña...' />
                            </div>
                            <button className="button" onClick={handleAuth}>Iniciar Sesión</button>
                        </form>
                    </div>
                    <div id="sign-up" className={(tab === 'sign-up') ? "show" : "hide"}>
                        <h1>Registrarse</h1>
                        <form>
                            <div className="container-input mb-20">
                                <label className='mb-10'>Nombre <span className="req">*</span></label>
                                <input type="text" className={(errors?.name) ? "form-control form-control-lg required" : "form-control form-control-lg"}
                                    onChange={handleChange} name="name" placeholder='Escriba su nombre...' />
                            </div>
                            <div className="container-input mb-20">
                                <label className='mb-10'>Apellido <span className="req">*</span></label>
                                <input type="text" className={(errors?.last_name) ? "form-control form-control-lg required" : "form-control form-control-lg"}
                                    onChange={handleChange} name="last_name" placeholder='Escriba su apellido...' />
                            </div>
                            <div className="container-input mb-20">
                                <label className='mb-10'>Usuario <span className="req">*</span></label>
                                <input type="text" className={(errors?.username) ? "form-control form-control-lg required" : "form-control form-control-lg"}
                                    onChange={handleChange} name="username" placeholder='Escriba su nombre de usuario...' />
                            </div>
                            <div className="container-input mb-20">
                                <label className='mb-10'>Contraseña <span className="req">*</span></label>
                                <input type="password" className={(errors?.password) ? "form-control form-control-lg required" : "form-control form-control-lg"}
                                    onChange={handleChange} name="password" placeholder='Escriba su contraseña...' />
                            </div>
                            <button className="button" onClick={handleSingUp}>Registrarse</button>
                        </form>
                    </div>
                    <p className="footer-sign-in">© Copyright 2023 All rights reserved. Version 1.0</p>
                </div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)