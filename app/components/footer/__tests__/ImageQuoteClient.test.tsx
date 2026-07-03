import React from "react";
import { render, screen } from "@testing-library/react";
import styles from "../utilities/imageQuote/ImageQuote.module.css";
import ImageQuoteClient from "../utilities/imageQuote/ImageQuoteClient";

// ---- Types ----
type MockOrbImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

type ViMock = ReturnType<typeof vi.fn>;

// ---- Mocks ----
vi.mock("@/components/utilities/media/images/OrbImage", () => ({
  __esModule: true,
  default: (props: MockOrbImageProps) => {
    const { alt, src, ...rest } = props;
    return <img alt={alt ?? ""} src={src} {...rest} />;
  },
}));

const createIntersectionObserverMock = (): ViMock =>
  vi.fn((callback: IntersectionObserverCallback) => {
    const instance: IntersectionObserver = {
      root: null,
      rootMargin: "",
      thresholds: [],
      observe: (element: Element) => {
        const entry = {
          isIntersecting: true,
          target: element,
        } as IntersectionObserverEntry;
        callback([entry], instance);
      },
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      takeRecords: () => [],
    };

    return instance;
  });

let intersectionObserverMock: ViMock;

describe("<ImageQuoteClient />", () => {
  const mockPairs = [
    { image: "/images/quote1.jpg", text: "Quote 1" },
    { image: "/images/quote2.jpg", text: "Quote 2" },
  ];

  beforeEach(() => {
    intersectionObserverMock = createIntersectionObserverMock();

    // Cast through unknown so TS is happy and eslint doesn't need `any`
    (globalThis as unknown as { IntersectionObserver: ViMock }).IntersectionObserver =
      intersectionObserverMock;
  });

  afterEach(() => {
    delete (globalThis as unknown as { IntersectionObserver?: ViMock })
      .IntersectionObserver;
    vi.restoreAllMocks();
  });

  it("renders loading state when no pairs are available", () => {
    render(<ImageQuoteClient imageTextPairs={[]} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders an image/text pair when data is provided", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);

    render(<ImageQuoteClient imageTextPairs={mockPairs} />);

    const image = await screen.findByAltText("Random visual");
    expect(image).toHaveAttribute("src", mockPairs[0].image);
    expect(
      await screen.findByText(`"${mockPairs[0].text}"`)
    ).toBeInTheDocument();
  });

  it("adds visibility styling when observed", () => {
    render(<ImageQuoteClient imageTextPairs={mockPairs} />);

    const container = document.querySelector(
      `.${styles.container}`
    ) as HTMLElement | null;

    expect(container).toBeInTheDocument();
    expect(container?.className).toContain("visible");

    // Assert IntersectionObserver constructor was called
    expect(intersectionObserverMock).toHaveBeenCalled();
  });
});
