import { useEffect, useState } from 'react'
import './style.scss'
import Header from '../../components/header'
import Paginator from '../../components/paginator'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUsers, setRemove } from '../../redux/actions/users'
import { momentFormatted } from '../../library/utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmationDialog from '../../components/confirmationDialog'

export interface ListProps {
    list: any;
    token: string;
    getUsers: (token: string, dispatch: any) => void;
    setRemove: (id: number, list: any, token: string, dispatch: any) => void;
}

const List = ({ token, list, getUsers, setRemove }: ListProps) => {

    const [data, setData] = useState<any[]>()
    const [idRemove, setIdRemove] = useState<number>(0)
    const [perPage] = useState<any>([5, 10, 20, 25])
    const [itemsPerPage, setItemsPerPage] = useState<number>(perPage[0])
    const dispatch = useDispatch(), navigate = useNavigate()
    const [isConfirmationVisible, setIsConfirmationVisible] = useState<Boolean>(false)

    useEffect(() => { if (!token) navigate('/') }, [token])
    useEffect(() => { getUsers(token, dispatch) }, [])
    useEffect(() => { setData(list.slice(0, perPage[0])) }, [list])

    // Update the displayed page when the product data or items per page change.
    useEffect(() => {
        handleChangePage(0)
    }, [setData, itemsPerPage])

    /**
     * Handle pagination by updating the displayed data range.
     * @param startIndex 
     * @param endIndex 
     */
    const handleChangePage = (startIndex: number, endIndex: number = itemsPerPage) => {
        setData(list.slice(startIndex, endIndex))
    }

    /**
     * Handle changes in input fields, such as filtering or changing items per page.
     * @param e - React form event.
     */
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { value, name } = e.target
        if (name === "itemsPerPage") {
            // Update the number of items displayed per page.
            setItemsPerPage(parseInt(value))
        } else {
            // Update the filter value and filter the product data.
            const data = ((list) ? list : []).filter((item: any) => {
                return (
                    // Check if either the name or description matches the filter (case-insensitive).
                    (item.name && item.name.toLowerCase().includes(value.toLowerCase())) ||
                    (item.description && item.description.toLowerCase().includes(value.toLowerCase()))
                ) ? true : false
            })
            setData(data.slice(0, itemsPerPage))
        }
    }

    /**
     * Show the confirmation modal and set id 
     * @param id 
     */
    const handleRemove = (id: number) => {
        setIdRemove(id)
        setIsConfirmationVisible(true)
    }

    /**
    * Delete the product by the selected id
    */
    const handleConfirmDialog = () => {
        setIsConfirmationVisible(false)
        setRemove(idRemove, list, token, dispatch)
    }

    /**
     * Hide the confirmation modal
     */
    const handleCancelDialog = () => {
        setIsConfirmationVisible(false)
    }

    return (<>
        <Header />
        <section id="list" className='card'>
            <h2>Lista de usuarios</h2>
            <table id="table-users">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th>Creado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: any) => {
                        return (
                            <tr>
                                <td width={"20%"}>{item.name}</td>
                                <td width={"20%"}>{item.last_name}</td>
                                <td width={"10%"}>{item.username}</td>
                                <td width={"10%"}><span className={(item.active) ? "enabled-text" : "disabled-text"}>{(item.active) ? "Activo" : "Desactivo"}</span></td>
                                <td width={"25%"}>{momentFormatted(item.created_on)}</td>
                                <td width={"5%"}>
                                    <button className="delete-button" onClick={() => handleRemove(item.user_id)} disabled={token === item.token}>
                                        <FontAwesomeIcon icon={faTrash} className="pointer" />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <section className="table-footer">
                <label>{list?.length} Resultados</label>
                <Paginator totalItems={list?.length || 0} itemsPerPage={itemsPerPage} onPageChange={(startIndex, endIndex) => handleChangePage(startIndex, endIndex)} />
                <select name="itemsPerPage" onChange={handleChange}>
                    {perPage.map((val: number, key: number) => <option key={key} value={val}>{val}</option>)}
                </select>
            </section>
        </section>
        {isConfirmationVisible && (<ConfirmationDialog
            title="Eliminar usuario"
            message="¿Estás seguro de que deseas eliminar este usuario?"
            onConfirm={handleConfirmDialog}
            onCancel={handleCancelDialog} />
        )}
    </>)

}

const mapStateToProps = (state: any) => ({
    token: state.users.token,
    list: state.users.list
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        getUsers: (token: string) => getUsers(token, dispatch),
        setRemove: (id: number, list: any, token: string) => setRemove(id, list, token, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)