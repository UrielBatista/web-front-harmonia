import React from "react";
import './steps.css';

import { ReactComponent as AppForm } from '../../assests/svg/form.svg';
import { ReactComponent as AppSearch } from '../../assests/svg/search.svg';
import { ReactComponent as AppEvaluate } from '../../assests/svg/time.svg';
import { ReactComponent as AppPeople } from '../../assests/svg/user.svg';


export default function Steps (){

    return (
        <div className="steps" >            
                <div className="div-steps">
                    <div className="div-fast-dating">
                        <h1 className="como-funciona">Sobre o evento de música sacra</h1>
                        <div className="linha-horizontal">
                            <svg height="40" width="320" >
                                <g fill="none">
                                    <path stroke="#E00600" d="M5 10 l1250 0" /> 
                                </g>
                                <g fill="none">
                                    <path stroke="#E00600" d="M5 10 l1250 0" /> 
                                </g>
                            </svg> 
                        </div>
                      
                        
                    </div>
                    <div className="div-sec-steps">
                        <div className="div-passo ">
                            <AppForm className="icon-steps svg-icon"></AppForm>
   
                            <p>Você se cadastra no formulário abaixo.</p>
                            
                        </div>
                        
                        <div className="div-passo ">
                            <AppSearch className="icon-steps svg-icon"></AppSearch>
                           
                            <p className="letter">
                                Já cadastrado, você receberá as musicas para estudar. 
                            </p>
                            
                        </div>
                    
                        <div className="div-passo ">
                            <AppEvaluate  className="icon-steps svg-icon"></AppEvaluate>
                          
                            <p className="letter">Após  
                            <strong> 5 dias</strong> de <strong>muito estudo</strong> e
                            dedicação ocorrerá o <strong>evento de música sacra.</strong>
                            </p>
                            
                        </div>
                        <div className="div-passo ">
                            <AppPeople className="icon-steps svg-icon" />
                          
                            <p className="letter">Chegou o  <strong>momento esperado!</strong> a apresentação ao público no local marcado</p>
                        </div> 
                    </div>
            </div>
        </div>
    )
}