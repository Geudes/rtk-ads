import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../widgets/loader/loader"
import { fetchAds } from "../models/ads-thunks"
import AdsItem from "./ads-item"

function AdsList() {
  const { items , loading, error } = useSelector(state => state.ads)




  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAds())
  }, [dispatch])

  console.log(items)


  if (error) return <p>{error}</p>
  if (loading) {
    return <Loader />
  }

  // console.log(adsItems)


  return (
    <div>
      {items.map(adsItem => (
        <AdsItem ad={adsItem} key={adsItem.id} />
      ))}</div>
  )
}

export default AdsList