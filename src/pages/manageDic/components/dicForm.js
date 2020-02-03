import React, { Component } from 'react';
import {Form,Input,Select,Radio,Modal,Button} from 'antd'
import {connect} from 'dva'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol:{span:6},
  wrapperCol:{span:14}
}
 class dicForm extends Component{
   constructor(props){
     super(props)
     this.state = {
      dicVal:'',
      selectType:''

     }
   }
  // 确定
  handlerConfirm = () =>{
    console.log('确认的参数',this.state.dicVal);
    // this.props.dispatch({
    //   type: 'manageDicModel/addDic',
    //   payLoad: {
        
    //   }
    // })
  }
   render(){
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    // const { username, dicVal, selectType } = this.props.record;
    const {dicVal,selectType} = this.state;

    return(
      <div>
          <Form>
            <FormItem label="值" {...formItemLayout}>
              {getFieldDecorator('dicVal', {
                rules: [
                  {
                    required: true,
                    message: '字典的值不能为空',
                  },
                ],
                initialValue: dicVal,
              })(<Input />)}
            </FormItem>
            <FormItem label="类型" {...formItemLayout}>
              {getFieldDecorator('selectType', {
                rules: [
                  {
                    required: true,
                    message: '请选择字典类型',
                  },
                ],
                initialValue: selectType,
              })(
                <Select>
                  <Option value="1">学科</Option>
                  <Option value="2">教程版本</Option>
                  <Option value="3">题型</Option>
                  <Option value="4">年级</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="适用学科" {...formItemLayout}>
              <Select>
                <Option value=""></Option>
              </Select>
            </FormItem>
          </Form>
          <Button type="primary" style={{margin:'20px'}} onClick={this.handlerConfirm}>确认</Button>
          <Button type="primary" style={{margin:'20px'}}>取消</Button>
      </div>
    )
   }
 }
 dicForm.defaultProps = {
  title: '添加用户',
  record: { type: '1', selectType: '', dicVal: '' },
};
 export default Form.create()(dicForm) ;