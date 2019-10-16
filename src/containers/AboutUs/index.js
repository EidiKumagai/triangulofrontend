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
                        <p class="card-text">A TRIÂNGULO® PISOS E PAINÉIS LTDA. é dedicada à fabricação de produtos de madeira desde 1972. Construída na época, uma sólida estrutura industrial, administrativa e patrimonial que garantiu a evolução tecnológica e constante inovação em sua linha de produtos, adaptando-se às exigências do mercado interno e externo.</p>
                    
                    </div>
                </div>

                <div class="card bg-light mb-3" style={{maxWidth:'18rem'}}>
                    <div class="card-header">Contact</div>
                    <div class="card-body">
                        <h5 class="card-title">TRIÂNGULO PISOS E PAINÉIS LTDA (MATRIZ)</h5>
                        <p class="card-text">Rua Chanceler Osvaldo Aranha, 570 – Bairro Hauer
81630-160 – Curitiba – Paraná
CNPJ : 75.059.857/0001-86
Inscrição Estadual : 10.126.468-83</p>
                    </div>
                </div>
         
            </center>
                
        )
    }
}


export default connect(
null
)(About);
