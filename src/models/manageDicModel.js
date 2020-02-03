import * as services from '../services/services'
export default {
    namespace: 'manageDicModel',
    state: {
        modalVisible:false,

        list:[],   // 用户list
        total:0,    // 总的数据
        page:1,    // 当前的页码
        pageSize: 5 // 每页的条数

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
    },
    effects: {
        // 获取套卷列表
      *getData({}, { call, put ,select}) {
        const res = yield call(services.reqPackagedPapersList)
        if(res.success){
            console.log('获取套卷列表的数据',res.module);
          yield put({
            type:'setData',
            payload:{...res.data}
          })
        }
      },
      // 编辑套卷信息
      *addPaper({},{call,put,select}){
        const data = {
            packagedPapersName:'',   // 套卷名称
            provinceCode:'',   // 省份编码
            gradeId:'',   // 年级
            subjectId:'',   // 科目id
            tutorialVersionId:'',   // 教材版本id
            frontCoverUrl:'',   // 封面路径
            paperTitle:'',   // 套卷标题
            difficulty:'',   // 套卷难度
            suitableInfo:'',   // 适用对象
            paperDetail:''    // 试卷详情
        }
        const res = yield call(services.reqAddPackagedPapers,data)
        // if(res.state == '')
      },
      *addDic({payload},{call,put,select}){
        console.log('添加字典信息的参数',payload);
        return;
        const res = yield call(services.reqAddDir);
        console.log('添加字典信息返回的结果',res);
      }
    },
    subscriptions:{      // 订阅,触发
        getList({dispatch,history}){
            return history.listen(({pathname})=>{
                if(pathname == '/setPages'){
                  console.log('我是管理套卷页面')
                    dispatch({
                      type:'getData',
                    }) 
                }
            })
        }

    }
  }