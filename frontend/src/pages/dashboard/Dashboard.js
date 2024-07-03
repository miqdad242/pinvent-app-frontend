import React, { useEffect } from 'react'
import useRedirectLoggedOutUser from './../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectISLoggedIn } from '../../redux/features/auth/authSlice';
import ProductList from '../../components/product/productList/ProductList';
import { getProducts } from "../../redux/features/product/productSlice";
import ProductSummary from '../../components/product/productSummary/ProductSummary';




const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectISLoggedIn)
  const {products, isLoading, isError, message} = 
  useSelector((state)=>state.product)

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

      //console.log(products)
    
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch,]);


  return (
    <div>
      
      <ProductSummary products={products} />
      <ProductList products={products} isLoading = {isLoading} />
    </div>
  )
};

export default Dashboard;
