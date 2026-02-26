import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../widgets/loader/loader'
import CategoriesApi from '../../api/categories-api'
import { setCategories } from '../../models/categories-thunks'
import CategoriesItem from '../categories-item/categories-item'

function CategoriesList() {

  const dispatch = useDispatch()
  const { items: categoriesItems, loading } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(setCategories())
  }, [dispatch])

  console.log(categoriesItems)

  if (loading) {
    return <Loader />
  }


  return (
    <div>
      {
        categoriesItems.map(category => (
          <CategoriesItem category={category} key={category?.id} />
        ))
      }
    </div>
  )
}

export default CategoriesList