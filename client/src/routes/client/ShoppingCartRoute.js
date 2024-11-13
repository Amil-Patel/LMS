import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ShoppingCart from '../../pages/client/cart/ShoppingCart'

const ShoppingCartRoute = () => {
    return (
        <Routes>
          <Route path='/shopping-cart' element={<ShoppingCart/>}/>
        </Routes>
      )
}

export default ShoppingCartRoute
