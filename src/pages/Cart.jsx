import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex flex-col md:flex-row justify-around items-start flex-wrap mx-auto mt-20">
        {cartItems.length === 0 ? (
          <div className="text-center">
            Your cart is empty. <Link to="/shop" className="text-pink-500">Go to Shop</Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex flex-col w-full md:w-3/4">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center mb-4 pb-2 border-b border-gray-300">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-500 hover:underline">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-gray-500">{item.brand}</div>
                    <div className="mt-2 text-gray-700 font-bold">
                      $ {item.price}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 hover:text-red-700 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem] text-xl hover:scale-110 transition-all ease-in-out" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Cart Summary */}
              <div className="mt-8 w-full md:w-[40rem]">
                <div className="p-4 rounded-lg bg-gray-100">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                  <button
                    className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full hover:bg-pink-600 disabled:bg-gray-400"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
