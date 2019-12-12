import { connect } from 'react-redux';
import React, {Component} from 'react';
import { notification } from '../../components';
import Highlighter from 'react-highlight-words';
import { Table, Divider, Tag, Select, Popconfirm, Icon, Input, Button, Alert  } from 'antd';
import api from '../../containers/Page/api';
import './tablePriceRule.css'
const {Option} = Select;
  
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];

class PriceRule extends Component {
    constructor(props) {
        super(props)
        this.state = {
          info:{},
          rules: {}
        }
        this.onSelect = this.onSelect.bind(this);
      
      }  


     componentWillMount(){
      this.fetchUser();
      this.fetchRules();
     }

     fetchUser(){
      api.get("https://api-triangulo.herokuapp.com/fathersusers").then(resposta =>{  
        this.setState({info: resposta.data});
      });
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

     fetchRules(){
      api.get("https://api-triangulo.herokuapp.com/showrules").then(res =>{  
        this.setState({rules: res.data});
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
      api.put(`https://api-triangulo.herokuapp.com/users/${record.id}`, {
        rule: event
      }).then(res =>{ 
        notification("success", "Price Rule is Changed !");
        console.log(res)
        document.location.reload(true);
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
    render(){
     
    
        var data1 = this.state.info;
        var data = [];
        var rules = this.state.rules;
        var listofrules = [];
        
        for(let a = 0; a < rules.length; a++){
          listofrules.push({
            value: rules[a].rule,
            label: rules[a].rule
          }
             
          );
        }
        
        for (let i = 0; i < data1.length; i++) {
            data.push({
              key: i,
              name: data1[i].username,
              age: data1[i].rule,
              id: data1[i].id
            });
          }
       

       

          var columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              ...this.getColumnSearchProps('name')
              
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
                defaultValue={record.age}
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
            },
            {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <span>
                  {/* <a>Invite {record.name}</a>
                  <Divider type="vertical" /> */}
                   <Popconfirm title="Sure to delete ?" onConfirm={()=> this.onClear(record)}>
                    <a style={{color: "#606D42"}} >Clear</a>
                    </Popconfirm>
                  
                </span>
              ),
            },
          ];

        return(
            <div>
            <div style={{marginLeft:"29px", marginBottom:"21px", marginTop:"25px"}}>
              <Alert  style={{width: "301px"}}message="Any changes made, will not be affected in Quickbooks" type="error" />
            </div>
            <div>
              <Table columns={columns} dataSource={data} />
            </div>
            </div>
        )
    }

}

export default connect(
    null
)(PriceRule);