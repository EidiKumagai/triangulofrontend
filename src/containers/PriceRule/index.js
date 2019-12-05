import { connect } from 'react-redux';
import React, {Component} from 'react';
import { Table, Divider, Tag } from 'antd';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Invite {record.name}</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

class PriceRule extends Component {
    constructor(props) {
        super(props)
        this.state = {
          info:{}
        }
    
        this.handleUsername = this.handleUsername.bind(this);
        this.handleemail = this.handleemail.bind(this);
      }  

    render(){
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

        return(
            <Table columns={columns} dataSource={data} />
        )
    }

}

export default connect(
    null
)(PriceRule);