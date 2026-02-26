// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import AdsApi from '../../../entitites/ads/api/ads-api'
import Modal from '../../../widgets/modal/modal'
// import AdsForm from './ads-form'

function AdsItem({ ad }) {
    // const [showForm, setShowForm] = useState(false)
    // const user = useSelector(state => state.auth.user)
    // const dispatch = useDispatch()
    // const deleteHandler = async () => {
    //     if (confirm('точно')) {
    //         const res = await AdsApi.remove(ads.id)
    //         if (!('error' in res)) {
    //             dispatch(deleteAds(ads.id))
    //         }
    //     }
    // }

    console.log(1)

    return (
        
        <div>
            <h1>{ad.title}</h1>
            <img src={ad.imageUrl} alt="" />
            <h2>{ad.description}</h2>
            <h2>{ad.price}</h2>
            <h2>{ad.Category.name}</h2>
            {/* {
                user && (user.id === ads.userId) &&
                <div>
                    <button onClick={deleteHandler} type='button'>удалить </button>
                    <button type='button' onClick={() => setShowForm(p => !p)}>Обновить</button>
                </div>
            }
            {

                <Modal isOpen={showForm} onClose={() => setShowForm(false) } title={'Обновление'}>
                    <AdsForm ad={ads} />
                </Modal>
            } */}
        </div>
    )
}

export default AdsItem