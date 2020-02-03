import React from 'react';
import styles from '../index.scss'
import {Form,Input,Select,Radio,Upload, message, Button, Icon} from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol:{span:6},
  wrapperCol:{span:14}
}
 const setPagesForm = () =>{
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return(
        <div>
            <Form>
              <FormItem label="套卷名称" {...formItemLayout}>
                <Select>
                  <Option value=""></Option>
                </Select>
              </FormItem>
              <FormItem label="试卷名称" {...formItemLayout}>
                <Input placeholder="请输入试卷名称" />
              </FormItem>
              <FormItem label="标准卷路径" {...formItemLayout}>
                <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> 点击上传
                    </Button>
                  </Upload>
              </FormItem>
              <FormItem label="答案卷路径" {...formItemLayout}>
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>
              </FormItem>
              <FormItem label="建议时长" {...formItemLayout}>
                <div className={styles.div_flex}>
                   <Input className={styles.input_flex} /> 分钟
                </div>
              </FormItem>
              <FormItem label="非会员下载权限" {...formItemLayout}>
                <RadioGroup name="radiogroup" defaultValue={1}>
                  <Radio value={1}>有</Radio>
                  <Radio value={2}>无</Radio>
                </RadioGroup>
              </FormItem>
            </Form>
        </div>
    )
 }
 export default setPagesForm;