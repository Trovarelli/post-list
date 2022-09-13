/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { PostCard } from ".";

const props = {
  title: "something",
  body: "some random body",
  id: 1,
  cover: "img/img.png",
};

describe("<PostCard />", () => {
  it("should render PostCard correctly", () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole("img", { name: props.title })).toHaveAttribute(
      "src",
      props.cover
    );
  });
});
