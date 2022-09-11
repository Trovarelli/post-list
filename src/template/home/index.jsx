import "./styles.css";

import { Component } from "react";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: "",
  };

  componentDidMount() {
    this.loadPosts();
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({ searchValue: value });
  };

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  render = () => {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="searchContainer">
          {!!searchValue && (
            <>
              <h1>Search Value: {searchValue}</h1>
            </>
          )}
          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
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
              onClick={this.loadMorePosts}
            ></Button>
          )}
        </div>
      </section>
    );
  };
}

export default Home;
