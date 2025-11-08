import React from 'react'
import { Route,Routes } from 'react-router'
import ProductPage from './pages/ProductPage'
import CheckoutPage from './pages/CheckoutPage'
import CartPage from './pages/CartPage'
import ReceiptModal from './pages/ReceiptModal'

const App = () => {
  return (
    <Routes>
      <Route path='/' element ={ <ProductPage />} />
      <Route path='/cart' element ={ <CartPage />} />
      <Route path='/checkout' element ={ <CheckoutPage />} />
      <Route path='/receipt' element={<ReceiptModal />} />

    </Routes>
  )
}

export default App