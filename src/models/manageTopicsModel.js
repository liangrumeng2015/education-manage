import * as services from '../services/services'
export default {
    namespace: 'manageTopicsModel',
    state: {
        modalVisible:false,
        list:[],   // 用户list
        list1:['http://39.105.134.221:8080/test/page1.png'],
        total:0,    // 总的数据
        page:1,    // 当前的页码
        pageSize: 5, // 每页的条数
        subjectPoint:[],
        subjectAnswerPoint:[]
    },
    reducers: {
        setVisible(state,payLoad){
            console.log('setVisible==',payLoad);
            let _state = JSON.parse(JSON.stringify(state));
            _state.modalVisible = payLoad.payLoad.modalVisible;
            return _state;
        },
      setData(state,{payload:{list,total,page}}) {
            console.log(list,total,page)
           return {...state,list,total,page} 
        },
        getPaperList(state,payLoad){
            console.log('getPaperList',payLoad)
            let _state = JSON.parse(JSON.stringify(state));
            _state.list1 = payLoad.payload
            return _state
        },
        getDataParams(state,payload){
            console.log('999999',payload)
            let _state = JSON.parse(JSON.stringify(state));
            _state.subjectPoint = payload.payLoad.subjectPoint;
            _state.hasExplain = payload.payLoad.hasExplain;
            // paperId,subjectTypeId,packagedPapersId,vipRestriction
            return _state;
        },
        getTopData(state,payload){
            console.log('getTopData',payload)
            let _state = JSON.parse(JSON.stringify(state));
            var val = payload.payload.leftDownPoint;  //（0，500）
            _state.needTop = val.split(')')[0].split(',')[1]   // 500
            console.log(_state.needTop)
            return _state;
        },
        existImg(state,payload){
            console.log('存放裁剪图片的地方【试卷】【答案】',payload);
            let _state = JSON.parse(JSON.stringify(state));
            function unique(arr1) {
                const res = new Map();
                return arr1.filter((a) => !res.has(a.pageId) && res.set(a.pageId, 1))
            }
             // 分来判断标准卷和答案
            if(payload.subjectPoint){
                var a =  unique(payload.subjectPoint)
                _state.subjectPoint = a;
            }else{
                var b =  unique(payload.subjectAnswerPoint)
                _state.subjectAnswerPoint = b;
            }
            return _state;
        }
    },
    effects: {
        // 获取套卷列表
        //  // subjectTypeId:1,
      // packagedPapersId:1,
      // vipRestriction:1,
      *getData({payLoad:{hasExplain,paperId,subjectTypeId,packagedPapersId,vipRestriction,sourceInfo,explainTeacherId}}, { call, put ,select}) {
         const subjectPoint = yield select(state => state.manageTopicsModel.subjectPoint);
         const subjectAnswerPoint = yield select(state => state.manageTopicsModel.subjectAnswerPoint);
         console.log(subjectPoint,subjectAnswerPoint);
         console.log('======提交========',hasExplain,paperId,subjectTypeId,packagedPapersId,vipRestriction);
         var data = {
            subjectPoint:JSON.stringify(subjectPoint),
            subjectAnswerPoint:JSON.stringify(subjectAnswerPoint),
            hasExplain,
            paperId,
            subjectTypeId,
            packagedPapersId,
            vipRestriction,
            sourceInfo,
            explainTeacherId
         }
         const res = yield call(services.reqAddSubject,data)

        if(res.success){
            console.log('提交题目接口返回',res.module);
          yield put({
            type:'setData',
            payload:{...res.data}
          })
        //   window.location.reload();
        }
      },
     
      *getPaperTop({payload:{paperId,subjectType}},{call,put,select}){
          console.log('payload',paperId);
          const res = yield call(services.reqGetLatestSubject,{paperId,subjectType});
          if(res.success){
            console.log('获取高度',res.module);
            yield put({
              type:'getTopData',
              payload:{...res.module}
            })
          }
      },
      *testApi({payload},{call,put,select}){
          console.log('test',payload)
        const res = yield call(services.reqTest);
        console.log('测试测试接口返回',res);
      },
      *getPaperListFn({payload},{call,put,select}){
          console.log('获取试卷列表');
          const res = yield call(services.reqAGetPictureList);
          console.log(res);
          if(res.success){
              yield put({
                  type:'getPaperList',
                  payload:{...res.module}
              })
          }
      }
    },
    subscriptions:{      // 订阅,触发
        // getList({dispatch,history}){
        //     return history.listen(({pathname})=>{
        //         if(pathname == '/manageTopics'){
        //           console.log('我是manageTopics页面')
        //             dispatch({
        //               type:'getPaperTop',
        //               payload:{
        //                 paperId:1
        //               }
        //             }) 
        //         }
        //     })
        // },
        getList1({dispatch,history}){
            return history.listen(({pathname})=>{
                if(pathname == '/manageTopics'){
                  console.log('我是getPaperList页面')
                    dispatch({
                      type:'getPaperListFn'
                    }) 
                }
            })
        }
    }
  }