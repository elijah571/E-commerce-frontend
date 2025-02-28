import Product from "./Product";
import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="mt-20 px-4 sm:px-6 lg:px-12">
      <h1 className="text-lg font-bold text-center sm:text-left sm:ml-4 mt-4">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap justify-center sm:justify-start mt-6">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
