import { GetServerSideProps } from "next";
import { useState } from "react";
import {
  CausalClient,
  ImpressionJson as ImpressionJson,
  queryExact,
  SelectFeatures,
  toImpression,
} from "../causal";
import { RatingWidget } from "../components/RatingWidget";

// This example displays a product and let's the user rate it
//
// The product to display is determined by the url query
// The product data is (for example purposes) hard-coded in this file
//
// The rating prompt (ex: "Rate this product"), and the rating event are
// defined in FDL. The industry term for such a prompt is
// "call to action" (CTA), which is how it is referred to in this example.
//
// In the data warehouse, for each impression, all the data above will be
// collected into a single row

type RatingFeatures = SelectFeatures<"RatingBox">;

type SSRProps = {
  json: ImpressionJson<RatingFeatures>;
  product?: typeof products[keyof typeof products];
};

export default function Example({ json, product }: SSRProps) {
  const [rating, setRating] = useState(0);

  if (product == undefined) {
    return <></>;
  }

  const impression = toImpression(json);

  return (
    <div className="center">
      <h1>{product.name}</h1>
      <img src={product.url} alt="product image" />

      {/* The call to action (CTA) text retrieved from Causal */}
      <h3>{impression.RatingBox?.call_to_action}</h3>

      <RatingWidget
        curRating={rating}
        onSetRating={(newRating) => {
          setRating(newRating);
          impression.RatingBox?.signalrating({ stars: rating }); // <- Send the rating event to Causal
        }}
      />
      <a href={"ssr-example?pid=" + product.next}>Rate Another</a>
    </div>
  );
}

// CausalClient is the TypeScript interface to Causal
//
// Usually instantiation of CausalClient would be done in
// a more global spot. In Next.js terms, often a Layout or in _app.tsx
// It is here to show a self contained example
//
// By default Causal will cache results for 10 minutes. For demo purposes we
// are setting it to a much lower value
//
// The deviceId will typcially be however you uniquely identify broswers.
// Usually it is something you generate and store in cookie or local stroage.
// For demo purposes we are using a simple fake value.
const causalClient = new CausalClient({
  cacheDurationSeconds: 10,
  deviceId: "abc123",
});

export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context
) => {
  // Get the product to display.
  // This is not specifc to Causal - just necessary for the example
  const product = products[context.query.pid as keyof typeof products];

  const query = queryExact<RatingFeatures>({
    RatingBox: { product: product.name },
  });
  const { data: impression, error } = await causalClient.requestImpression(
    query
  );

  // // TODO
  // if (error) {
  //   console.log(
  //     "There is no impression server running yet, but it still works! " +
  //       "Causal is resilient to network and backend outages because the defaults are compiled in 😃."
  //   );
  // }

  // if (!data.RatingBox) {
  //   return (
  //     <div>
  //       This would only happen if RatingBox was turned off via a feature flag
  //     </div>
  //   );
  // }

  const props: SSRProps = { product, json: impression.toJson() };
  return { props };
};

// The hardcoded products
const products = {
  iphone: { name: "iPhone 13", url: "/iphone13.webp", next: "pixel" },
  pixel: { name: "Pixel 5", url: "/pixel5.webp", next: "fold" },
  fold: {
    name: "Samsung Galaxy Fold",
    url: "/galaxyfold.webp",
    next: "iphone",
  },
};
