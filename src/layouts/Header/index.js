import React from 'react';
import { Button, Popconfirm } from 'antd'
import { MANAGE_NAME, LOGO } from '../../config/Constant'
import styles from './index.scss'

const Header = (props) => {
    console.log('header', props)
    // 判断logo 是否存在
    let hasLogo = null;
    if (LOGO) {
        hasLogo = (
            <div className={styles.logo} >
                <img src={LOGO} alt="logo" />
            </div>
        )
    }
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.left_part}>
                    {hasLogo}
                    <h3 className={styles.title}>{MANAGE_NAME}</h3>
                </div>
                <div className={styles.welcome}>
                    <div className={styles.welcome_txt}>
                        欢迎你：{props.userName}
                    </div>
                    <div className={styles.login_out}>
                        <Popconfirm
                            placement="bottom"
                            title="确定要退出？"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={props.confirmSignOut}
                            onCancel={props.cancelSignOut}
                        >
                            <Button>退出</Button>
                        </Popconfirm>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;