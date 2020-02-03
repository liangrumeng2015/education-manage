// 管理试卷字典
import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd'
import styles from '../index.scss'
import YTable from '../components/YTable'
import DicForm from './components/dicForm'
import { connect } from 'dva'
class setPageModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false
    }
  }
  // 添加字典
  showModal = () => {
    console.log(this.props)
    this.setState({
      visible:true
    })
    // this.props.dispatch({
    //   type: 'manageDicModel/setVisible',
    //   payLoad: {
    //     modalVisible: true
    //   }
    // })
  }
  // Modal取消
  hideModal = () => {
    this.setState({
      visible:false
    })
    // this.props.dispatch({
    //   type: 'manageDicModel/setVisible',
    //   payLoad: {
    //     modalVisible: false
    //   }
    // })
  }
  // Modal 确定
  confirmModal = () => {
    console.log(this.props)
    // this.props.dispatch({
    //     type: 'manageDicModel/addDic',
    //     payLoad: {
          
    //     }
    //   })
  }
  render() {
    const msg = '添加字典信息'
    console.log('管理字典页面的state', this.props.manageDicModel)
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
          <DicForm />
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (manageDicModel) => {
  console.log('管理字典页面', manageDicModel);
  return { ...manageDicModel }
}
export default connect(mapStateToProps)(setPageModal);