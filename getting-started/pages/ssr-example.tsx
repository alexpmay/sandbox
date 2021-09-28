import { GetServerSideProps } from "next";
import { useState } from "react";
import {
  CausalClient,
  ImpressionJSON,
  createQuery,
  SelectFeatures,
  toImpression,
} from "../causal";
import { RatingWidget } from "../components/RatingWidget";

/****
 **** Please read react-example.tsx first, it provides context necessary for this example
 ***/

// In Next.js to pre-render a page server side you define the function getServerSideProps
export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context
) => {
  // Get the product to display.
  const product = products[context.query.pid as keyof typeof products];
  if (product == undefined) {
    return {
      redirect: { destination: "ssr-example?pid=iphone" },
    } as any; /* eslint-disable-line */ // cast OK, render will not be called
  }

  // Create a query using createQuery instead of queryBuilder()
  // More on this in a moment
  const query = createQuery<RatingFeatures>({
    RatingBox: { product: product.name },
  });

  // request the impression with requestImpression
  // we are not in a react render, so not using the react hook (useImpression)
  // this is async code, so await the result
  const { impression, error } = await causalClient.requestImpression(query);

  if (error) {
    console.log(
      "There is no impression server running yet, but it still works! " +
        "Causal is resilient to network and backend outages because the defaults are compiled in 😃."
    );
  }

  // Next.js requires that SSR props be serializable as JSON
  // So we have to convert the impression to JSON, and convert it back when
  // we render.
  const props: SSRProps = { product, json: impression.toJSON() };
  return { props };
};

// createQuery() vs queryBuilder()
//
// When using queryBuilder(), the type of the query and the feature arguments
// are built at the same time
//
// Sometimes we need to define the type first, and then use it later to both
// create a query and also to pass data around.
//
// For this use case, SelectFeatures defines the type and createQuery
// (used in gerServerSideProps) create the query
//
// SelectFeatures takes in the feature names to use as a generic parameter
// i.e:  "Feature1" | "Feature2" | "Feature3"
//
// In VSCode, Use a double quote (") to trigger automplete within this <>
type RatingFeatures = SelectFeatures<"RatingBox">;

// SSRprops defines type of the props being passed from getServerSideProps to
// the page (the name doesn't have to be SSRProps, it could be anything)
type SSRProps = {
  product: typeof products[keyof typeof products];

  // ImpressionJSON is the JSON serializable version of an impression
  // Just like createQuery(), it uses the type we defined using SelectFeatures
  json: ImpressionJSON<RatingFeatures>;
};

// The rest of this example is almost identical to react-example.tsx
// We just need to convert the JSON back to an impression by calling toImpression()
export default function Example({ json, product }: SSRProps) {
  const [rating, setRating] = useState(0);

  // All the typing caries through and autocomplete still works well.
  // impression is scoped to the correct features
  const impression = toImpression(json); // <- Convert JSON to impression

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

const causalClient = new CausalClient({
  cacheDurationSeconds: 10,
  deviceId: "device-abc1324",
});

const products = {
  iphone: { name: "iPhone 13", url: "/iphone13.webp", next: "pixel" },
  pixel: { name: "Pixel 5", url: "/pixel5.webp", next: "fold" },
  fold: {
    name: "Samsung Galaxy Fold",
    url: "/galaxyfold.webp",
    next: "iphone",
  },
};
