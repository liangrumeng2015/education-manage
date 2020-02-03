import React, { Component } from 'react';
import ImageEditor from 'image-editor-little';

let endYHeight = 0,   // 结束高度  （右下角）
    startYHeight = 0,    // 开始高度  (左上角)
    XWidth = 200,   // 固定宽度
    distanceY = 0;   // 相对于img的x，类似offsetX
class canvasImg extends Component{
    constructor(props){
        super(props);
        this.state = {
            startX: "", //画画开始的X坐标
            startY: "", //画画开始的Y坐标
            endX: "", //画画结束的X坐标
            endY: "", //画画结束的Y坐标
            isMouseDownInCanvas: "", //鼠标是否按下
            customcxt: "", // cxt
            customRwidth: "", //原图与展示图片的宽度比
            customRheight: "", //原图与展示图片的高度比
            imgstyle: "", //根据图片大小自适应样式
            canvasstyle: "", //根据图片大小canvas自适应样式 居中显示
            canvasWidth: "", //根据图片大小自适应canvas宽
            canvasHeight: "", //根据图片大小自适应canvas高
            DivWidth: 1460, //最大宽度
            DivHeight: 740, //最大高度
            imgSrc:require('@/assets/page01.png'),
            canvasTop:0,
            canvasLeft:0
        }
    }
    
    //取消时返回组件调用处所需的数据
    customClose =() => {
        this.state.customcxt.clearRect(0, 0, this.state.DivWidth, this.state.DivHeight);
        console.log('取消',this.state.DivWidth,this.state.DivHeight)
    }
    //确定时返回组件调用处所需的数据
    customQuery = () =>{
        // this.customcxt.clearRect(0, 0, this.DivWidth, this.DivHeight);
        //根据绘制进行图片裁剪
  
        //获取矩形框Left，Width'
        let cLeft = 0;
        let cWidth = 0;
        if (this.state.startX > this.state.endX) {
          cLeft = this.state.endX;
          cWidth = this.state.startX - this.state.endX;
        } else {
          cLeft = this.state.startX;
          cWidth = this.state.endX - this.state.startX;
        }
  
        //获取矩形框Top，Height
        let cTop = 0;
        let cHeight = 0;
        if (this.state.startY > this.state.endY) {
          cTop = this.state.endY;
          cHeight = this.state.startY - this.state.endY;
        } else {
          cTop = this.state.startY;
          cHeight = this.state.endY - this.state.startY;
        }
        // var oMark = [];
        // oMark["offsetLeft"] = parseInt(cLeft / this.customRwidth);
        // oMark["offsetTop"] = parseInt(cTop / this.customRheight);
        // oMark["offsetWidth"] = parseInt(cWidth / this.customRwidth);
        // oMark["offsetHeight"] = parseInt(cHeight / this.customRheight);
  
        var markLocation = [];   // 存储x、y的坐标，及矩形的宽高
        markLocation['xx'] = XWidth ; // x轴坐标
        markLocation['yy'] = startYHeight;  // y轴坐标
        markLocation['RecWidth'] = XWidth;   // 矩形宽度
        markLocation['RecHeight'] = endYHeight - startYHeight   // 矩形高度
  
        // this.$emit("custom", { type: 2, data: markLocation });
        console.log('markLocation====',markLocation)
      }
    //dialog展示自定义矩形框画板，计算img与canvas标签自适应图片的大小
    show =() =>{
        console.log('-------show----')
          let customCanvas = document.getElementById('table'); // canvas显示层
          this.state.customcxt = customCanvas.getContext("2d");
          let img = new Image();
          img.src = this.state.imgSrc;
          let that = this;
          img.onload = function() {
            let canvasleft = 0;
            let canvastop = 0;
            let WrH = img.width / img.height; //图片宽高比
            let RWrH = that.state.DivWidth / that.state.DivHeight; //放置图片DIV的宽高比
            console.log('WrH',img.width);
  
  
            let aa = 0;
            // 根据宽高比大小判断确定自适应的宽和高
            if (RWrH > WrH) {
              aa = that.state.DivHeight / img.height;
              that.setState({
                canvasHeight:that.state.DivHeight,
                canvasWidth:img.width * aa,
              })
              canvasleft = (that.state.DivWidth - that.state.canvasWidth) / 2;
            } else {
              aa = that.state.DivWidth / img.width;
              that.setState({
                canvasHeight:img.height * aa,
                canvasWidth:that.state.DivWidth
              })
              canvastop = (that.state.DivHeight - that.state.canvasHeight) / 2;
            }
            that.imgstyle =
              " position: 'relative';  width:" +
              that.state.canvasWidth +
              " px; height:" +
              that.state.canvasHeight +
              "px"; //img浮动定位居中显示
              that.setState({
                customRwidth:that.state.canvasWidth / img.width, //原图与展示图片的宽高比
                customRheight:that.state.canvasHeight / img.height,
                canvasstyle:"position: 'absolute',left: " +
                canvasleft +
                ", top: " +
                canvastop, //canvas浮动定位
                canvasLeft:canvasleft,
                canvasTop:canvastop
              })
              
          };
      }
      //鼠标按下时执行
    mousedown =(e)=> {
        let www = document.getElementById('box');
        if(document.documentElement.getBoundingClientRect){
            distanceY = Math.round(e.clientY - www.getBoundingClientRect().top);
            console.log('0000',distanceY,e.pageY,e.clientY);
        }
        // 鼠标按下时开始位置与结束位置相同 防止鼠标在画完矩形后 点击图画形成第二个图形
        this.setState({
            isMouseDownInCanvas:true,
            startX:0,
            startY:endYHeight,
            endX:XWidth,
            endY:distanceY,
        })
        startYHeight = this.state.startY;
        
        console.log('初始的位置('+this.state.startX,this.state.startY+')','结束位置：('+this.state.endX,this.state.endY+')','高度',startYHeight,endYHeight);
        this.mousemove(e);
      }
      //鼠标移动式时执行
    mousemove =(e)=> {
        let www = document.getElementById('box');
        if(document.documentElement.getBoundingClientRect){
            distanceY = Math.round(e.clientY - www.getBoundingClientRect().top);
            // console.log('0000',distanceY,e.pageY,e.clientY);
        }
        if (this.state.isMouseDownInCanvas) {
          // 当鼠标有按下操作时执行
          this.setState({
            endX:XWidth,
            endY:distanceY,
          })
          endYHeight = distanceY;
          console.log('鼠标移动得到的end('+this.state.endX,this.state.endY+')',startYHeight,endYHeight)
          let wwidth = this.state.endX - this.state.startX;
          let wheigth = this.state.endY - this.state.startY;
  
          // 清除指定区域的所有像素
          this.state.customcxt.clearRect(0, 0, this.state.DivWidth, this.state.DivHeight);
          this.state.customcxt.strokeStyle = " #00ff00"; //矩形框颜色
          this.state.customcxt.lineWidth = "1"; //矩形框宽度
          this.state.customcxt.strokeRect(this.state.startX, this.state.startY, wwidth, wheigth); //绘制矩形
        }
      }
      //鼠标松开时执行
    mouseup =(e)=> {
        this.setState({
            isMouseDownInCanvas:false
        })
    }
    Mouseleave = (e) =>{
        this.setState({
            isMouseDownInCanvas:false
        })
    }
    componentDidMount(){
        this.show();
    }

    render(){
        const {imgSrc,canvasWidth,canvasHeight,canvasTop,canvasLeft,imgstyle} = this.state;
        return(
            <div>
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

              
                <div id="customPositionDiv">
                    <div>
                    <div
                        onMouseDown={this.mousedown}
                        onMouseMove={this.mousemove}
                        onMouseUp={this.mouseup}
                        onMouseLeave={this.Mouseleave}
                        style={{position:'relative',width:canvasWidth,height:canvasHeight}}
                    >
                        <img src={imgSrc} style={{border:'1px solid red',position:'relative',width:canvasWidth,height:canvasHeight}}  id="box" />
                        {/* :style="imgstyle"  :width="canvasWidth" :height="canvasHeight" :style="canvasstyle" */}
                        <canvas id="table" style={{width:canvasWidth,height:
                        canvasHeight,position:'absolute',left:0,top:canvasTop}}></canvas>
                    </div>
                    </div>
                    <button onClick={this.customQuery}>确定</button>
                    <button onClick={this.customClose}>取消</button>
                </div>
            </div>
        )
    }
}
export default canvasImg;