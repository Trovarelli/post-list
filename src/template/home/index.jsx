import "./styles.css";

import { useState, useEffect, useCallback } from "react";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleChange = (event) => {
    const { value } = event.target;

    setSearchValue(value);
  };

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    let button = document.getElementById("buttonId");
    setPosts(posts);
    setPage(nextPage);
    setTimeout(() => {
      button.scrollIntoView({ block: "end", behavior: "smooth" });
    }, 300);
  };

  return (
    <section className="container">
      <div className="searchContainer">
        {!!searchValue && (
          <>
            <h1>Search Value: {searchValue}</h1>
          </>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && (
        <>
          <h1>Nenhum Post encontrado :(</h1>
        </>
      )}

      <div className="buttonContainer">
        {!searchValue && (
          <Button
            disabled={noMorePosts}
            text={"Load more posts"}
            onClick={loadMorePosts}
          ></Button>
        )}
      </div>
    </section>
  );
};
