import React from 'react';
import {Form,Input,Select,Radio} from 'antd'
const FormItem = Form.Item;
const formItemLayout = {
  labelCol:{span:6},
  wrapperCol:{span:14}
}
 const dicForm = () =>{
    return(
        <div>
            <Form>
              <FormItem label="标签内容" {...formItemLayout}>
                <Input placeholder="" />
              </FormItem>
            </Form>
        </div>
    )
 }
 export default dicForm;