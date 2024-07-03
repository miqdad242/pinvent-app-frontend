import React, { useEffect } from 'react'
import "./ProductDetail.scss";
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../redux/features/product/productSlice';
import { selectISLoggedIn } from '../../../redux/features/auth/authSlice';
import Card from '../../card/Card';
import { SpinnerImg } from '../../loader/Loader';
import DOMPurify from "dompurify";

const ProductDetail = () => {

    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();

    const { id } = useParams();

    const isLoggedIn = useSelector(selectISLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
      //console.log(product);
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch ]);

  return (
    <div className='product-detail'>
      <h3 className="--mt">Product Detail</h3>
      <Card cardClass="card">
      {isLoading && <SpinnerImg />}
      {product && (
        <div className='detail'>
            <card cardClass="group">
            {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </card>
            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>

            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {product.price * product.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            {product.createdAt && (
              <code className="--color-dark">
                Created on: {new Date(product.createdAt).toLocaleString("en-US")}
              </code>
            )}
            <br />
            {product.updatedAt && (
              <code className="--color-dark">
                Last Updated: {new Date(product.updatedAt).toLocaleString("en-US")}
              </code>
            )}

        </div>
      )}

      </Card>
    </div>
  )
}

export default ProductDetail
