// 管理省份信息
import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd'
import styles from '../index.scss'
import YTable from '../components/YTable'
import ProvinceForm from './components/provinceForm'
class setPageModal extends Component {
  render() {
    const msg = '添加省份信息'
    return (
      <div className={styles.setpages_wrapper}>
        <YTable />
      <Button type="primary" onClick={this.showModal} style={{marginRight:'10px'}}>{msg}</Button>
      <Button type="primary" onClick={this.showModal}>批量导入省份信息</Button>
        <Modal
          title={msg}
          visible={false}
          okText="确认"
          cancelText="取消"
          onOk={this.confirmModal}
          onCancel={this.hideModal}
        >
          <ProvinceForm />
        </Modal>

      </div>
    )
  }
}
export default setPageModal;