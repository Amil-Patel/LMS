import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ShoppingCart from '../../pages/client/cart/ShoppingCart'
<<<<<<< HEAD
import CheckOut from '../../pages/client/cart/CheckOut'
=======
>>>>>>> f114c73c830b01d1401bef769be99b4849cc7af8

const ShoppingCartRoute = () => {
    return (
        <Routes>
          <Route path='/shopping-cart' element={<ShoppingCart/>}/>
<<<<<<< HEAD
          <Route path='/checkout' element={<CheckOut/>}/>
=======
>>>>>>> f114c73c830b01d1401bef769be99b4849cc7af8
        </Routes>
      )
}

export default ShoppingCartRoute
