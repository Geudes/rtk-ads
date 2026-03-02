
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import * as yup  from 'yup'
import AuthApi from '../api/auth-api'
import { registerFail, registerStart, registeSuccess } from '../models/auth-slice'
import AuthStorage from '../models/auth-storage'





const schema = yup
.object({
    email:yup
    .string()
    .email('не коректный')
    .required('поле обязательно'),
    name:yup
    .string()
    .min(2, '22')
    .required('поле обязательно'),
    phone:yup
    .number()
    .typeError('число')
    .min(6 , "6")
   
    .required('поле обязательно'),
    password:yup
    .string()
    .min(2,'2')
    .required('поле обязательно'),
    confirmPassword:yup
    .string()
    .oneOf([yup.ref('password')], 'не совпадают')
    .required()
})
.required()
function RegisterForm() {


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
        dispatch(registerStart())
        try{
            const result = await AuthApi.register(data)
            dispatch(registeSuccess(result.user))
            AuthStorage.setAccessToken(result.accessToken)
            AuthStorage.setRefreshToken(result.refreshToken)
            AuthStorage.setUserStorage(result.user)
            navigate('/login')
        }catch(error){
         dispatch(registerFail(error.response?.data?.error || error.message)) 
        }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column'}}>
        {error && <span> {error.message} </span>}
        <label >
            {errors.name && <span>{errors.name.message}</span>}
            name
            <input type="text" {...register('name')} id='name'/>
        </label>
        <label >
            {errors.email && <span>{errors.email.message}</span>}
           email
            <input type="text"  {...register('email')} id='email'/>
        </label>
        <label >
            {errors.phone && <span>{errors.phone.message}</span>}
           phone
            <input type="text" {...register('phone')}  id='phone'/>
        </label>
        <label >
            {errors.password && <span>{errors.password.message}</span>}
           password
            <input type="text"  {...register('password')} id='password'/>
        </label>
        <label >
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
           confirmPassword
            <input type="text"  {...register('confirmPassword')} id='confirmPassword'/>
        </label>
        <button type='submit'>{loading ? 'регистрируемся' : 'зарегались'}</button>
    </form>
  )
}

export default RegisterForm