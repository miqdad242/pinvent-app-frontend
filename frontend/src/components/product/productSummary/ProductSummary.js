import React, { useEffect } from 'react'
import "./ProductSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from 'react-redux';
import { CALC_OUTOFSTOCK, CALC_STORE_VALUE, CALC_CATEGORY, selectTotalStoreValue, selectCategory, selectOutOfStock } from '../../../redux/features/product/productSlice';






// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;


// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({products }) => {

  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);


  // useEffect(()=>{
  //   dispatch(CALC_STORE_VALUE(products));
  //   dispatch(CALC_OUTOFSTOCK(products));
   
  //   dispatch(CALC_CATEGORY(products));
  // },[dispatch,products]);

  useEffect(() => {
    if (products.length) {
      dispatch(CALC_STORE_VALUE(products));
      dispatch(CALC_OUTOFSTOCK(products));
      dispatch(CALC_CATEGORY(products));
    }
  }, [dispatch, products]);

  return (
    <div className="product-summary">
       <h3 className="--mt">Inventory Stats</h3>
       <div className="info-summary">
       <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={"0"}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}  `}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        />
       
       </div>
    </div>
  )
}

export default ProductSummary
