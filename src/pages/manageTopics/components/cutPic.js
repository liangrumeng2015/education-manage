import React, { Component } from 'react';
import styles from '../index.scss'
import CanvasImg from './canvasImg'
class cutPic extends Component{
    
    render(){
        const list = [
            require('@/assets/page01.png'),
            require('@/assets/page02.png'),
            require('@/assets/page03.png'),
            require('@/assets/page04.png'),
            require('@/assets/page05.png')
        ]
        return(
            <div className={styles.wrapper}>
                <div className={styles.content}>
                {
                    list.map((item,idx)=>(
                        <div className={styles.itemwraper} key={idx}>
                            <img src={item} style={{width:'300px'}} alt="" />
                        </div>
                    ))
                }
                </div>
                左右滑动查看更多题目

                {/* <CanvasImg/> */}
                {/* <div>
                    <img src={require('@/assets/page01.png')} alt="" id="currentImg" style={{width:'100%'}} onLoad={e => {
                    let originWidth = e.target.naturalWidth;
                    let originHeight = e.target.naturalHeight;
                    let currentWidth = e.target.width;
                    let currentHeight = e.target.height;
                    console.log('原始的宽',originWidth);
                    console.log('原始的高',originHeight);
                    console.log('当前的宽',currentWidth);
                    console.log('当前的高',currentHeight)
                }} />
                </div> */}
            </div>
        )
    }
}
export default cutPic;