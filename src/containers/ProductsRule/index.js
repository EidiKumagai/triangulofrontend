import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Input,Popconfirm, Tag   } from 'antd';
import EditView from '../Tables/antTables/tableViews/editView';
import { notification } from '../../components';
import * as TableViews from '../Tables/antTables/tableViews';
import api from '../../containers/Page/api';

import fakeData from '../Tables/fakeData';

const dataList = new fakeData(10);



 


class ProductsRule extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      info: {},
      aux: {},
      visible: false,
      username:'',
      email:'',
      price:'',
      specif: {},
      idprice:''
    }


    this.handleUsername = this.handleUsername.bind(this);
    this.handleemail = this.handleemail.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
  }  
  

  handleUsername(event){
    this.setState({username: event.target.value});
    console.log(this.state.username);
  }
  handlePrice(event){
    this.setState({price: event.target.value});
  }


  handleemail(event){
    this.setState({email: event.target.value});
    console.log(this.state.email);
  }


    renderTable(tableInfo) {
      let Component;
      Component = TableViews.EditView;
      

      return <Component tableInfo={tableInfo} dataList={dataList} />;
    }


    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
      };
      
      componentWillMount(){
        this.getUsers();
      }

      onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      };

      
      getUsers(){
        api.get("https://api-triangulo.herokuapp.com/showproductrules").then(res =>{  
          this.setState({info: res.data});
        }); 
      }
      getUserInfo(){
        api.get("https://api-triangulo.herokuapp.com/users/1").then(resposta =>{  
          this.setState({aux: resposta.data});
        }); 
      }

      showModal = () => {
        this.setState({

          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
        var s = this.state.price;
        var string = s.toString();
        api.put(`https://api-triangulo.herokuapp.com/pricerule/${this.state.idprice}`, {price: string }).then(res => {
            console.log(res);
            notification('success','Price is Changed')
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      
  

      handleDelete = key => {
        console.log(key);
        let usuarios = this.state.info;
        usuarios.map( u => {
          if(u.email == key.address){
            api.delete(`https://api-triangulo.herokuapp.com/sonusers/${u.id}`).then(res => {
              console.log(res);
              notification('success','User Deleted !')
              document.location.reload(true);
            });
          }
        });
       
      };

      changeStatus = key => {
        this.setState({

            visible: true,
        });

        this.setState({idprice: key.id});

      };

      fetchSpecif(record){

        api.get(`https://api-triangulo.herokuapp.com/showrulesbyproduct/${record.name}`).then(res =>{  
            console.log(res);
            this.setState({specif: res.data})
          });
          
        
      }

    //    metodoTeste(columns, record, listdata){
    //     var speData =  this.state.specif;

    //     var d = [];
    //     for (let index = 0; index < speData.length; index++) {
    //         dataSpe.push({
    //             key: index,
    //             name: speData[index].name,
    //             age: speData[index].price ,
    //             address: speData[index].rule ,
    //             id: speData[index].id
    //         });
            
    //     }
    //     return(
    //         <Table class='tabelaFilho' style={{ margin: 0 }} columns={columns} dataSource={listdata}/>
    //     )
    //    }

      render() {
        var obj;
        var columns = [
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Rule', dataIndex: 'address', key: 'address' },
          { title: 'Price', dataIndex: 'age', key: 'age'
          },
          {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => 
            <div>

            
            <Popconfirm title="Sure to Change price ?" onConfirm={() => this.changeStatus(record)}>
            <a style={{color: "#606D42"}}>  Change price</a>
            </Popconfirm>
            </div>
           
            ,
          },
        ];
        var columns1 = [
            { title: 'Name of Product', dataIndex: 'name', key: 'name' }
          ];
  

        
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        
        let usuarios = this.state.info;
        console.log(usuarios);
        var data1 = this.state.info;
        var speData =  this.state.specif;

        var dataSpe = [];
        var data = [];
        var specifProd = [];
        for (let i = 0; i < data1.length; i++) {
            data.push({
            key: i,
            name: data1[i].name,
            rules: data1[i].rules 
                
            
          });
        }
        
        

        
        for (let index = 0; index < speData.length; index++) {
            dataSpe.push({
                key: index,
                name: speData[index].name,
                age: speData[index].price ,
                address: speData[index].rule ,
                id: speData[index].id
            });
            
        }
        
        console.log(dataSpe);
        var bool = false;
        const hasSelected = selectedRowKeys.length > 0;
        return (
          // <div style={{width: "97%", padding: "33px"}}>
          //   <div style={{ marginBottom: 16 }}>
          //     <Button type="primary">
          //       Add User
          //     </Button>
          //     <br></br>
          //     <br></br>
          //     <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
          //       Reload
          //     </Button>
              
          //     <span style={{ marginLeft: 8 }}>
          //       {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          //     </span>  
          //   </div>
            
          //   <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          // </div>

          <div>
          
          
          <Table
            columns={columns1}
            onExpand={(expanded,record) => {
              
                if(expanded == false){

                }else{
                    this.fetchSpecif(record);
                }

               
                
            }}
            
            expandedRowRender={
                (record,index,indent,expanded) =>{
                   
                    return(
                        <Table class='tabelaFilho' style={{ margin: 0 }} columns={columns} dataSource={record.rules}/>
                    )
                   
                    
                    

                }

                
                
            }

            dataSource={data}
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: event => {

            //       // console.log(rowIndex + "" + record.name)
            //     }

                
            //   }
            // }}
          />

        <Modal
          title="Add a new User"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <p style={{fontSize: "17px", height: "28px", color: "darkgrey"}}>Change Price: </p>
            <Input type="number" placeholder="Change Price" onChange={this.handlePrice} />
          </div>

        </Modal>
          

         

          
          </div>
        );
    }

    
    

    
}


export default connect(
    null
)(ProductsRule);