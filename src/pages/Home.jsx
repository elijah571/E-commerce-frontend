import Header from "../Components/Header";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Product from "./Products/Product";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {/* Header is visible only when there is no search query */}
      {!keyword && <Header />}
      
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError?.error || "An error occurred"}
        </Message>
      ) : (
        <>
          <div className="text-center mt-8 px-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full py-2 px-6 md:px-8 transition duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
              Shop Now
            </Link>
          </div>

          {/* If no products are found, show a message */}
          {data && data.products.length === 0 && (
            <div className="text-center mt-4">
              <Message variant="info">No products found.</Message>
            </div>
          )}

          <div className="mt-12 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {/* Rendering products dynamically */}
              {data?.products?.map((product) => (
                <div key={product._id} className="w-full sm:w-auto">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
