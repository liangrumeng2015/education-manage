// 管理套卷
import React, { Component } from 'react'
import {reqTest,reqTest1} from '../../services/services'
import { Table, Button, Modal } from 'antd'
import styles from '../index.scss'
import YTable from '../components/YTable'
import TopicsForm from './components/TopicsForm'
import Test from './components/test'
class setPageModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  showModal = () =>{
    this.setState({
      visible: true,
    });
  }
  hideModal = () =>{
    this.setState({
      visible: false,
    });
  }
  confirmModal = () =>{
    console.log('需要判断全部填写');
  }
  toGetData = async() =>{
    console.log('toGetData')
    var params = {
      stuNumber:'20190002',
      password:'123456',
      roleId:'2'
    }

    const result = await reqTest1(params);
    console.log('post请求返回的结果===',result);
  }
  render() {
    
    return (
      <div className={styles.setpages_wrapper}>
        {/* <YTable /> */}
        {/* <Button type="primary" onClick={this.showModal}>添加题目</Button> */}
        
        {/* <Modal
          title=""
          visible={false}
          okText="确认"
          cancelText="取消"
          onOk={this.confirmModal}
          onCancel={this.hideModal}
        >
        </Modal> */}
        <TopicsForm />
        {/* <Test/> */}


        <button onClick={this.toGetData}>点击请求</button>
      </div>
    )
  }
}
export default setPageModal;