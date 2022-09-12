import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from ".";

describe("<Button />", () => {
  it('should render the button with the text "Load More"', () => {
    render(<Button text={"Load More"} />);

    expect.assertions(1);

    const button = screen.getByRole("button", { name: /Load More/i });
    expect(button).toBeInTheDocument();
  });

  it("should call function on button click", () => {
    const fn = jest.fn();
    render(<Button text={"Load More"} onClick={fn} />);

    const button = screen.getByRole("button", { name: /Load More/i });
    fireEvent.click(button);

    expect(fn).toHaveBeenCalled();
  });

  it("should be disabled when disabled is true", () => {
    render(<Button text="load more" disabled={true} />);

    const button = screen.getByRole("button", { name: /Load more/i });

    expect(button).toBeDisabled();
  });
});
