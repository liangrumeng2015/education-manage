// 管理标签
import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd'
import styles from '../index.scss'
import YTable from '../components/YTable'
import TipsForm from './components/tipsForm'
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
    const msg = "添加标签"
    return (
      <div className={styles.setpages_wrapper}>
        <YTable />
        <Button type="primary" onClick={this.showModal}>{msg}</Button>
        <Modal
          title={msg}
          visible={this.state.visible}
          okText="确认"
          cancelText="取消"
          onOk={this.confirmModal}
          onCancel={this.hideModal}
        >
          <TipsForm />
        </Modal>

      </div>
    )
  }
}
export default setPageModal;