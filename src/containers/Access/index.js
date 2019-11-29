import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal } from 'antd';
import EditView from '../Tables/antTables/tableViews/editView';
import * as TableViews from '../Tables/antTables/tableViews';
import api from '../../containers/Page/api';

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

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => 
    <div>
      <a>Delete </a>
    </div>
    ,
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];


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
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        info: {},
        aux: {},
        visible: false
    };

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
        api.get("https://api-triangulo.herokuapp.com/users").then(res =>{  
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
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      render() {
        
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        // var data1 = this.state.info;
       
        // var data = [];
        // for (let i = 0; i < data1.length; i++) {
        //   data.push({
        //     key: i,
        //     name: data1[i].username,
        //     age: 32,
        //     address: `London, Park Lane no. ${i}`,
        //   });
        // }

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
            columns={columns}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
            dataSource={data}
          />

        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
         

          
          </div>
        );
    }

    
    

    
}


export default connect(
    null
)(Access);