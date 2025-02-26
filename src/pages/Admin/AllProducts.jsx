import moment from "moment";
import { Link } from "react-router-dom";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-10 text-red-500">Error loading products</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">All Products ({products.length})</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/admin/product/update/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[15rem] object-cover"
              />
            </Link>
            <div className="p-4">
              <h5 className="text-xl font-semibold mb-2 truncate">{product.name}</h5>
              <p className="text-gray-400 text-sm mb-2">
                {moment(product.createdAt).format("MMMM Do YYYY")}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {product.description?.substring(0, 80)}...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-pink-600">
                  $ {product.price}
                </span>
                <Link
                  to={`/admin/product/update/${product._id}`}
                  className="text-sm font-medium text-white bg-pink-600 rounded-full px-4 py-2 hover:bg-pink-700 transition duration-300"
                >
                  Update
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
