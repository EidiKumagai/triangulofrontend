import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config.js';
import imagem from '../../containers/Sidebar/logoreal.png'
import nome from '../../containers/Sidebar/nometriangulocomphone.png';
// export default function({ collapsed, styling }) {
export default function({ collapsed }) {
  return (
    <div
      className="isoLogoWrapper">
        
      {collapsed
        ? <div>
          
            <h3>
            
              <Link to="/dashboard">
                <i style={{display: "grid" , marginTop: "21px"}}className={siteConfig.siteIcon} />
              </Link>
            </h3>
          </div>
        : <h3>
          <img style={{width: "89px", height: "72px"}}src={imagem} alt="logo" />
          <br></br>
          <img style={{width: "178px", height: "61px"}}src={nome} alt="logo" />
         
            {/* <Link to="/dashboard">
              
            </Link> */}
          </h3>}
    </div>
  );
}
