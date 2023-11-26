import React from "react";
import './packagesInfo.css';

import { ReactComponent as AppForm } from '../../assests/svg/money-one.svg';
import { ReactComponent as AppSearch } from '../../assests/svg/money-two.svg';
import { ReactComponent as AppEvaluate } from '../../assests/svg/money-tree.svg';


export default function PackagesInfo (){

    return (
        <div className="steps" >            
                <div className="div-steps">
                    <div className="div-fast-dating">
                        <h1 className="como-funciona">Sobre os pacotes disponíveis</h1>
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
   
                            <p>Pacote <strong>base</strong> custa R$150,00</p>
                            
                        </div>
                        
                        <div className="div-passo ">
                            <AppSearch className="icon-steps svg-icon"></AppSearch>
                           
                            <p className="letter">
                                Pacote <strong>médio</strong> custa R$180,00
                            </p>
                            
                        </div>
                    
                        <div className="div-passo ">
                            <AppEvaluate  className="icon-steps svg-icon"></AppEvaluate>
                          
                            <p className="letter">
                                Pacote <strong>completo</strong> custa R$200,00
                            </p>
                            
                        </div>
                    </div>
            </div>
        </div>
    )
}