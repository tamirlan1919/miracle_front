import React from 'react'
import {YMaps,Map,Placemark} from '@pbe/react-yandex-maps'
const Shops = () => {
  return (
    <div>
      <h1 className='text-center text-3xl py-10'>Магазины</h1>
      <div className='w-full'>
      <YMaps>
  <Map width={'100%'} height={'350px'} defaultState={{ center: [47.20371731622419, 39.652542057131036], zoom: 9 }}>
    <Placemark defaultGeometry={[47.219931, 39.715747]} />
    <Placemark defaultGeometry={[47.229020, 39.735467]} />

  </Map>
</YMaps>;
</div>

    </div>
  )
}

export default Shops
