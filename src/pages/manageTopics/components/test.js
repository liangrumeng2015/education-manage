import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import Cropper from 'react-cropper';
import { connect } from 'dva'
import { reqGetLatestSubject } from '@/services/services'
import Test2 from './test2'
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default
// const cropper = React.createRef(null);
let naturalHeight = ''
let leftTopPoint1 = '',
  leftTopPoint2 = '',
  rightTopPoint1 = '',
  rightTopPoint2 = '',
  leftDownPoint1 = '',
  leftDownPoint2 = '',
  rightDownPoint1 = '',
  rightDownPoint2 = '';
let needTop = 0;
var subjectPoint = [];

// 试卷
class Demo extends Component {
  constructor() {
    super()
    this.state = {
      needTop: '',
      newImg: '',
      visible: false,
      currentIdx: 0,  // 当前图片的索引 ,试卷
      currentIdxDaAn: 0
    }
  }
  //重新裁剪
  resetCropImage = () => {
    this.setState({
      visible: true
    })
  }
  // 确定重新裁剪
  handleOk = () => {
    this.setState({
      newImg: '',
      visible: false
    })
    subjectPoint.pop()    // 删除掉数组中的最后一个元素
  }
  // 取消
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  // 确定裁剪
  cropImage = () => {
    if (this.cropper.getCroppedCanvas() === 'null') {
      return false
    }
    this.setState({
      newImg: this.cropper.getCroppedCanvas().toDataURL(),
      pageAllHeight: parseInt(this.cropper.getCropBoxData().top + this.cropper.getCropBoxData().height)
    })
    console.log(this.cropper.getCropBoxData());
    console.log('距离上面的高度', this.cropper.getCropBoxData().top)
    console.log('截图的宽度', this.cropper.getCropBoxData().width)
    console.log('截图的高度', this.cropper.getCropBoxData().height)
    leftTopPoint1 = 0;
    leftTopPoint2 = Math.round(this.cropper.getCropBoxData().top);
    rightTopPoint1 = Math.round(this.cropper.getCropBoxData().width);   // 固定
    rightTopPoint2 = Math.round(this.cropper.getCropBoxData().top);
    leftDownPoint1 = 0;
    leftDownPoint2 = Math.round(this.cropper.getCropBoxData().top + this.cropper.getCropBoxData().height);
    rightDownPoint1 = Math.round(this.cropper.getCropBoxData().width);
    rightDownPoint2 = Math.round(this.cropper.getCropBoxData().height + this.cropper.getCropBoxData().top);
    var obj = {
      leftTopPoint: '(' + leftTopPoint1 + ',' + leftTopPoint2 + ')',
      rightTopPoint: '(' + rightTopPoint1 + ',' + rightTopPoint2 + ')',
      leftDownPoint: '(' + leftDownPoint1 + ',' + leftDownPoint2 + ')',
      rightDownPoint: '(' + rightDownPoint1 + ',' + rightDownPoint2 + ')',
      pageId: this.state.currentIdx + 1,
      type: 'shijuan'
    }
    subjectPoint.push(obj);
    console.log(subjectPoint, '试卷');
    this.props.dispatch({
      type: 'manageTopicsModel/existImg',
      subjectPoint: subjectPoint
    })
  }
  // 初始化裁剪框
  _ready(event) {
    var that = this;
    console.log('初始化')
    // that.getTop(that);
    // that.cropper.setCropBoxData({
    //   width: 800,   // 固定宽度
    //   height: '',
    //   top: needTop,
    //   right: 0
    // })
    console.log(event);
    naturalHeight = event.target.naturalHeight
    console.log('原始宽高', event.target.naturalWidth, event.target.naturalHeight, this.state.needTop)
    console.log(this.cropper.getCropBoxData());
  }
  cropmove = () => {
    console.log('-------2222222------')
    var that = this;
    console.log('cropmove', typeof needTop, needTop)
    that.cropper.setCropBoxData({
      width: 800,   // 固定宽度
      height: '',
      top: needTop,
      right: 0
    })
  }
  // 请求获取高度
  getTop = (that) => {
    // 1 标准卷    2  答案卷
    reqGetLatestSubject({ paperId: 1, subjectType: 1 }).then(res => {
      console.log('reqCnode请求结果', res)
      if (res.module) {
        needTop = res.module.leftDownPoint.split(')')[0].split(',')[1]   // 500
        needTop = parseInt(needTop);
        console.log('needTop1', needTop)
        this.setState({
          currentIdx: parseInt(res.module.pageId - 1)
        })
      } else {
        needTop = 0;
      }
    })
  }
  // 提交的接口
  submitHandler = () => {
    console.log('正要去提交', subjectPoint)
    function unique(arr1) {
      const res = new Map();
      return arr1.filter((a) => !res.has(a.pageId) && res.set(a.pageId, 1))
    }
    var a = unique(subjectPoint)
    console.log(a);
    this.props.dispatch({
      type: 'manageTopicsModel/getData',
      payLoad: {
        // subjectPoint:a,
        paperId: 1,
        hasExplain: 0,
      }
    })
  }
  componentWillMount() {
    var that = this;
    this.getTop()
    console.log('needTop', needTop)
  }
  handlerTest = () => {
    console.log('测试测试');
    this.props.dispatch({
      type: 'manageTopicsModel/testApi',
      payload: {
        image_id: '1',
        permission_id: '22',
        warrant_name: 'ee',
        third_user_id: '33'
      }
    })
  }
  // 点击图片
  clickImg(a) {
    console.log('+a++++++++', a);
    if (a != this.state.currentIdx) {
      console.log('不相等');
      needTop = 0;
    }
    this.setState({
      currentIdx: a
    })
  }
  // clickImgDaAn  答案
  clickImgDaAn(a) {
    console.log('+++++++++', a);
    this.setState({
      currentIdxDaAn: a
    })
  }
  render() {
    console.log('testtestets', this.props);
    const { newImg, currentIdx, currentIdxDaAn } = this.state;
    console.log('oooooooo', this.state.currentIdx);
    // list1 题目
    const list1 = [require('@/assets/page01.png'), require('@/assets/page02.png'), require('@/assets/page03.png'), require('@/assets/page04.png')];    // 试卷列表
    // const list1 = [];
    let imgIdx = list1[currentIdx];

    // list2 答案
    // const list2 = []
    const list2 = [require('@/assets/page04.png'), require('@/assets/page03.png'), require('@/assets/page02.png'), require('@/assets/page01.png')];    // 试卷列表
    let imgIdx2 = list2[currentIdxDaAn];
    var crop = this;

    return (
      <div>
        <div style={{ display: 'flex' }}>
          {
            list1.map((item, idx) => {
              return (
                <div key={idx} onClick={this.clickImg.bind(this, idx)}>
                  <img src={item} width={200} alt="" />
                </div>
              )
            })
          }
        </div>
        <Cropper
          ref={cropper => {
            this.cropper = cropper;
          }}
          src={imgIdx}
          style={{ height: '500px', width: '100%' }}
          // Cropper.js options
          // zoomable  可缩放 
          // autoCropArea={1}   // 0-1自定义截取区域的大小
          viewMode={1}   // viewMode  1限制裁剪框不要超出画布
          guides={false}
          zoomable={false}
          ready={this._ready.bind(this)}
          minCanvasHeight={50}
          cropmove={this.cropmove}
          autoCrop={false}     // 是否自动显示裁剪框
        />
        <div style={{ color: 'red' }}>当前裁剪的图片展示：</div>
        <img style={{ width: '100%' }} src={newImg} alt="" />
        <Button type="primary" size="large" onClick={this.cropImage} style={{ margin: '10px' }}>
          确认裁剪
        </Button>
        <Button type="primary" size="large" onClick={this.resetCropImage} style={{ margin: '10px' }}>
          重新裁剪
        </Button>

        {/* <Button onClick={this.handlerTest}>
          请求测试接口
        </Button> */}

        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered
          closable={false}
          width={200}
          okText={'确定'}
          cancelText={'取消'}
        >
          <div>确定要取消？</div>
        </Modal>
        {/* <h1 style={{margin:'30px auto'}}>答案裁剪</h1>
        <div style={{display:'flex'}}>
          {
            list2.map((item,idx)=>{
              return(
                <div key={idx} style={{border:'1px solid red'}} onClick={this.clickImgDaAn.bind(this,idx)}>
                  <img src={item} width={200}  alt=""/>
                </div>
              )
            })
          }
        </div>
        <Cropper
        ref={cropper => {
          this.cropper = cropper;
        }}
        src={imgIdx2}
        style={{height: '500px',width:'100%'}}
        // Cropper.js options
        // zoomable  可缩放 
        // autoCropArea={1}   // 0-1自定义截取区域的大小
        viewMode={1}   // viewMode  1限制裁剪框不要超出画布
        guides={false}
        zoomable={false}
        ready={this._ready.bind(this)}
        cropmove={this.cropmove}
        // autoCrop={false}     // 是否自动显示裁剪框
        />   */}
        <Test2 />

        <Button type="primary" size="large" onClick={this.submitHandler} style={{ margin: '10px' }}>
          提交接口
        </Button>

      </div>
    );
  }
}
const mapStateToProps = (manageTopicsModel) => {
  console.log('jsx页面,manageTopicsModel', manageTopicsModel);
  return { ...manageTopicsModel }
}
export default connect(mapStateToProps)(Demo);
