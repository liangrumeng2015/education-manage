// 管理试卷
import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd'
import styles from './index.scss'
import TestPagesForm from './components/testPagesForm'
import YTable from '../components/YTable'

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
  render() {
    
    return (
      <div className={styles.setpages_wrapper}>
        <YTable />
        <Button type="primary" onClick={this.showModal}>添加套卷</Button>
        <Modal
          title="添加套卷"
          visible={this.state.visible}
          okText="确认"
          cancelText="取消"
          onOk={this.confirmModal}
          onCancel={this.hideModal}
        >
          <TestPagesForm />
        </Modal>

      </div>
    )
  }
}
export default setPageModal;