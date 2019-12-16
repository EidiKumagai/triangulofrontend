import { Component } from 'react';
import React from 'react';
import api from '../../containers/Page/api';
import { connect } from 'react-redux';
import TopbarCartWrapper from '../../components/cart/singleCartModal.style';
import { List, Typography, Popconfirm } from 'antd';

// const data = [
//     'Racing car sprays burning fuel into crowd.',
//     'Japanese princess to wed commoner.',
//     'Australian walks 100km after outback crash.',
//     'Man charged over missing wedding girl.',
//     'Los Angeles battles huge wildfires.',
//   ];


class Messages extends Component { 
   
    constructor(props) {
        super(props);


        this.state = {
         messages: {}
        };
      }

    getMyMessages(){
        api.get(`https://api-triangulo.herokuapp.com/messageusersender`).then(res =>{  
          this.setState({messages: res.data});
          });
      }

      componentWillMount(){
          this.getMyMessages();
      }

      handleEdit = (msg) => {

      }

      handleDelete = (msg) => {

      }
    render(){
        var listmessages = this.state.messages;
        var datalist = [];

        for (let index = 0; index < listmessages.length; index++) {
            datalist.push({
                message: listmessages[index].message,
                id: listmessages[index].id,
                expire: listmessages[index].expire,
            });
            
        }


        return(

            <div>
         
    <List
      header={<div>List of Messages</div>}
      bordered
      dataSource={datalist}
      renderItem={item => (
        
        <List.Item actions={[
            <Popconfirm title="Are you sure？" okText={this.handleEdit(item)} cancelText="No">
            <a key="list-loadmore-edit" >edit</a>
            </Popconfirm>
        ,
        <Popconfirm title="Are you sure？" okText={this.handleDelete(item)} cancelText="No">
            <a key="list-loadmore-more">Delete</a>
            </Popconfirm> 
        ]} >
         Message: {item.message === undefined ? "  " : item.message }
         <br/>
         Date of Expire:  {item.expire === undefined ? "  " : item.expire }
   
      
      
      
          
        </List.Item>
      )}
    />
            </div>
        )
    }
}


export default connect(
    null
)(Messages);