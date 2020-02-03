import React from 'react';
import {Form,Input,Select,Radio,Modal,Upload, message, Button, Icon} from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol:{span:6},
  wrapperCol:{span:14}
}
 const dicForm = () =>{
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
              <FormItem label="教师姓名" {...formItemLayout}>
                <Input placeholder="" />
              </FormItem>
              <FormItem label="手机号" {...formItemLayout}>
                <Select>
                  <Option value=""></Option>
                </Select>
              </FormItem>
              <FormItem label="性别" {...formItemLayout}>
                <RadioGroup name="radiogroup" defaultValue={1}>
                    <Radio value={1}>女</Radio>
                    <Radio value={2}>男</Radio>
                    </RadioGroup>
              </FormItem>
              <FormItem label="职称" {...formItemLayout}>
                <Input placeholder="" />
              </FormItem>
              <FormItem label="简介" {...formItemLayout}>
                <TextArea rows={4} placeholder="" style={{resize:'none'}} />
              </FormItem>
              <FormItem label="详细介绍" {...formItemLayout}>
                <TextArea rows={4} placeholder="请输入试卷详情" style={{resize:'none'}} />
              </FormItem>
              <FormItem label="上传头像" {...formItemLayout}>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> 点击上传
                    </Button>
                    </Upload>
              </FormItem>
            </Form>
        </div>
    )
 }
 export default dicForm;