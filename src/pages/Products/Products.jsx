import HeartIcon from './HeartIcon';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import ProductTabs from './Tabs';
import Rating from './Rating';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/features/cart/cartSlice';

import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../../redux/api/productApiSlice';
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from 'react-icons/fa';

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div>
        <Link
          className="text-white font-semibold hover:underline ml-4 sm:ml-8 lg:ml-20"
          to="/"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-start mt-8 mx-4 sm:mx-8 lg:mx-20">
            {/* Image Section */}
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/2 mb-8">
              <img
                src={product.image?.url}
                alt={product.name}
                className="w-full h-auto rounded-lg object-contain"
              />
              <HeartIcon product={product} />
            </div>

            {/* Product Details Section */}
            <div className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2 flex flex-col justify-between">
              <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-4 sm:w-full md:w-[80%]">
                {product.description}
              </p>
              <p className="text-3xl font-extrabold text-pink-600 my-4">
                ${product.price}
              </p>

              <div className="flex flex-col sm:flex-row justify-between mb-4 w-full sm:w-[90%] md:w-[80%]">
                <div className="mb-4 sm:mb-0">
                  <h1 className="flex items-center mb-4">
                    <FaStore className="mr-2 text-white" /> Brand:{' '}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaClock className="mr-2 text-white" /> Added:{' '}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-white" /> Reviews:{' '}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="mb-4 sm:mb-0">
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-white" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{' '}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaBox className="mr-2 text-white" /> In Stock:{' '}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mb-4 w-full sm:w-[90%] md:w-[80%]">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div className="w-full sm:w-auto">
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="p-2 w-24 rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 sm:mt-0 w-full sm:w-auto"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-[5rem] container flex flex-wrap items-start justify-between mx-4 sm:mx-8 lg:mx-20">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Product;
