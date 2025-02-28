import HeartIcon from "./HeartIcon";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import ProductTabs from "./ProductTabs";
import Ratings from "./Ratings";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/cartSlice";

import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div className="mt-10 px-4">
        <Link
          to="/"
          className="text-pink-600 font-semibold hover:underline"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="mt-8 px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
              <HeartIcon product={product} />
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-4xl font-bold text-pink-600 mb-6">$ {product.price}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h1 className="flex items-center mb-4">
                    <FaStore className="mr-2 text-pink-600" /> Brand: {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaClock className="mr-2 text-pink-600" /> Added: {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-pink-600" /> Reviews: {product.numReviews}
                  </h1>
                </div>

                <div>
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-pink-600" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaShoppingCart className="mr-2 text-pink-600" /> Quantity: {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaBox className="mr-2 text-pink-600" /> In Stock: {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-full md:w-[6rem] rounded-lg border-gray-300 text-black"
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

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg transition duration-300 ease-in-out shadow-md"
              >
                Add To Cart
              </button>
            </div>
          </div>

          <div className="mt-12">
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
        </div>
      )}
    </>
  );
};

export default ProductDetails;
