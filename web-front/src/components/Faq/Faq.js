import React, {memo} from "react";
import './faq.css';


export default memo(function () {
        return(
            <div className="main-faq" id="faq">
                <div className="faq-header">
                    <h2>Perguntas Frequentes</h2>
                </div>
                <div className="div-faq">
                    <div className="perguntas-freq">
                        <div className="pf-parte1">
                            <details>
                                <summary >Sobre nós? </summary>
                                <p>
                                Somos uma igreja onde também gostamos de música sacra, 
                                investimos bastante nos nossos jovens.
                                </p>
                                
                            </details>
                            <details>
                                <summary >Porque estudar música? </summary>
                                <p>Com a música podemos evangelizar pessoas que ainda não conhecem 
                                    o evangelho, como também a música ajuda a abrir nossas mentes para 
                                    outras atividades.
                                </p>
                            </details>
                            <details>
                                <summary >É um projeto sem fim lucrativos?</summary>
                                <p> Sim, temos por objetivo apenas passar o conhecimento para os 
                                    nossos jovens como também adultos, com o foco em evangelizmo 
                                    e adoração ao senhor.
                                </p>
                            </details>
                            {/* <details>
                                <summary >Qual a duração?</summary>
                                <p>Apresentação da proposta dura em média 10 minutos</p>
                            </details> */}
                        </div>
                        
                        <div className="pf-parte2">
                            <details>
                                <summary >Tem idade para participar? </summary>
                                <p>Não, aceitamos qualquer idade, para participar basta fazer
                                    a inscrição, como também ter uma afinidade com um instrumento ou canto.</p>
                            </details>

                            <details>
                                <summary >Como confirmo minha inscirção?</summary>
                                <p>Basta checar seu <strong>email</strong> depois de alguns minutos de ter efetuado
                                    a sua inscrição no nosso portal.
                                </p>
                            </details>
                            
                            
                            {/* <details>
                                <summary >Quando acontece?</summary>
                                <p>É uma ideia inovadora que pode agregar a nosssa marca, queremos conhecer! Faça seu pitch e apresente seu produto ou serviço para a agente</p>
                            </details> */}
                        </div>
                        
                    </div>


                
                </div>
                
                {/* <button onClick={()=>scrollToTop()}>Scroll to Top</button> */}
                
            </div>
        )
    }
)