import React from 'react';
import { Form, Input, Select, Radio, Upload, message, Button, Icon, Checkbox, Row, Col } from 'antd'
import CutPic from './cutPic'
import Test from './test'
import {connect} from 'dva'
import { Component } from 'react';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 }
}
class dicForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      radioStatus:1,
      selectPaperStatus:0
    }
  }
  handleSubmit = () =>{
    console.log('表单')
  }
  submitHandler = () =>{
    this.props.dispatch({
      type:'manageTopicsModel/getData',
      payLoad:{
        // subjectPoint:a,
        paperId:1,
        hasExplain:0,
        subjectTypeId:1,
        packagedPapersId:1,
        vipRestriction:1,
        sourceInfo:'素材信息新信息',   // 素材信息
        explainTeacherId:'123',   // 讲解老师id
        difficultyLevel:'难'   // 题目难度
      }
    })
  }
  radioChange = (idx) =>{
    this.setState({
      radioStatus:idx
    })
    console.log('改变',idx);
  }
  selectTimu = (idx) =>{
    console.log('选择题目',idx)
  }
  selectHandler = (idx) =>{
    this.setState({
      selectPaperStatus:idx
    })
    console.log('选择试卷',idx)
  }

  render() {
    const props1 = {
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
    const { Option } = Select;
    // const { getFieldDecorator } = this.props.form;
    const arr = ['选择题','填空题','简答题'];
    const shijuan = ['广州初二化学试卷','广州初二生物试卷','广州初二物理试卷']

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="试卷名称" {...formItemLayout}>
            <Select onSelect={this.selectHandler.bind(this)}>
                <Option value="1">广州初二化学试卷</Option>
                <Option value="2">广州初二生物试卷</Option>
                <Option value="3">广州初二物理试卷</Option>
                <Option value="4">广州初二物理1试卷</Option>
            </Select>
          </FormItem>
          <FormItem label="非会员权限" {...formItemLayout}>
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={5}>
                  <Checkbox value="A">查看答案</Checkbox>
                </Col>
                <Col span={5}>
                  <Checkbox value="B">查看讲解</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </FormItem>
          <FormItem label="难度" {...formItemLayout}>
            <RadioGroup name="radiogroup" defaultValue={1}>
              <Radio value={1}>简单</Radio>
              <Radio value={2}>中的</Radio>
              <Radio value={3}>困难</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="题目类型" {...formItemLayout}>
            <Select onSelect={this.selectTimu.bind(this)}>
              {
                arr.map((item,idx)=>{
                  return(
                    <Option value={idx} key={idx}>{item}</Option>
                  )
                })
              }
            </Select>
          </FormItem>
            {
              this.state.selectPaperStatus == 0?'':
              <FormItem label="选取题目" {...formItemLayout}>
                <Test />
              </FormItem>
            }
          
          <FormItem label="讲解" {...formItemLayout}>
            <RadioGroup name="radiogroup" defaultValue={1}>
              <Radio value={1} onChange={this.radioChange.bind(this,'1')}>无</Radio>
              <Radio value={2} onChange={this.radioChange.bind(this,'2')}>有</Radio>
            </RadioGroup>
          </FormItem>
          {
            this.state.radioStatus == 1?'':
              <div>
                <FormItem label="讲解老师" {...formItemLayout}>
                  <Select>
                    <Option value="1">梁1老师</Option>
                    <Option value="2">梁2老师</Option>
                    <Option value="3">梁3老师</Option>
                    <Option value="4">梁4老师</Option>
                  </Select>
                </FormItem>
                <FormItem label="素材信息" {...formItemLayout}>
                  <Input />
                </FormItem>
                <FormItem label="素材路径" {...formItemLayout}>
                  <Upload {...props1}>
                    <Button>
                      <Icon type="upload" /> 点击上传
                        </Button>
                  </Upload>
                </FormItem>
              </div>
            
          }
          
          <FormItem>
              <Button type="primary" onClick={this.submitHandler}>
                提交页面信息
              </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const mapStateToProps = (manageTopicsModel) => {
  console.log('jsx页面,manageTopicsModel',manageTopicsModel);
  return  { ...manageTopicsModel }
}
export default connect(mapStateToProps)(dicForm);