import React, { useState } from "react";

import { Link } from 'react-router-dom';
import { Checkbox } from "antd";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

import api from '../../services/api.js';

import MascaraTelefone from 'react-text-mask';
import categoria from './categoria.json';
import './formulario.css';

const PopUps = require('../../utils/PopUps.js');

const Formulario = (props) => {
    const [Nome, setNome] = useState('');
    const [Instrumento, setInstrumento] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [Email, setEmail] = useState('');
    const [Descricao, setDescricao] = useState('');
    const [concordo, setConcordo] = useState(false);
    const [character, setCharacter] = useState('');

    const setTextLimitation = text => {
        text.length > props.limite ?
            setCharacter(text.slice(0, props.limite)) : setCharacter(text)
    }

    function resetOption() {
        document.getElementById("checkbox").click();
    }

    function disableSendButton() {
        document.getElementById("button-send").disabled = true;
    }

    function limparCampos() {
        setNome('')
        setEmail('')
        setTelefone('')
        setInstrumento('')
        setDescricao('')
        setCharacter('')
        setConcordo(false)
        resetOption()

    }

    const verificaCheckbox = () => {
        setConcordo(!concordo)
    }

    const enableDisableButton = () => {
        document.getElementById("button-send").disabled = false;
    }

    //HANDLE SUBMIT POST API
    async function handleSendForm(e) {
        // função que trata o nome que vem com assentos para inserir no banco de dados
        // console.log(RetiraAssentos(Nome))
        e.preventDefault()

        if(Instrumento === '' || Instrumento === 'Selecione um instrumento' || Descricao === ''
            || Telefone === '' || Email === '' || Nome === ''){
            PopUps.campoObtigatorio()
            return
        }
        // let formdata = new FormData()
        // removi o Instrumento temporariamente para poder fazer post adequado
        // let tabem removido o  instrumento...
        if (Nome && Email && Telefone && Instrumento && Descricao) {
            let formdata = { Nome, Email, Telefone, Instrumento, Descricao }

            if (!concordo) {
                PopUps.confirmationCheckbox()
                return
            } else {
                disableSendButton()

                try {
                    api.post('/inscricao/pagamento', formdata)
                        .then(async response => {
                            console.log(response.data);
                            PopUps.confirmationPaymantPix(response.data.imagemQrcode, response.data.qrcode, formdata);
                            limparCampos()
                            enableDisableButton()
                        })
                        .catch(error => {
                            console.log(JSON.stringify(error.message))
                            if (JSON.stringify(error.message).includes('413')) {
                                PopUps.confirmationTamanho()
                            }
                            if (JSON.stringify(error.message).includes('415')) {
                                PopUps.confirmationExtensao()
                            }
                            
                            enableDisableButton()
                        })

                } catch (error) {
                    PopUps.confirmationServerError()
                    enableDisableButton()
                }
            }
        }
    }

    return (
        <Container className="div-main" id="steps-form">
            <Col className="cabecalho-form">
                <h1 className="cadastrese">Cadastre aqui!</h1>
                <p>Campo obrigatório ( * )</p>
            </Col>
            <Row className="tres-divs">
                <Col sm="4" className="div-esq div-lateral">
                    <div className="ponto-um">
                        <div className="ponto-esquerda"></div>
                    </div>
                </Col>

                <Col xs="6" sm="4" className="conteudo-formulario" >
                    <Form className="formulario" onSubmit={handleSendForm} encType="multipart/form-data">

                        <FormGroup>
                            <Label className="label-form" for="nome">Nome Completo*</Label>
                            <Input className="categoria principal" type="text"
                                name="nome" id="nome" 
                                maxLength={100}
                                value={Nome}
                                onChange={e => setNome(e.target.value)} />
                        </FormGroup>

                        {/* EMAIL */}
                        <FormGroup>
                            <Label className="label-form" for="email">Email*</Label>
                            <Input className="categoria principal" type="email" name="email"
                                id="email"
                                value={Email}
                                onChange={e => { 
                                    setEmail(e.target.value.replace(/[^a-z0-9@._-]/g, ''));
                                    }} />
                        </FormGroup>
                        {/* TELEFONE */}
                        <FormGroup>
                            <div className="mascara-cell">
                                <Label className="label-form" for="nome">Telefone*</Label>
                                <MascaraTelefone type="text" className="form-control"
                                    mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    placeholder="(99) 99999-9999"
                                    guide={false}
                                    value={Telefone}
                                    onChange={e => setTelefone(e.target.value)}
                                >
                                </MascaraTelefone>
                            </div>
                        </FormGroup>
                        {/* INSTRUMENTO */}
                        <FormGroup>
                            <Label className="label-form" for="empresa">Instrumento*</Label>
                            {categoria.map((x, y) => {
                            return(
                            <Input key={y} className="categoria_principal"
                                type="select" 
                                name="empresa" 
                                id="telefone"
                                value={Instrumento}
                                onChange={e => setInstrumento(e.target.value)}>
                                    <option placeholder="Selecione um instrumento">Selecione um instrumento</option>
                                    <option>{x.UM}</option>
                                    <option>{x.DOIS}</option>
                                    <option>{x.TRES}</option>
                                    <option>{x.QUATRO}</option>
                                    <option>{x.CINCO}</option>
                                    <option>{x.SEIS}</option>
                                    <option>{x.SETE}</option>
                                    <option>{x.OITO}</option>
                                    <option>{x.NOVE}</option>
                                    <option>{x.DEZ}</option>
                                    <option>{x.ONZE}</option>
                                </Input>
                                )
                            })}
                        </FormGroup> 

                        {/* TEXTAREA */}
                        <FormGroup>
                            <Label className="label-form" for="textarea">Breve descrição*</Label>
                            <Input type="textarea" name="descricao" id="textarea"
                                placeholder="Conte-nos um pouco sobre seu gosto musical"
                                maxLength={props.limite}
                                value={Descricao}
                                onChange={e => { setTextLimitation(e.target.value); setDescricao(e.target.value) }} />
                            <p className="text-limite">{character.length}/{props.limite}</p>
                            </FormGroup>

                        {/* CHECKBOX */}
                        <div className="div-concordo">
                            <Checkbox onClick={verificaCheckbox} className="concordo " type="checkbox" id="checkbox"
                                value={concordo}>
                                <p>Eu concordo que ao oferecer os dados acima requeridos para o processo,
                                estarei permitindo a utilização e armazenamento para fins exclusivos do
                                evento louvor em harmonia. Veja nossa
                        <Link to="/Politica" target="_blank" > Política de Privacidade</Link>.</p></Checkbox>
                       
                        </div>
                        {/*TO-DO: Componente para baixar a partitura especifica para cada instrumento */}
                        {/* <div className="p_para_baixar">
                            <p>*Baixe aqui a sua partitura</p>
                            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle caret color="danger">
                                    Partituras
                                </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="https://drive.google.com/uc?export=download&id=1sa9mRxTkEjaT9VC5qD78HM95j-l5RjpM">Violao</DropdownItem>
                                        <DropdownItem>Violino</DropdownItem>
                                        <DropdownItem>Viola</DropdownItem>
                                        <DropdownItem>Piano</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                        </div> */}
                            <button className="button-send" id="button-send"
                                type="submit" onClick={handleSendForm}>Enviar
                            </button>
                    </Form>
                </Col>
                    <Col sm="4" className="div-dir div-lateral">
                        <div className="ponto-dois">
                            <div className="ponto-direita"></div>
                        </div>
                    </Col>

            </Row>

        </Container>
    );
}

export default Formulario;