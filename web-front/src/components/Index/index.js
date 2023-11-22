import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Steps from "../Steps/Steps";
import Formulario from "../Formulario/Formulario";
import Faq from "../Faq/Faq";
import Footer from "../Footer/Footer";


export default function Index() {
    return (
        <>
            <Header />
            {/* <Cookies/> */}
            <Main/>
            <Steps/>
            <Formulario/>
            <Faq/>
            <Footer/>
        </>
    )
}