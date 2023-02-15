import React from "react";
import './mainOne.scss';
import backimg from '../images/plantback.jpg.webp'
function MainOne(){
    return(
        <div className="description">
            <div className="text-des">
                <br />
                <br />
                <h2 className="text-title">Bahar</h2>
                <br />
                <h3 className="text-subtitle">From Bahar Greenhouse to Your House</h3>
                <p> Keep Your House Green</p>
            </div>
            <div className="img-des">
                <img className="back-img" src={backimg} alt="plant"/>   
            </div>
        
        </div>
    )
}
export default MainOne; 