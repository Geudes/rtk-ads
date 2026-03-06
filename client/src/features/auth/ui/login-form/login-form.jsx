import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import * as yup  from 'yup'
import AuthApi from '../../api/auth-api'
import { loginFail, loginStart, loginSuccess} from '../../models/auth-slice'
import AuthStorage from '../../models/auth-storage'

import './login-form.css'





const schema = yup
.object({
    email:yup
    .string()
    .email('Не коректный адрес')
    .required('Поле обязательно'),
    password:yup
    .string()
    .min(2,'Пароль слишком слабый, прям как ты')
    .required('Поле обязательно'),
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
    <form onSubmit={handleSubmit(onSubmit)} className='log-form'>
        {error && <span className='error'> {error.message} </span>}
        <label >
           Email
            <input type="text"  {...register('email')} id='email'/>
            {errors.email && <span className='error'>{errors.email.message}</span>}
        </label>
        <label >
           Password
            <input type="text"  {...register('password')} id='password'/>
            {errors.password && <span className='error'>{errors.password.message}</span>}
        </label>
           <button type='submit'>{loading ? 'Входим...' : 'Войти'}</button>
    </form>
  )
}

export default LoginForm