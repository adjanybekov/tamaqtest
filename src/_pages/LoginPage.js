import React,{Component,useState} from "react";
import { connect } from "react-redux";
import {setCurrentUser} from '../redux/user/user.action'
import { auth } from "../_services/fire";
import firebase from 'firebase/app';

const LoginPageImpl =(props)=>{

    let [username,setUsername] = useState("");
    let [password,setPassword] = useState("");
    const handleClick =()=>{
        console.log(username,password);
        props.setCurrentUser({username, password})
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(username,password).then(
            res=>{
                console.log(res);
            }
        ).catch(
            res=>{
                if(res.code==='auth/user-not-found')
                console.log(res.code);
            }
        )
    }

    return(
        <div>
            <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}/>
            <input type="text" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={handleClick}>submit</button>
        </div>
    )
    
}

const  mapDispatchToProps = dispatch=>({
    // const dispatch = useDispatch();
    setCurrentUser: user=>dispatch(setCurrentUser(user))       
})

const mapStateToProps = (state)=>({
    currentUser:state.user.currentUser
})

   const LoginPage = connect(mapStateToProps,mapDispatchToProps)(LoginPageImpl);
   export {LoginPage};


