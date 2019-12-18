import { Component } from 'react';
import React from 'react';
import api from '../../containers/Page/api';
import { connect } from 'react-redux';
import { notification } from '../../components';
import TopbarCartWrapper from '../../components/cart/singleCartModal.style';
import { List, Typography, Popconfirm, Modal, Input, DatePicker, Tag } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
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
         messages: {},
         visible: false,
         SpecificMessage:{},
         speMessage: '',
         speDate: '',
         msg:'',
         data:''
        };

        this.handleMessage =  this.handleMessage.bind(this);
        this.onChangeDate =  this.onChangeDate.bind(this);
      }

      handleMessage(event){
        this.setState({speMessage: event.target.value});
        console.log(this.state.message);
      }

      onChangeDate(date, dateString) {
        this.setState({data: dateString});
      }
  
      
      showModal = (item) => {
          console.log(item);
          this.setState({SpecificMessage: item});
          this.setState({speMessage: item.message});

          var date = moment(item.expire).format('DD-MM-YYYY');
          console.log(date);
          const myDate = moment(item.expire, 'YYYY-MM-DD').toDate();
          this.setState({speDate: myDate});
        this.setState({
          visible: true,
        });
      };

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
        api.delete(`https://api-triangulo.herokuapp.com/message/${msg.id}`).then(res => {
            notification("success", "Message is Deleted !");
            document.location.reload(true);
        });
      }

      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      handleOk = e => {
        var obj = this.state.SpecificMessage;
        var aux = this.state.speMessage;
        var newdata = this.state.data;
        console.log(aux);
        if(aux == '' || newdata == ''){
          notification("error", "You need to fill the blanks to edit that message");
        }else{        
          api.put(`https://api-triangulo.herokuapp.com/message/${obj.id}`, {
              message: aux,
              expire: newdata
            }).then(res =>{ 
              notification("success", "Message was changed !");
              this.setState({
                  visible: false,
                });
              console.log(res)
              document.location.reload(true);
          })
        }
          
        

        


      }
    render(){
        var listmessages = this.state.messages;
        var datalist = [];

        for (let index = 0; index < listmessages.length; index++) {
            datalist.push({
                message: listmessages[index].message,
                id: listmessages[index].id,
                expire: listmessages[index].expire,
                status: listmessages[index].status
            });
            
        }

        if (!datalist || datalist.length === 0) {
            return (
              <div className="isoNoItemMsg">
                <span>No Messages found</span>
              </div>
            );
          }

        return(
        <div>
                <div>
                
                        <List
                        header={<div>List of Messages</div>}
                        bordered
                        dataSource={datalist}
                        renderItem={item => (
                            
                            <List.Item actions={[
                                <Popconfirm title="Are you sure？" onConfirm={() => this.showModal(item)} okText={"Ok"} cancelText="No">
                                <a key="list-loadmore-edit" >edit</a>
                                </Popconfirm>
                            ,
                            <Popconfirm title="Are you sure？" onConfirm={() => this.handleDelete(item)} okText="Ok" cancelText="No">
                                <a key="list-loadmore-more">Delete</a>
                                </Popconfirm> 
                            ]} >
                            Message: {item.message === undefined ? "  " : item.message }
                            <br/>
                            Date of Expire:  {item.expire === undefined ? "  " : item.expire }
                            <br/>
                        Status:  <Tag color= {item.status === 1 ? "green" : "red"}>{item.status === 1 ? "Active" : "Expire"}</Tag>
                        
                        
                            
                            </List.Item>
                        )}
                        />                
                </div>

                <Modal
                title="Send a Message"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                
                
                <div>
                <p style={{fontSize: "17px", height: "28px", color: "darkgrey"}}>Message </p>
                <TextArea
                
                    value={this.state.speMessage}
                    onChange={this.handleMessage}
                    placeholder="Controlled autosize"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
                </div>
                
                <br/>
                <br/>
                <div>
                <p style={{fontSize: "17px", height: "28px", color: "darkgrey"}}>Expiration Date </p>
                <DatePicker onChange={this.onChangeDate} />
                </div>
            </Modal>
        </div>
        )
    }
}


export default connect(
    null
)(Messages);