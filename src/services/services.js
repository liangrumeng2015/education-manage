import request from '../utils/request';
import Axios from '../utils/axios';
const proxy = '/api'
const httpUrl = '/api'

export function query() {
  return request('/api/users');
}
// 代理接口
export function reqCnode(){
  return request(proxy + '/api/v1/topics');
}
// 注册mock接口
export function reqMockData(){
  return request('/api/mockdata');
}

// 获取套卷列表接口
export function reqPackagedPapersList(){
    return request(httpUrl+ '/v1/paper/packagedPapersList.do');
}

// 新增套卷接口
export function reqAddPackagedPapers(data){
  return request(httpUrl + '/v1/paper/addPackagedPapers.do',{method:'POST',body:JSON.stringify(data)});
}

// 上传文件接口
export function reqUploadFile(){
  return request(httpUrl + '/v1/paper/uploadFile.do');
}

// 获取试卷列表接口
export function reqPapersList(){
  return request(httpUrl + '/v1/paper/papersList.do');
}

// 新增试卷接口
export function reqAddPaper(){
  return request(httpUrl + '/v1/paper/addPaper.do');
}

// 编辑试卷接口
export function reqUpdatePaper(){
  return request(httpUrl + '/v1/paper/updatePaper.do')
}

// 获取题目列表接口
export function reqGetSubjectList(){
  return request(httpUrl + '/v1/paper/getSubjectList.do')
}

// 添加题目接口    提交接口difficultyLevel:'难',
        // subjectTypeId:1,
        // packagedPapersId:1,
        // vipRestriction:1,   +'&subjectTypeId='+encodeURI(subjectTypeId)+'&packagedPapersId='+encodeURI(packagedPapersId)+'&vipRestriction='+encodeURI(vipRestriction)
                           // subjectPoint,subjectAnswerPoint,hasExplain,paperId,subjectTypeId,packagedPapersId,vipRestriction
//  {subjectPoint,subjectAnswerPoint,hasExplain,paperId,subjectTypeId,packagedPapersId,vipRestriction,sourceInfo,explainTeacherId}
export function reqAddSubject(data){
  return Axios(httpUrl + '/v1/paper/addSubject.do',data,'post')
}
// getPictureList.do
export function reqAGetPictureList(){
  return request(httpUrl + '/v1/paper/getPictureList.do')
}

// /v1/paper/ getLatestSubject.do
export function reqGetLatestSubject({paperId,subjectType}){
  console.log('paperId,subjectType',paperId,subjectType)
  return Axios(httpUrl + '/v1/paper/getLatestSubject.do?paperId='+encodeURI(paperId)+'&subjectType='+encodeURI(subjectType))
}


// 获取教师列表接口
export function reqGetTeacherList(){
  return request(httpUrl + '/v1/paper/getTeacherList.do')
}

// 添加教师信息接口
export function reqAddTeacherInfo(){
  return request(httpUrl + '/v1/paper/addTeacherInfo.do')
}

// 获取标签列表接口
export function reqGetLabelList(){
  return request(httpUrl + '/v1/paper/getLabelList.do')
}

// 添加标签列表接口
export function reqAddLabel(){
  return request(httpUrl + '/v1/paper/addLabel.do')
}

// 获取省份列表接口
export function reqGetProvinceList(){
  return request(httpUrl + '/v1/paper/getProvinceList.do')
}

// 获取字典列表接口
export function reqGetDirList(){
  return request(httpUrl + '/v1/paper/getDirList.do')
}

// 增加字典列表接口
export function reqAddDir(){
  return request(httpUrl + '/v1/paper/addDir.do')
}


export function reqTest(params){
  // return request(proxy + '/element/getUsersList.do',{method:'POST',body:JSON.stringify(params)})
  return request(proxy + '/teachtool/login/loginstate',{method:'POST',body:params})

}
export function reqTest1(data){
  return Axios(proxy + '/teachtool/login/loginstate',data,'post')
}
