import { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Input,Popconfirm, Tag, Select, AutoComplete, Icon   } from 'antd';
import EditView from '../Tables/antTables/tableViews/editView';
import { notification } from '../../components';
import * as TableViews from '../Tables/antTables/tableViews';
import api from '../../containers/Page/api';
import Highlighter from 'react-highlight-words';

import fakeData from '../Tables/fakeData';

const dataList = new fakeData(10);
const {Option} = Select;


function onSelect(value) {
  console.log('onSelect', value);
}
 


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
      rules:{},
      ruleSelected:'',
      specif: {},
      idprice:'',
      valor:'',
      visibleNewUser:false,
      dataSource: [],
      priceNewUser:'',
      searchText: '',
      searchedColumn: ''
    }


    this.handleUsername = this.handleUsername.bind(this);
    this.handleemail = this.handleemail.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handlePriceNewUser = this.handlePriceNewUser.bind(this); 
  }
  
  onChange(value) {
    console.log(`selected ${value}`);
  }

  onSelect = event => {
    this.setState({ruleSelected: event});
    console.log(event);
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
  

  onSearchAuto = searchText => {
    console.log(searchText);
    this.setState({
      dataSource: searchText ? [] : [searchText],
    });
  };

  onChangeAuto = value => {
    this.setState({ value });
  };



  handleUsername(event){
    this.setState({username: event.target.value});
    console.log(this.state.username);
  }
  handlePrice(event){
    this.setState({price: event.target.value});
  }

  handlePriceNewUser(event){
    this.setState({priceNewUser: event.target.value});
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
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
        this.fetchRules();
      }

      onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      };

      
      getUsers(){
        api.get("https://api-triangulo.herokuapp.com/showproductrules").then(res =>{  
        console.log(res.data);      
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

      showModalNewUSER = () => {
        this.setState({

          visibleNewUser: true,
        });
      };

      handleOkNewUser = e => { 
        var name = this.state.valor;
        var price = this.state.priceNewUser;
        var rule = this.state.ruleSelected;
        console.log(name, price, rule);   
        api.post(`https://api-triangulo.herokuapp.com/createruleapp`, {
        name: name,
        price: price,
        rule: rule
       }).then(res => {
            console.log(res);
            notification('success','Rule Created');
            this.setState({

              visibleNewUser: false,
            });
            document.location.reload(true);
        });
      }

      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
        var s = this.state.price;
        var string = s.toString();
        api.put(`https://api-triangulo.herokuapp.com/pricerule/${this.state.idprice}`, {price: string }).then(res => {
            console.log(res);
            notification('success','Price is Changed');
            document.location.reload(true);
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      fetchRules(){
        api.get("https://api-triangulo.herokuapp.com/showrules").then(res =>{  
          this.setState({rules: res.data});
        });
       }
      
      handleCancelNewUser = e => {
        console.log(e);
        this.setState({
          visibleNewUser: false,
        });
      };

      ObjSelect = (event,value) => {
        this.setState({valor: value});
      }
  

      handleDelete = key => {
        console.log(key);
            api.delete(`https://api-triangulo.herokuapp.com/pricerule/${key.id}`).then(res => {
              console.log(res);
              notification('success','User Deleted !')
              document.location.reload(true);
            });      
      };

      changeStatus = key => {
        console.log(key);
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
        const { info, value } = this.state;
        var obj;
        var columns = [
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Rule', dataIndex: 'rule', key: 'rule' },
          { title: 'Price', dataIndex: 'price', key: 'price'
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

            <Popconfirm title="Sure to delete ?" onConfirm={() => this.handleDelete(record)}>
            <a style={{color: "#606D42"}}> | Delete</a>
            </Popconfirm>

            </div>
           
            ,
          },
        ];
        var columns1 = [
            { title: 'Name of Product', dataIndex: 'name', key: 'name' , ...this.getColumnSearchProps('name')}
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
        var testeProducts = []
        var dataNomesProducts = this.state.dataSource;
        for(let f = 0; f < info.length; f++){
          testeProducts.push({name: info[f].name});
          dataNomesProducts.push(info[f].name);
        }
        
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

        var rules = this.state.rules;
        var listofrules = [];
        
        for(let a = 0; a < rules.length; a++){
          listofrules.push({
            value: rules[a].rule,
            label: rules[a].rule
          }
             
          );
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
          
          <div style={{marginLeft:"29px", marginBottom:"21px", marginTop:"25px"}}>
            <Button style= {{borderRadius: "20px", backgroundColor:"#606D42", borderColor:"#606D42"}}type="primary" onClick={this.showModalNewUSER}>
            Add product rule
            </Button>
          </div>
          
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
          title="Change price"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <p style={{fontSize: "17px", height: "28px", color: "darkgrey"}}>Change Price: </p>
            <Input type="number" placeholder="Change Price" onChange={this.handlePrice} />
          </div>

        </Modal>

        <Modal
          title="Add a product rule"
          visible={this.state.visibleNewUser}
          onOk={this.handleOkNewUser}
          onCancel={this.handleCancelNewUser}
        >
          <div>

          
            <div>
            <p style={{fontSize: "17px", height: "28px", color: "darkgrey"}}>Name of Product</p>

           
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={testeProducts.map(option => option.name)}
              renderInput={params => (
                <TextField {...params} label="Search Product" color="primary" margin="normal"  size="small" variant="outlined" fullWidth />
              )}
              onInputChange={this.ObjSelect}
            />
            </div>
            
            
            <br></br>
            <p style={{fontSize: "17px", height: "28px", color: "darkgrey"}}>Price Rule</p>
            
            <div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select rule"
                optionFilterProp="children"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSelect={this.onSelect}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {listofrules.map( l => {
                return(
              <Option value={l.value}>{l.value}</Option>
                )
              })}     
            </Select>
            </div>
            
            <br></br>
            <p style={{fontSize: "17px", height: "28px", color: "darkgrey"}}>Price</p>
            <Input type="number" placeholder="Price" onChange={this.handlePriceNewUser} />
          
          </div>

        </Modal>
          

         

          
          </div>
        );
    }

    
    

    
}


export default connect(
    null
)(ProductsRule);