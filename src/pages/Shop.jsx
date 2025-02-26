import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import { X, Filter } from "lucide-react"; // Importing icons from lucide-react

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });
  const [priceFilter, setPriceFilter] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility

  useEffect(() => {
    if (categoriesQuery.isSuccess) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (filteredProductsQuery.isSuccess) {
      const filteredProducts = filteredProductsQuery.data.filter((product) => {
        return priceFilter
          ? product.price === parseInt(priceFilter, 10)
          : true;
      });
      dispatch(setProducts(filteredProducts));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...new Set(
      filteredProductsQuery.data?.map((product) => product.brand).filter(Boolean)
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const clearFilters = () => {
    setPriceFilter("");
    dispatch(setChecked([]));
    dispatch(setProducts(filteredProductsQuery.data));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="container mx-auto mt-28">
        <button
          className="fixed top-28 left-4 z-50 text-white bg-pink-600 p-2 rounded-full shadow-lg overflow-y: md:hidden"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={20} /> : <Filter size={20} />}
        </button>

        <div className="flex md:flex-row">
          {/* Sidebar Section */}
          <div
            className={`bg-[#151515] p-3 mt-2 mb-2 w-[15rem] md:w-[12rem] fixed md:relative top-28 left-0 h-full transition-transform duration-300 z-40 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Categories
            </h2>

            <div className="p-5 w-full">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={`category-${c._id}`}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <label
                      htmlFor={`category-${c._id}`}
                      className="ml-2 text-sm font-medium text-white"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Brands
            </h2>

            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <div className="flex items-center mr-4 mb-5" key={brand}>
                  <input
                    type="radio"
                    id={`brand-${brand}`}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500"
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="ml-2 text-sm font-medium text-white"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Price
            </h2>

            <div className="p-5 w-full">
              <input
                type="number"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border my-4"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="p-3 md:ml-[12rem] w-full">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap">
              {filteredProductsQuery.isLoading ? (
                <Loader />
              ) : products.length === 0 ? (
                <p className="text-white">No products found.</p>
              ) : (
                products.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
