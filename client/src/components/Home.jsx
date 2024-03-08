import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductList from "./ProductList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000/auth/verify").then((res) => {
      if (res.data.status) {
      } else {
        navigate("/login");
      }
      console.log(res);
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
        setDisplayedProducts(response.data.slice(0, 8));
        setHasMore(true);
      } catch (error) {
        return console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fetchMoreData = () => {
    if (displayedProducts.length >= products.length) {
      setHasMore(false);
      return;
    }

    // Simulate loading delay
    setLoading(true);
    setTimeout(() => {
      setDisplayedProducts((prevProducts) => [
        ...prevProducts,
        ...products.slice(prevProducts.length, prevProducts.length + 20),
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home">
      <h1 className="my-4 text-5xl text-black-400 text-center">Product List</h1>
      <button
        onClick={handleLogout}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <InfiniteScroll
        dataLength={displayedProducts.length}
        next={fetchMoreData}
        hasMore={hasMore}
      >
        <div className="flex flex-wrap justify-center">
          {displayedProducts.map((product) => (
            <ProductList key={product._id} product={product} />
          ))}
        </div>
        {loading && <Loader />}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
