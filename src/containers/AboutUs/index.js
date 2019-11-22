import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

class About extends Component { 
  

    render(){
        return(
            <center>
                <div class="card border-success mb-3" style={{maxWidth:'18rem'}}>
                <div class="card-header">About Us</div>
                    <div class="card-body text-dark">
                        <h5 class="card-title">Triangulo </h5>
                        <p class="card-text">

                        TRIÂNGULO HARWOOD FLOORING dedicated to the manufacturing of wood products since 1972. Built at that time, a solid industrial structure, administrative and asset that secured the technological evolution and constant innovation in its product line, adapting to the demands of the domestic and foreign markets.
The knowledge of the peculiarities of the wood, the most important building material and coating throughout the history of humanity and respect for the forest reserves, natural and planted, defined the guidelines of the business activity of TRIÂNGULO: “Man and Nature in Harmony”.               
                        </p>
                    
                    </div>
                </div>

                <div class="card bg-light mb-3" style={{maxWidth:'18rem'}}>
                    <div class="card-header">Contact</div>
                    <div class="card-body">
                        <h5 class="card-title">TRIÂNGULO HARWOOD FLOORING</h5>
                        <p class="card-text">Phone : +1 (757) 420 4771
Fax : +1 (757) 420 4772
Email : sales@triangulo.com.br
Office Hours: Monday – Friday
8:00 AM – 5:00 PM (Eastern time)
Warehouse Address
3804 Cook Blvd Suite 15 Chesapeake, VA 23323
Mailing Address
870 Greenbrier Cir. Suite 400 Chesapeake, VA 23320</p>
                    </div>
                </div>
         
            </center>
                
        )
    }
}


export default connect(
null
)(About);
