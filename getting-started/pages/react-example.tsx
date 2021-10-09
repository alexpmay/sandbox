import {
  CausalClient,
  CausalProvider,
  queryBuilder,
  useImpression,
} from "../causal";

import { RatingWidget } from "../components/RatingWidget";
import { useRouter } from "next/router";
import { useState } from "react";

const causalClient = new CausalClient({
  deviceId: "device-abc1324",
});

export default function Page() {
  const router = useRouter();
  const product = products[router.query.pid as keyof typeof products];

  if (product == undefined) {
    return <></>; // Product not found
  }

  return (
    <CausalProvider client={causalClient}>
      <Example product={product} />
    </CausalProvider>
  );
}

function Example({
  product,
}: {
  product: { name: string; url: string; next: string };
}) {
  const [rating, setRating] = useState(0);

  const query = queryBuilder().getRatingBox({ product: product.name });
  const { data, error } = useImpression(query);

  if (error) {
    console.log(
      "There is no impression server running yet, but it still works! " +
        "Causal is resilient to network and backend outages " +
        "because the defaults are compiled in 😃."
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
      <a href={"react-example?pid=" + product.next}>Rate Another</a>
    </div>
  );
}

const products = {
  iphone: { name: "iPhone 13", url: "/iphone13.webp", next: "pixel" },
  pixel: { name: "Pixel 5", url: "/pixel5.webp", next: "fold" },
  fold: {
    name: "Samsung Galaxy Fold",
    url: "/galaxyfold.webp",
    next: "iphone",
  },
};
