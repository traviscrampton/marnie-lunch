import ResultsItem from "./ResultsItem";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Context from "Context/Context";

const makeProps = (config) => ({
  result: {
    photos: [],
    geometry: {
      location: {
        lat: jest.fn(),
        lng: jest.fn(),
      },
    },
    name: "Test Restaurant",
    rating: 4.2,
    user_ratings_total: 3222,
    ...config,
  },
});

const mockValue = (config) => ({
  center: {
    lat: 37.79113833400986,
    lng: -122.40608434649559,
  },
  keyword: null,
  places: [],
  service: undefined,
  map: undefined,
  zoom: 8,
  setCenter: jest.fn(),
  setKeyword: jest.fn(),
  setMap: jest.fn(),
  setZoom: jest.fn(),
  searchMap: jest.fn(),
  ...config,
});

const renderResultsItem = (children, contextValue = mockValue()) =>
  render(<Context.Provider value={contextValue}>{children}</Context.Provider>);

it("should throw an error if the context is not available", () => {
  jest.spyOn(console, "error");
  console.error.mockImplementation(() => {});
  expect(() =>
    renderResultsItem(<ResultsItem {...makeProps()} />, null)
  ).toThrowError(new Error("Could not find context value"));
});

it("should render a photo if one exists", () => {
  const { queryByAltText } = renderResultsItem(
    <ResultsItem
      {...makeProps({ photos: [{ getUrl: () => "fakeImageUrl" }] })}
    />
  );
  expect(queryByAltText("Test Restaurant-photo")).toBeInTheDocument();
  expect(queryByAltText("Test Restaurant-photo")).toHaveAttribute(
    "srcset",
    "fakeImageUrl"
  );
});

it("should render the default image if no photo exists", () => {
  const { queryByAltText } = renderResultsItem(
    <ResultsItem {...makeProps({ photos: [] })} />
  );
  expect(queryByAltText("Test Restaurant-photo")).toBeInTheDocument();
  expect(queryByAltText("Test Restaurant-photo")).toHaveAttribute(
    "srcset",
    "defaultAvatar.jpeg"
  );
});

it("should render the name of the restaurant", () => {
  const { container } = renderResultsItem(
    <ResultsItem {...makeProps({ name: "Delicious Food Place" })} />
  );
  expect(container).toHaveTextContent(/delicious food place/i);
});

it("should render the rating", () => {
  const { queryByLabelText } = renderResultsItem(
    <ResultsItem {...makeProps({ rating: 2.1 })} />
  );
  expect(queryByLabelText("2 Stars")).toBeInTheDocument();
});

it("should render the total ratings", () => {
  const { container } = renderResultsItem(
    <ResultsItem {...makeProps({ user_ratings_total: 2389 })} />
  );
  expect(container).toHaveTextContent(/2389/i);
});

it("should allow a user to favorite or un-favorite", async () => {
  const { queryByLabelText } = renderResultsItem(
    <ResultsItem {...makeProps()} />
  );
  const emptyHeart = queryByLabelText("like");
  expect(emptyHeart).toBeInTheDocument();
  fireEvent.click(emptyHeart);
  await waitFor(() => expect(queryByLabelText("like")).not.toBeInTheDocument());
  const fullHeart = queryByLabelText("unlike");
  expect(fullHeart).toBeInTheDocument();
});

it("should set the map center when a card is clicked", () => {
  const setCenter = jest.fn();
  const mockLat = 23.232;
  const mockLng = -23.32;
  const { queryByText } = renderResultsItem(
    <ResultsItem
      {...makeProps({
        name: "Really Yummy Food",
        geometry: { location: { lat: () => mockLat, lng: () => mockLng } },
      })}
    />,
    mockValue({ setCenter })
  );
  fireEvent.click(queryByText(/really yummy food/i));
  expect(setCenter).toHaveBeenCalledTimes(1);
  expect(setCenter).toHaveBeenCalledWith({ lat: mockLat, lng: mockLng });
});
