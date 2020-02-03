import React from 'react';
import {Form,Icon,Input,Button} from 'antd'
import {MANAGE_NAME} from '../../config/Constant'
import styles from './login.scss'

const FormItem = Form.Item;

// 登录
const Login = ({form}) =>{
    const { getFieldDecorator } = form;
    const submitHandler = () =>{
        form.validateFields((err,values)=>{
            if(!err){
                console.log(values);
                // 走登录接口
                
            }else{
                console.log(err);
            }
        })
    }
    
    return(
        <div>
            <Form className={styles.form_part}>
                <h3 className={styles.txt}>{MANAGE_NAME}</h3>
                <FormItem>
                    {
                        getFieldDecorator('username',{
                            rules:[{
                                required:true,
                                message:'请输入有效的用户名'
                            }]
                        })(
                            <Input prefix={<Icon type="user" />} placeholder="请输入用户名" autoFocus />
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('password',{
                            rules:[{
                                required:true,
                                message:'请输入有效的密码'
                            }]
                        })(
                            <Input type="password" prefix={<Icon type="lock" />} placeholder="请输入密码" />
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={submitHandler}>登录</Button>
                </FormItem>
            </Form>
        </div>
    )
}
export default Form.create()(Login);