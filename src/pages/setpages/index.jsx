// 管理套卷
import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd'
import styles from './index.scss'
import SetPagesForm from './components/setPagesForm'
import YTable from '../components/YTable'
import { connect } from 'dva'

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
          title=""
          visible={this.state.visible}
          okText="确认"
          cancelText="取消"
          onOk={this.confirmModal}
          onCancel={this.hideModal}
        >
          <SetPagesForm />
        </Modal>

      </div>
    )
  }
}
const mapStateToProps = (setPagesModel) => {
  console.log('jsx页面',setPagesModel);
  return  { ...setPagesModel }
}
export default  connect(mapStateToProps)(setPageModal);