import React from 'react';
import {Table,Button,Form,Input,Select,Radio,Modal} from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol:{span:6},
  wrapperCol:{span:14}
}
 const setPagesForm = () =>{
     
    return(
        <div>
            <Form>
              <FormItem label="套卷名称" {...formItemLayout}>
                <Input placeholder="请填入套卷名称" />
              </FormItem>
              <FormItem label="省份" {...formItemLayout}>
                <Select>
                  <Option value=""></Option>
                </Select>
              </FormItem>
              <FormItem label="年级" {...formItemLayout}>
                <Select>
                  <Option value=""></Option>
                </Select>
              </FormItem>
              <FormItem label="学科" {...formItemLayout}>
                <Select>
                    <Option value=""></Option>
                </Select>
              </FormItem>
              <FormItem label="教材版本" {...formItemLayout}>
                <Select>
                    <Option value=""></Option>
                </Select>
              </FormItem>
              <FormItem label="封面图片" {...formItemLayout}>
                
              </FormItem>
              <FormItem label="难度" {...formItemLayout}>
                <RadioGroup name="radiogroup" defaultValue={1}>
                  <Radio value={1}>简单</Radio>
                  <Radio value={2}>中等</Radio>
                  <Radio value={3}>困难</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="适用对象" {...formItemLayout}>
                <Input placeholder="适用对象" />
              </FormItem>
              <FormItem label="试卷详情" {...formItemLayout}>
                <TextArea rows={4} placeholder="请输入试卷详情" style={{resize:'none'}} />
              </FormItem>
            </Form>
        </div>
    )
 }
 export default setPagesForm;