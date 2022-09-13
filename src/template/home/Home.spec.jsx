import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Home } from ".";
import userEvent from "@testing-library/user-event";

/* eslint-disable no-undef */

const handlers = [
  rest.get(
    "https://jsonplaceholder.typicode.com/posts",
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: "title1",
            body: "body1",
            cover: "img1",
          },
          {
            userId: 2,
            id: 2,
            title: "title2",
            body: "body2",
            cover: "img2",
          },
          {
            userId: 3,
            id: 3,
            title: "title3",
            body: "body3",
            cover: "img3",
          },
        ])
      );
    }
  ),
];

const server = setupServer(...handlers);

describe("<Home />", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it("should render search, posts and load more", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Nenhum Post encontrado :(");
    await waitForElementToBeRemoved(noMorePosts);
  });

  it("should search for posts", async () => {
    render(<Home />);
    const search = screen.getByPlaceholderText(/type your search/i);
    const noMorePosts = screen.getByText("Nenhum Post encontrado :(");
    await waitForElementToBeRemoved(noMorePosts);
    expect(
      screen.getByRole("heading", { name: "title1 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "title2 2" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "title3 3" })
    ).toBeInTheDocument();

    userEvent.type(search, "title1");
  });
});
