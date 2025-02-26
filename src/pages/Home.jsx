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
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="text-center mt-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full py-2 px-8 transition duration-300 ease-in-out shadow-md"
            >
              Shop Now
            </Link>
          </div>

          <div className="mt-12">
            <div className="flex justify-center flex-wrap gap-8">
              {data.products.map((product) => (
                <div key={product._id}>
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
