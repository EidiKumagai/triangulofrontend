import React, { Component } from 'react';
import { Popover } from 'antd';
import { connect } from 'react-redux';
import api from '../../containers/Page/api';
import IntlMessages from '../utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';
import { Link } from 'react-router-dom';

import Image from '../../image/user3.png';

const demoMassage = [
  {
    id: 1,
    name: 'David Doe',
    time: '3 minutes ago',
    massage:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
  },
  {
    id: 2,
    name: 'Navis Doe',
    time: '4 minutes ago',
    massage:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
  },
  {
    id: 3,
    name: 'Emanual Doe',
    time: '5 minutes ago',
    massage:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
  }
  ,
  {
    id: 4,
    name: 'Dowain Doe',
    time: '6 minutes ago',
    massage:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
  }
];


// const stripTrailingSlash = str => {
//   if (str.substr(-1) === '/') {
//     return str.substr(0, str.length - 1);
//   }
//   return str;
// };
class TopbarMessage extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
      messages: {},
      messagesNormalUser: {},
      info: {}
    };
  }

  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  componentWillMount(){
    this.getMyMessages();
    this.getUserInfo();
    this.getMsgNormalUser();
  }

  getMyMessages(){
    api.get(`https://api-triangulo.herokuapp.com/messageusersender`).then(res =>{  
      this.setState({messages: res.data});
      });
  }

  getMsgNormalUser(){
    api.get(`https://api-triangulo.herokuapp.com/messageuserreceiver`).then(res =>{  
      this.setState({messagesNormalUser: res.data});
      });
  }

  getUserInfo(){
    api.get("https://api-triangulo.herokuapp.com/users/1").then(res =>{  
      this.setState({info: res.data});
    }); 
  }

  render() {
    // const url = stripTrailingSlash(this.props.url);

    var url = "/dashboard"
    var userinfo = this.state.info;
    var dataMessages = []
    dataMessages = this.state.messages;
    var messagesNormaluser = [];
    messagesNormaluser = this.state.messagesNormalUser;
    var list = [];
    var list2 = [];
  for (let index = 0; index < dataMessages.length; index++) {
    list.push({
      message: dataMessages[index].message,
      id: dataMessages[index].id,
      expire: dataMessages[index].expire,
    });
  }


  for (let i = 0; i < messagesNormaluser.length; i++) {
    list2.push({
      message: messagesNormaluser[i].message,
      id: messagesNormaluser[i].id,
      expire: messagesNormaluser[i].expire,
    });
  }

    const { customizedTheme } = this.props;
    const content = (
      <TopbarDropdownWrapper className="topbarMessage withImg">
        <div className="isoDropdownHeader">
          <h3>
            <IntlMessages id="sidebar.message" />
          </h3>
        </div>
        <div className="isoDropdownBody">
        
        {userinfo.permission === 3 ? list.map(massage => (
            <a className="isoDropdownListItem" key={massage.id}>
              {/* <div className="isoImgWrapper">
                <img alt="#" src={Image} />
              </div> */}

              <div className="isoListContent">
                <div className="isoListHead">
              <h5>{userinfo.permission === 3 ? "My Messages" : "Messages" }</h5>
                  <span className="isoDate">Expire in: {massage.expire}</span>
                </div>
                <p>{massage.message}</p>
              </div>
            </a>
          )) : 
          
          list2.map(massage => (
            <a className="isoDropdownListItem" key={massage.id}>
              {/* <div className="isoImgWrapper">
                <img alt="#" src={Image} />
              </div> */}

              <div className="isoListContent">
                <div className="isoListHead">
                  <h5>My Messages</h5>
                  {/* <span className="isoDate">Expire in: {massage.expire}</span> */}
                </div>
                <p>{massage.message}</p>
              </div>
            </a>
          ))
          
          
          }
         
        </div>
        {userinfo.permission === 3 ? 
        <a  onClick={this.hide} className="isoViewAllBtn">
          <Link to={`${url}/Messages`} >
            <IntlMessages id="topbar.viewAll" />
          </Link>
        </a>
        : "" }
      </TopbarDropdownWrapper>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i
            className="ion-chatbubbles"
            style={{ color: customizedTheme.textColor }}
          />
          <span>{userinfo.permission === 3 ? list.length : list2.length}</span>
        </div>
      </Popover>
    );
  }
}

export default connect(state => ({
  ...state.App.toJS(),
  customizedTheme: state.ThemeSwitcher.toJS().topbarTheme
}))(TopbarMessage);
