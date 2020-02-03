import {React,Component} from 'react';

class Abc extends Component{
    state = {

    }
    toGetData = () =>{
        console.log(123)
    }
    render(){
        return(
            <div>
                aaa
                <button onClick={this.toGetData}>点击请求</button>
            </div>
        )
    }
}
export default Abc;