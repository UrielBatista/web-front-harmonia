import React from "react";
import './footer.css';

export default function Footer(){
 
    const year =   () => {return new Date().getFullYear()}

    return (
        <footer>
            <div className="div-sec-footer">
                <div className="div-inst div-subfooter ">
                    <h3> Igreja Batista Manancial</h3>
                    <a href="https://www.igrejamanancial.com.br/"  target="_blank" rel="noopener noreferrer"><p>Conheça Nosso Site</p></a>
                </div>
                {/* <div className="div-inst div-subfooter">
                    <h3>Central de Atendimento</h3>
                    <a href="https://www.paguemenos.com.br/account#/orders"  target="_blank" rel="noopener noreferrer"><p>Meus Pedidos</p></a>
                    <a href="https://jobs.kenoby.com/paguemenos/"  target="_blank" rel="noopener noreferrer"><p>Trabalhe conosco</p></a>
                    <a href="https://institucional.paguemenos.com.br/ofereca-seu-imovel"  target="_blank" rel="noopener noreferrer"><p>Ofereça seu Imóvel</p></a>
                    <a href="https://canaldeetica.com.br/paguemenos/"  target="_blank" rel="noopener noreferrer"><p>Canal de ética</p></a>
                    <a href="https://dpo.privacytools.com.br/policy-view/44eD4WMWD/1/poli%CC%81tica-de-privacidade---fastdating/pt_BR" rel="noopener noreferrer" target="_blank"><p>Política de Privacidade</p></a>
                </div> */}

              
            </div>
            <div className="copyright-pmenoslab">
                <p> Feito com<span className="first-span">❤</span>Igreja Batista Manancial</p> 
                <p><span>&copy;</span>Copyright {year()}  IBM.
                   
                </p> 
            </div>                           
        </footer>
    )
}