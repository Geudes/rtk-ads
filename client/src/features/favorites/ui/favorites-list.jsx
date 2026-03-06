import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites } from '../models/favorites-thunks'
import Favorite from './favorite'

function FavoritesList() {

    const { items, loading, error } = useSelector(state => state.favorites)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchFavorites())
    }, [dispatch])

  return (
    <div>
        {
            items.map(favorite => (
              <Favorite key={favorite.id}  favorite={favorite} />
            ))
        }
    </div>
  )
}

export default FavoritesList