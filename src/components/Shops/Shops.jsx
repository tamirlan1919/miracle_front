import React from 'react'

const Shops = () => {
  return (
    <div>
      <h1 className='text-center text-3xl py-10'>Магазины</h1>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
  <a
    href="https://yandex.ru/maps/org/miracle/149705269337/?utm_medium=mapframe&utm_source=maps"
    style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}
  >
    Miracle
  </a>
  <a
    href="https://yandex.ru/maps/39/rostov-na-donu/category/perfume_and_cosmetics_shop/184105798/?utm_medium=mapframe&utm_source=maps"
    style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}
  >
    Магазин парфюмерии и косметики в Ростове‑на‑Дону
  </a>
  <iframe
    src="https://yandex.ru/map-widget/v1/?ll=39.735345%2C47.228816&mode=search&oid=149705269337&ol=biz&z=16.51"
    width="100%"
    height="500"
    frameBorder="1"
    allowFullScreen={true}
    style={{ position: 'relative' }}
  ></iframe>
</div>

    </div>
  )
}

export default Shops
