import { Link } from 'react-router-dom';
import HeartIcon from './HeartIcon';

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] sm:w-[22rem] md:w-[25rem] lg:w-[30rem] ml-[2rem] p-3 hover:shadow-lg hover:scale-105 transition-all ease-in-out">
      <div className="relative">
        <img
          src={product.image?.url}
          alt={product.name}
          className="h-[20rem] w-full object-cover rounded-md" // Ensures proper scaling of the image
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center text-sm md:text-base">
            <div className="font-semibold">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
