import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ShoppingCart from '../../pages/client/cart/ShoppingCart'
import CheckOut from '../../pages/client/cart/CheckOut'

const ShoppingCartRoute = () => {
    return (
        <Routes>
          <Route path='/shopping-cart' element={<ShoppingCart/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
        </Routes>
      )
}

export default ShoppingCartRoute
