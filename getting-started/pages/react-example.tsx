import { useState } from "react";
import {
  CausalProvider,
  queryBuilder,
  useCausal,
  CausalClient,
} from "../causal";
import ClientOnly from "../components/ClientOnly";
import { RatingWidget } from "../components/RatingWidget";

const causalClient = new CausalClient({
  cacheDurationSeconds: 60,
  deviceId: "abc123",
});

function ReactExample() {
  const products = [
    { name: "iPhone 13", url: "/iphone13.webp" },
    { name: "Pixel 5", url: "/pixel5.webp" },
    { name: "Samsung Galaxy Fold", url: "/galaxyfold.webp" },
  ];

  const [product] = useState(
    products[Math.floor(Math.random() * products.length)]
  );

  const [rating, setRating] = useState(0);

  const query = queryBuilder().getRatingBox({ product: product.name });
  const { data, error } = useCausal(query);

  if (error) {
    console.log(
      "This is expected - there is no impression server running yet. But it still works! " +
        "Causal is resilient to network and backend outages because the defaults are compiled in."
    );
  }

  if (!data.RatingBox) {
    return (
      <div>
        This would only happen if RatingBox was turned off via a feature flag
      </div>
    );
  }

  return (
    <div className="center">
      <h1>{product.name}</h1>
      <img src={product.url} alt="product image" />
      <h3>{data.RatingBox?.call_to_action}</h3>
      <RatingWidget
        curRating={rating}
        onSetRating={(newRating) => {
          setRating(newRating);
          data.RatingBox?.signalrating({ stars: rating });
        }}
      />
      <a href="">Rate Another</a>
    </div>
  );
}

export default function Provider() {
  return (
    <ClientOnly>
      <CausalProvider client={causalClient}>
        <ReactExample />
      </CausalProvider>
    </ClientOnly>
  );
}
