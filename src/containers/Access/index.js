import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import api from '../../containers/Page/api';


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
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
        info: {}
    };



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
        this.getUserInfo();
      }

      onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      };

      
      getUserInfo(){
        api.get("https://api-triangulo.herokuapp.com/users").then(res =>{  
          this.setState({info: res.data});
        }); 
      }

      render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        var data1 = this.state.info;
        var data = [];
        for (let i = 0; i < data1.length; i++) {
          data.push({
            key: i,
            name: data1[i].username,
            age: 32,
            address: `London, Park Lane no. ${i}`,
          });
        }

        const hasSelected = selectedRowKeys.length > 0;
        return (
          <div style={{width: "97%", padding: "33px"}}>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary">
                Add User
              </Button>
              <br></br>
              <br></br>
              <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                Reload
              </Button>
              
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </span>  
            </div>
            
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>
        );
    }

    
    

    
}


export default connect(
    null
)(Access);