import { lazy, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import useToast from "../../../widgets/toast/models/use-toast"
import { fetchAds } from "../models/ads-thunks"
import AdsItem from "./ads-item"

const Loader = lazy(() => import("../../../widgets/loader/loader"))

function AdsList() {
  const { items , loading, error } = useSelector(state => state.ads)




  const dispatch = useDispatch()

  const {showToast} = useToast()
  

  useEffect(() => {
    dispatch(fetchAds()).unwrap().catch(_ => showToast('Ойойой произошла непредвиденная ошибка', 'error'))
  }, [dispatch, showToast])


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