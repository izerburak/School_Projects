import '../App.css';
import Loader from 'react-loader-spinner';
import React, {useState} from 'react'



export class VerificationPage extends React.Component {
    
    constructor(props) {
        super(props);
      }
    state = {
        code:"",
        msg:"Verified Successfully",
    }

    nextPath(path) {
        this.props.history.push(path);
      }

    componentDidMount(){
        
        this.state.code = this.props.match.params.verificationnumber

        fetch('/user/verification/' + this.state.code, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {return response.json() }
          ).then(verified => {
              
              if(verified.message){
                this.setState(()=>{
                    return{
                       msg : verified.message
                    }
                })         
            }
          });


    }
   

render() {
    
    return(
        <> 
        <div className="verif">
            <h1>{this.state.msg}</h1>
            <br/>
                <a href="/">Go back to main page</a>
        </div>
      </>)

};
}
export default VerificationPage;
