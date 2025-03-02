import HeartIcon from "./HeartIcon";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[25rem] md:w-[30rem] lg:w-[28rem] ml-4 p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[200px] object-cover rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg font-semibold">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
