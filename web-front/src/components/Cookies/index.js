import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import axios from 'axios';

import { Link } from 'react-router-dom';
import './styles.css';

const Cookies = (props) => {
    const {
        className,
    } = props;

    const [modal, setModal] = useState(true);

    const toggle = () => setModal(!modal);

    const Confirmar = () => {
        console.log('Confirmação de cookies ativa!!')
        axios.get(process.env.REACT_APP_URL_BASE_API_GET)
            .then(res => {
                if (res.status === 200) {
                    // console.log('Process data...')
                    // console.log(res.data.ip);
                }
                // api.post('/userip', res.data)
                //     .then(response => {
                //         if (response.status === 201) {
                //             console.log(response.status);
                //         }
                //     })
            })

        setModal(!modal);
    }
    const Rejeitar = () => {
        setModal(!modal);
    }

    return (
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Gestão de Cookies</ModalHeader>
            <ModalBody>
                Nós coletamos cookies para oferecer um serviço personalizado. Utilize as opções ao lado para configurar suas preferências quanto à coleta de cookies.
            </ModalBody>
            <ModalFooter>
                <Link to="/Politica" target="_blank" className="Link_Modal">Nossa Política</Link>
                <Button color="primary" onClick={Rejeitar}>Rejeitar Todos</Button>{' '}
                <Button color="primary" onClick={Confirmar}>Aceitar Todos</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Cookies;