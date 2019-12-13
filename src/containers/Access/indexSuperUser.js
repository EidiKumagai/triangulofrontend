import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Input,Popconfirm, Tag, Icon,Select   } from 'antd';
import Highlighter from 'react-highlight-words';
import EditView from '../Tables/antTables/tableViews/editView';
import { notification } from '../../components';
import * as TableViews from '../Tables/antTables/tableViews';
import api from '../../containers/Page/api';
// import './tabela2.css'


import '../PriceRule/testetable.css'
import fakeData from '../Tables/fakeData';
import { InputSearch } from '../../components/uielements/input';

const {Option} = Select;
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
      email:'',
      specif: {},
      ResetComponent: true,
      searchText: '',
      searchedColumn: '',
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

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }}  />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
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
        this.setState({ResetComponent: false})
        this.getUsers();
      }

      onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      };

      
      getUsers(){
        api.get("https://api-triangulo.herokuapp.com/sonusersbyfather").then(res =>{  
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
        var usrname = this.state.username;
        var em = this.state.email;    
        api.post(`https://api-triangulo.herokuapp.com/sonusers`,{ 
        username: usrname,
        email: em 

        }).then(r => {
          console.log(r);
          notification('success','User added successfully !')
          document.location.reload(true);
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
        console.log(key);
        let statusCerto = key.status;
        var s = !statusCerto
        console.log(s);
        api.put(`https://api-triangulo.herokuapp.com/users/${key.id}`, {status: s }).then(res => {
            console.log(res);
            notification('success','Change status !')
            this.setState({ResetComponent:true});
            document.location.reload(true);
        });
          
        

      };

      fetchSpecif(record){
        
        api.get(`https://api-triangulo.herokuapp.com/sonusersbyfathers/${record.id}`).then(res =>{  
            console.log(res);
            this.setState({specif: res.data})
          });
          
        
      }


      onChange(value) {
        console.log(`selected ${value}`);
      }
  
      onClear = record => {
        api.put(`https://api-triangulo.herokuapp.com/users/${record.id}`, {
          rule: ""
        }).then(res =>{ 
          notification("success", "Price Rule is Changed !");
          console.log(res)
          document.location.reload(true);
        })
      }
      onSelect = (event,record) => {
        console.log(record, event);
        api.put(`https://api-triangulo.herokuapp.com/users/${record.id}`, {
          permission : event
        }).then(res =>{ 
          notification("success", "Permission changed success !");
          console.log(res)
          document.location.reload(true);
        }).catch(error => {
          notification("error", "Something is wrong, try again !");
        })
      }
      
      onBlur() {
        console.log('blur');
      }
      
      onFocus() {
        console.log('focus');
      }
      
      onSearch(val) {
        console.log('search:', val);
      }

      render() {
        var listofPermissions = [];
        var permissionRevenda = {
          permission: 3,
          name: "Resale"
          
        };
        listofPermissions.push(permissionRevenda);
        var permissionAdmin = {
          permission: 4,
          name:"Administrator"
        };
        listofPermissions.push(permissionAdmin);
        var Reset = this.state.ResetComponent;

        

      
        var columns = [
          { title: 'Name', dataIndex: 'username', key: 'username' },
          { title: 'Email', dataIndex: 'email', key: 'email' },
          { title: 'Status', dataIndex: 'status', key: 'status',
          render: (text,record) => 
          
          <Tag color={record.status == true ? 'green' : 'red'}>
            {record.status == true ? "Active" : "Inative"}
          </Tag>

          },
          {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => 
            <div>

            
            <Popconfirm title="Sure to Change Status ?" onConfirm={() => this.changeStatus(record)}>
            <a style={{color: "#606D42"}}>  Change Status</a>
            </Popconfirm>
            </div>
           
            ,
          },
        ];
        var columns1 = [
            { title: 'Name', dataIndex: 'name', key: 'name', ...this.getColumnSearchProps('name') },
            { title: 'Status', dataIndex: 'age', key: 'age', 
            render: (text,record) =>
             
            <Tag color={record.age == "true" ? 'green' : 'red'}>
              {record.age == "true" ? "Active" : "Inative"}
            </Tag>
             
  
  
            },
            {
              title: 'Price Rule',
              dataIndex: 'age',
              key: 'age',
              render: (text,record)  =>
              
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSelect={(event) => {this.onSelect(event,record);}}
                defaultValue={record.permission}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              > 
              {listofPermissions.map( l => {
                return(
              <Option value={l.permission}>{l.name}</Option>
                )
              })}
                
                
              </Select>
            }
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
        for (let i = 0; i < data1.length; i++) {
            var aux = data1[i].status;
            data.push({
            key: i,
            name: data1[i].user,
            age: aux.toString(),
            address: data1[i].email ,
            id: data1[i].id,
            subusers: data1[i].subusers,
            permission: data1[i].permission
          });
        }

        for (let index = 0; index < speData.length; index++) {
            var aux = speData[index].status;
            dataSpe.push({
                key: index,
                name: speData[index].username,
                age: aux.toString() ,
                address: speData[index].email ,
                id: speData[index].id
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
        <p hidden={true}>{Reset}</p>
          
          <Table
            columns={columns1}
            className='hscroll'
            onExpand={(expanded,record) => {
              
              if(expanded == false){

              }else{
                  this.fetchSpecif(record);
              }

             
              
          }}
            
            expandedRowRender={
            record =>
                         // {this.fetchSpecif(record.id)}, 
            <Table className="beta"  columns={columns}   dataSource={record.subusers}/>    
        
            
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
          

         

          
          </div>
        );
    }

    
    

    
}


export default connect(
    null
)(Access);