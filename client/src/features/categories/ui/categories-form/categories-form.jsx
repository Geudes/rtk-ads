import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import * as yup from "yup"
import { createCategories } from "../../models/categories-thunks"

const schema = yup
.object({
    name: yup.string().matches(/^[A-ZА-ЯЁ]/, 'Название должно быть с большой буквы').required('Это поле обязательное'),
})
.required()


function CategoriesForm() {

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })


    const createHandler = (data) => {
        dispatch(createCategories(data))
    }

  return (
    <form onSubmit={handleSubmit(createHandler)} >
        <div className="input">
            <label htmlFor="name">Name</label>
            <input type="name" {...register('name')} id="name" />
            {errors.name && <small style={{color: 'tomato'}}>{errors.name.message}</small>}
        </div>
        <button>Добавить</button>
    </form>
  )
}

export default CategoriesForm