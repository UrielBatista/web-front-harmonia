import React from "react";

import { Link } from "react-scroll";
import { Button } from 'reactstrap';

import img_back from '../../assests/png/imagemBack.jpg';

import './main.css';


const Main = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="text">
        {/* <video autoPlay loop muted className="video-autoplay"
        >
          <source src={versao_background} type="video/mp4" />
        </video>  */}
        <img className="video-autoplay" src={img_back} alt="wallpaper of the page"></img>
        <p>Já imaginou fazer parte
                <b className="first-bold"> de um
                dos melhores eventos de música sacra?</b>
        </p>
        <br />
        <p>Se você tem interesse<b className="second-bold">em participar </b>
            inscreva-se agora! </p>

        <Link
          to="steps-form"
          smooth={true}
          offset={50}
          duration={100}>
          <Button className="button-form" color="danger">Cadastre-se</Button>
        </Link>

      </div>
    </div>
  );
}

export default Main;