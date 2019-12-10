import { connect } from 'react-redux';
import React, {Component} from 'react';
import { notification } from '../../components';
import { Table, Divider, Tag, Select  } from 'antd';
import api from '../../containers/Page/api';
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

     fetchRules(){
      api.get("https://api-triangulo.herokuapp.com/showrules").then(res =>{  
        this.setState({rules: res.data});
      });
     }

    onChange(value) {
      console.log(`selected ${value}`);
    }

    onSelect = (event,record) => {
      api.put(`https://api-triangulo.herokuapp.com/users/${record.id}`, {
        rule: event
      }).then(res =>{ 
        notification("success", "Price Rule is Changed !");
        console.log(res)

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
              render: text => <a>{text}</a>,
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
                  <a>Delete</a>
                </span>
              ),
            },
          ];

        return(
            <Table columns={columns} dataSource={data} />
        )
    }

}

export default connect(
    null
)(PriceRule);