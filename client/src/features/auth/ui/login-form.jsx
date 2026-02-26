import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import * as yup  from 'yup'
import AuthApi from '../api/auth-api'
import { loginFail, loginStart, loginSuccess} from '../models/auth-slice'
import AuthStorage from '../models/auth-storage'





const schema = yup
.object({
    email:yup
    .string()
    .email('не коректный')
    .required('поле обязательно'),
    password:yup
    .string()
    .min(2,'2')
    .required('поле обязательно'),
})
.required()

function LoginForm() {
     const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        resolver:yupResolver(schema)
    })
    const {loading , error} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        dispatch(loginStart())
        try{
          const result = await AuthApi.login(data); 
        
      
        AuthStorage.setAccessToken(result.accessToken);
        AuthStorage.setRefreshToken(result.refreshToken);
        AuthStorage.setUserStorage(result.user);
        
        
        dispatch(loginSuccess(result.user)); 
        
        navigate('/ads');
        }catch(error){
         dispatch(loginFail(error?.response?.data?.error || error.message)) 
        }
    }
return (
    <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column'}}>
        {error && <span> {error.message} </span>}
        <label >
            {errors.email && <span>{errors.email.message}</span>}
           email
            <input type="text"  {...register('email')} id='email'/>
        </label>
        <label >
            {errors.password && <span>{errors.password.message}</span>}
           password
            <input type="text"  {...register('password')} id='password'/>
        </label>
           <button type='submit'>{loading ? 'входим' : 'вошли'}</button>
    </form>
  )
}

export default LoginForm