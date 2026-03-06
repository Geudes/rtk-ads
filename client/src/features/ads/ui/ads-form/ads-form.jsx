import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import * as yup from "yup"
import useToast from "../../../../widgets/toast/models/use-toast"
import { createAds, updateAds } from "../../models/ads-thunks"

const schema = yup
.object({
    title: yup.string().matches(/^[A-ZА-ЯЁ]/, 'Название должно быть с большой буквы').required('Это поле обязательное'),
    description: yup.string().max(100, 'Описание слишком большое').required('Это поле обязательное'),
    price: yup.number().positive('Число должно быть положительным').required(),
    categoryId: yup.number().required(),
    imageUrl: yup.string().url().required()
    
})
.required()


function AdsForm({ ad }) {

    const { showToast } = useToast()

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ...ad
        }

    })

    const createHandler = (data) => {
        dispatch(createAds(data))
    }

    const updateHandler = async (data) => {
        try {
            await dispatch(updateAds({ad: data, id: ad.id})).unwrap()
            reset()
        } catch (error) {
            showToast(error.message)
        }
    }

  return (
    <form onSubmit={handleSubmit(ad ? updateHandler : createHandler)} >
        <div className="input">
            <label htmlFor="title">Title</label>
            <input type="text" {...register('title')} id="title" />
            {errors.title && <small style={{color: 'tomato'}}>{errors.title.message}</small>}
        </div>
        <div className="input">
            <label htmlFor="description">Description</label>
            <textarea {...register('description')} id="description" />
            {errors.description && <small style={{color: 'tomato'}}>{errors.description.message}</small>}
        </div>
        <div className="input">
            <label htmlFor="price">Price</label>
            <input type="text" {...register('price')} id="price" />
            {errors.price && <small style={{color: 'tomato'}}>{errors.price.message}</small>}
        </div>
        <div className="input">
            <label htmlFor="categoryId">Category</label>
            <select id="categoryId" {...register('categoryId')}>
                <option value="1">Электроника</option>
            </select>
            {errors.categoryId && <small style={{color: 'tomato'}}>{errors.categoryId.message}</small>}
        </div>
        <div className="input">
            <label htmlFor="imageUrl">Image</label>
            <input type="text" {...register('imageUrl')} id="imageUrl" />
            {errors.imageUrl && <small style={{color: 'tomato'}}>{errors.imageUrl.message}</small>}
        </div>
        <button>Добавить</button>
    </form>
  )
}

export default AdsForm