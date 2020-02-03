
import * as services from '../services/services'
export default {
    namespace: 'manageDicModel1',
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
      // 编辑套卷信息reqAddPaper
      *addPaper({},{call,put,select}){
        const data = {
            packagedPapersName:'123',   // 套卷名称
            provinceCode:'1111',   // 省份编码
            gradeId:'3',   // 年级
            subjectId:'4444',   // 科目id
            tutorialVersionId:'',   // 教材版本id
            frontCoverUrl:'',   // 封面路径
            paperTitle:'',   // 套卷标题
            difficulty:'',   // 套卷难度
            suitableInfo:'',   // 适用对象
            paperDetail:''    // 试卷详情
        }
        console.log(data)
        const res = yield call(services.reqAddPackagedPapers,data)
        // if(res.state == '')
      },
      
    },
    subscriptions:{      // 订阅,触发
        getList({dispatch,history}){
            return history.listen(({pathname})=>{
                if(pathname == '/123'){
                  console.log('我是管理套卷页面')
                    dispatch({
                      type:'addPaper',
                    }) 
                }
            })
        }

    }
  }