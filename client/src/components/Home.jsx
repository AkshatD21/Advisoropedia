import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductList from "./ProductList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
        setDisplayedProducts(response.data.slice(0, 20));
        setHasMore(true);
      } catch (error) {
        console.error("Error fetching products:", error);
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
      <InfiniteScroll
        dataLength={displayedProducts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
      >
        <div className="flex flex-wrap justify-center">
          {displayedProducts.map((product) => (
            <ProductList key={product._id} product={product} />
          ))}
        </div>
      </InfiniteScroll>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
