import React from 'react';
import {Form,Input,Select} from 'antd'
const FormItem = Form.Item;
const formItemLayout = {
  labelCol:{span:6},
  wrapperCol:{span:14}
}
 const provinceForm = () =>{
    return(
        <div>
            <Form>
              <FormItem label="省份编码" {...formItemLayout}>
                <Input placeholder="" />
              </FormItem>
              <FormItem label="省份名称" {...formItemLayout}>
                <Input placeholder="" />
              </FormItem>
            </Form>
        </div>
    )
 }
 export default provinceForm;