import React from 'react';
import { Table, Button, Modal } from 'antd'
import styles from '../index.scss'
const YTable = () =>{
    const columns = [
        { title: '试卷名称', dataIndex: 'name', key: 'name',width:200 },
        { title: '上级题目', dataIndex: 'age', key: 'age',width:100 },
        { title: '难度', dataIndex: 'address', key: 'address',width:300 },
        { title: '题目类型', dataIndex: 'ver', key: 'ver',width:200 },
        {
          title: '操作',
          dataIndex: '',
          key: 'x',
          width:200,
          render: () => (
            <span className={styles.status_btn}>
              <Button type="primary">编辑</Button>
              <Button type="primary">删除</Button>
            </span>
          ),
        },
      ];
  
      const data = [
        {
          key: 1,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          ver: '222',
          description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
        {
          key: 2,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          ver: '222',
          description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        },
      ];
    return(
        <div>
            <Table
                bordered
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}
export default YTable;