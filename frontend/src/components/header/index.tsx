import './style.scss'
import { connect, useDispatch } from 'react-redux'
import { setSignOff } from '../../redux/actions/users'
import ConfirmationDialog from '../confirmationDialog';
import { useState } from 'react';

export interface HaderProps {
    token: string;
    setSignOff: (token: string, dispatch: any) => void;
}

export const Header = ({ setSignOff, token }: HaderProps) => {

    const dispatch = useDispatch()
    const [isConfirmationVisible, setIsConfirmationVisible] = useState<Boolean>(false)

    /**
     * Show the confirmation modal
     */
    const handleSignOff = async () => {
        setIsConfirmationVisible(true)
    }

    /**
    * Delete the product by the selected id
    */
    const handleConfirmDialog = () => {
        setIsConfirmationVisible(false)
        setSignOff(token, dispatch)
    }

    /**
     * Hide the confirmation modal
     */
    const handleCancelDialog = () => {
        setIsConfirmationVisible(false)
    }

    return (
        <>
            <header id="header">
                <section id="header-container">
                    <div id="header-logo">
                        <strong>Bienvenido</strong>
                    </div>
                    <nav id="header-nav">
                        <ul>
                            <li className="active"><span>Usuarios</span></li>
                            <li onClick={handleSignOff}><span>Cerrar Sesión</span></li>
                        </ul>
                    </nav>
                </section>
            </header>
            {isConfirmationVisible && (<ConfirmationDialog
                title="Cerrar sesión"
                message="¿Está seguro de que desea cerrar la sesión?"
                onConfirm={handleConfirmDialog}
                onCancel={handleCancelDialog} />
            )}
        </>
    );
}

const mapStateToProps = (state: any) => ({
    token: state.users.token
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        setSignOff: (token: string) => setSignOff(token, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)