import { Link } from 'react-router-dom';
import './style.scss'

const SignIn = () => {

    return (<>
        <section id="sign-in">
            <div className="sign-in-container">
                <form className="sign-in-form">
                    <h1>Login</h1>
                    <div className="input-group mb-10">
                        <label>Username</label>
                        <input type="text" id="username" name="username" className="form-control form-control-lg" required />
                    </div>
                    <div className="input-group mb-10">
                        <label>Password</label>
                        <input type="password" id="password" name="password" className="form-control form-control-lg" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </section>
    </>)

}

export default SignIn