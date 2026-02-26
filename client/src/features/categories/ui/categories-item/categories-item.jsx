import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategories } from '../../models/categories-thunks'

function CategoriesItem({category}) {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()


  return (
    <div className="category__item">
        <div className="category__name">{category.name}</div>
        {
                user && (user.role === 'admin') &&
                <div>
                    <button type='button' onClick={() => dispatch(deleteCategories(category.id))}>удалить </button>
                </div>
        }
    </div>
  )
}

export default CategoriesItem