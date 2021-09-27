import { GetServerSideProps } from "next";
import { useState } from "react";
import { CausalClient, generateId, queryBuilder, RatingBox } from "../causal";
import { RatingWidget } from "../components/RatingWidget";

/****
 **** Please first read both react-example.tsx and ssr-example.tsx.
 **** They provides context necessary for this example
 ***/

// In this example we are going to:
// 1. Collect the data server side.
// 2. Pass the data to the page w/o the help of Causal's types.
// 3. use Causa's static functions on the client to signal events.
//
// This mimics how front end code might interact with a micro-service.
// You might want a microservice to get data from Causal. That microservice
// may already have a public interface, so you don't want to add new piping.
//
// Causal will still tie all the data together, and you still
// get the benefit of annotated and strongly typed interfaces.

export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context
) => {
  // Get the product to display.
  const product = products[context.query.pid as keyof typeof products];

  // Get the CTA
  const query = queryBuilder().getRatingBox({ product: product.name }); // <- pass in the product name
  const { impression, error } = await causalClient.requestImpression(query);

  if (product == undefined || impression.RatingBox == undefined) {
    // impression.RatingBox will only be undefined if the feature flagged off
    return {
      redirect: { destination: "ssr-example?pid=iphone" },
    } as any; /* eslint-disable-line */ // cast OK, render will not be called
  }

  if (error) {
    console.log(
      "There is no impression server running yet, but it still works! " +
        "Causal is resilient to network and backend outages because the defaults are compiled in 😃."
    );
  }

  // An impression corresponds to a user viewing a page or product.
  // The front end and back end need to agree on impressions.
  // They do this by using ids to identify impressions.
  // Causal can generate ids for you, however many times
  // you will want to generate your own. Often impression ids are
  // based on the request ids provided by a webserver
  // Please see this article on impressions for mor details
  // TODO: Link
  const impressionId = generateId().toString();

  const props: SSRProps = {
    impressionId,
    product,
    CTA: impression.RatingBox?.call_to_action,
  };
  return { props };
};

type SSRProps = {
  product: typeof products[keyof typeof products];
  CTA: string;
  impressionId: string;
};

// The rest of this example is very similar to the previous examples.
// The only differnce we we use static methods to signal events.
export default function Example({ product, CTA, impressionId }: SSRProps) {
  const [rating, setRating] = useState(0);

  return (
    <div className="center">
      <h1>{product.name}</h1>
      <img src={product.url} alt="product image" />
      <h3>{CTA}</h3>

      <RatingWidget
        curRating={rating}
        onSetRating={(newRating) => {
          setRating(newRating);

          // This is the static call to signal an event:
          // - It is still strongly typed.
          // - It is still annotated, so it will, for example, show
          //   deprecation indications.
          //
          // The downside to this approach is the type system can not carry
          // the feature selection through from the original query, so you
          // have to manually pick the correct features to signal events on.
          //
          // All other Causal funtionality works as expected:
          // - All the data is tied together in a single row in the warehouse.
          // - Events can be seen in the event viewer, etc.
          RatingBox.signalrating(deviceId, impressionId, { stars: rating });

          // For autocomplete convienence, you can also reference the feature
          // classes through the allFeatures variable.
          //
          // allFeatures.RatingBox.signalrating(deviceId, impressionId, {
          //   stars: rating,
          // });
        }}
      />
      <a href={"static-events-example?pid=" + product.next}>Rate Another</a>
    </div>
  );
}

const deviceId = "device-abc1324";
const causalClient = new CausalClient({
  cacheDurationSeconds: 10,
  deviceId,
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
