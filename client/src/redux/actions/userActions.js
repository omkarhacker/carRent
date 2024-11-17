import axios from "axios";
import {message} from 'antd'
const API_URL = process.env.REACT_APP_API_URL ;
if (!API_URL) {
    console.error('API_URL is not defined. Please check the .env file.');
  }

export const userLogin=(reqObj)=>async dispatch=>{
    
    dispatch({type: 'LOADING' , payload:true})

    try {
        const response = await axios.post(`${API_URL}/users/login` , reqObj)
        localStorage.setItem('user' , JSON.stringify(response.data))
        message.success('Login success')
        dispatch({type: 'LOADING' , payload:false})
        setTimeout(() => {
            window.location.href='/'
         
        }, 500);
    } catch (error) {
        console.log(error)
        message.error('Something went wrong')
        dispatch({type: 'LOADING' , payload:false})
    }
}

export const userRegister=(reqObj)=>async dispatch=>{
    
    dispatch({type: 'LOADING' , payload:true})

    try {
        const response = await axios.post(`${API_URL}/users/register` , reqObj)
        message.success('Registration successfull')
        setTimeout(() => {
            window.location.href='/login'
         
        }, 500);
       
        dispatch({type: 'LOADING' , payload:false})
        
    } catch (error) {
        console.log(error)
        message.error('Something went wrong')
        dispatch({type: 'LOADING' , payload:false})
    }
}