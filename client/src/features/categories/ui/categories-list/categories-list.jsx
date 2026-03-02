import { lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../../models/categories-thunks'
import CategoriesItem from '../categories-item/categories-item'

const Loader = lazy(() => import('../../../../widgets/loader/loader'))

function CategoriesList() {

  const dispatch = useDispatch()
  const { items: categoriesItems, loading } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(setCategories())
  }, [dispatch])

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