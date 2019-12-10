import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Input,Popconfirm, Tag   } from 'antd';
import EditView from '../Tables/antTables/tableViews/editView';
import { notification } from '../../components';
import * as TableViews from '../Tables/antTables/tableViews';
import api from '../../containers/Page/api';
import './tabela.css';

import fakeData from '../Tables/fakeData';

const dataList = new fakeData(10);

// const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//     },
//   ];



// const data = [
//   {
//     key: 1,
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 2,
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
//   },
//   {
//     key: 3,
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
//   },
// ];


  // var data1 = [];
  
  // var data = [];
  // for (let i = 0; i < data1.length; i++) {
  //   data.push({
  //     key: i,
  //     name: data1.name,
  //     age: 32,
  //     address: `London, Park Lane no. ${i}`,
  //   });
  // }

 


class Access extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      info: {},
      aux: {},
      visible: false,
      username:'',
      email:''
    }

    this.handleUsername = this.handleUsername.bind(this);
    this.handleemail = this.handleemail.bind(this);
  }  
  

  handleUsername(event){
    this.setState({username: event.target.value});
    console.log(this.state.username);
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
        
        this.getUserInfo()
        
       
      }
      

      onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      };

     
      
      getUserInfo(){
        api.get("https://api-triangulo.herokuapp.com/users/1").then(resposta =>{  
          this.setState({aux: resposta.data});
          });
      }

       
      async getUsers(){
    
        console.log(this.state.aux);
       var obj = this.state.aux;
        api.get(`https://api-triangulo.herokuapp.com/sonusersbyfathers/${obj.id}`).then(res =>{  
        this.setState({info: res.data});
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
        var usrname = this.state.username;
        var em = this.state.email;    
        api.post(`https://api-triangulo.herokuapp.com/sonusers`,{ 
        username: usrname,
        email: em 

        }).then(r => {
          console.log(r);
          notification('success','User added successfully !')
          
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
        let usuarios = this.state.info;
        let statusCerto 
        if(key.age  == "true"){
          statusCerto = true;
        }else{
          statusCerto = false;
        }
        var s = !statusCerto
        console.log(s);
        usuarios.map( u => {
          if(u.email == key.address){
            api.put(`https://api-triangulo.herokuapp.com/users/${u.id}`, {status: s }).then(res => {
              console.log(res);
              notification('success','Change status !')
              document.location.reload(true);
            });
          }
        });

      };

      render() {
        console.log(this.state.aux);
        var teste = this.state.aux;
        if(teste.id === undefined){
          
        }else{
          this.getUsers();
        }
          

        var columns = [
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Email', dataIndex: 'address', key: 'address' },
          { title: 'Status', dataIndex: 'age', key: 'age', 
          render: (text,record) => 
          <Tag color={record.age == "true" ? 'green' : 'red'}>
            {record.age == "true" ? "Active" : "Inative"}
          </Tag>
           


          },
          {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => 
            <div>

            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
            <a style={{color: "#606D42"}}>Delete</a>
            </Popconfirm>
            
            <Popconfirm title="Sure to Change Status ?" onConfirm={() => this.changeStatus(record)}>
            <a style={{color: "#606D42"}}> |  Change Status</a>
            </Popconfirm>
            </div>
           
            ,
          },
        ];
        
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        
        let usuarios = this.state.info;
        console.log(usuarios);
        var data1 = this.state.info;
       
        var data = [];
        for (let i = 0; i < data1.length; i++) {
          var aux = data1[i].status
          data.push({
            key: i,
            name: data1[i].username,
            age: aux.toString(),
            address: data1[i].email ,
          });
        }

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
          <div style={{marginLeft:"29px", marginBottom:"21px", marginTop:"25px"}}>
            <Button style= {{borderRadius: "20px", backgroundColor:"#606D42", borderColor:"#606D42"}}type="primary" onClick={this.showModal}>
            Add new User
            </Button>
          </div>
          
          <Table
            className="table"
            columns={columns}
            // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
            dataSource={data}
            style={{tableLayout: "auto"}}
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
            <p style={{fontSize: "17px", height: "28px", color: "darkgrey"}}>Username: </p>
            <Input placeholder="Username" onChange={this.handleUsername} />
          </div>
          <br></br>
          <div> 
          <p style={{fontSize: "17px", height: "28px", color: "darkgrey"}}>E-mail: </p>
            <Input type="email" placeholder="E-mail" onChange={this.handleemail}/>
          </div>

        </Modal>
         

          
          </div>
        );
    }

    
    

    
}


export default connect(
    null
)(Access);