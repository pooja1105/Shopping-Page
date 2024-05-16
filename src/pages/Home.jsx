import React, { useState, useEffect } from 'react';
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { FaSearch } from 'react-icons/fa';


const API_URL = "https://fakestoreapi.com/products";

function ProductSearch() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  async function fetchProductData() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.log("Error occurred while fetching data");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  return (
    <div>
      <div className="flex items-center border-2 rounded-full py-1 px-2 bg-white my-4 mx-auto max-w-xl">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          className="w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none bg-transparent"
          type="text"
          placeholder="Search Product"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {loading ? <Spinner /> :
        currentPosts.length > 0 ?
          (<div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
            {currentPosts.map((post) => (
              <Product key={post.id} post={post} />
            ))}
          </div>) :


          <div className="flex justify-center items-center min-h-[50vh]">
            <img src="nodatafound.png" alt="No Data Found" className="w-1/2 h-auto" />
          </div>

      }

      {!loading && filteredPosts.length > 0 && (
        <div className="flex justify-center my-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 rounded-full bg-green-500 text-white"
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-1">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 rounded-full bg-green-500 text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductSearch;
