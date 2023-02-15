import React from "react";
import './footer.scss';
// import backimg from '../images/plantback.jpg.webp'
function Footer(){
    return(

        <div class="footer-container">
            
            <div class="ul-footer">
                <ul class="footer-list">
                    <div className="con">
                        <li class="nav-item"><p>Contact Us :</p></li>
                    </div>
                    <div className="Elimo">
                        <li class="nav-item"><a href="https://github.com/Ellie-Aghajani"  target="_blank">Ellie</a></li>
                        <li class="nav-item"><a href="https://github.com/Mostafa-Naghipoor" target="_blank">Mostafa</a></li>
                    </div>

                    
                    
                </ul>
            </div> 
            <div class="p-footer">
                <a href="">Top</a>
                <p class="copy-right">© 2023 BAHAR-GREENHOUSE</p>
                
            </div> 
        </div>
    )
}
export default Footer; 