import { GetServerSideProps } from "next";
import { useState } from "react";
import {
  CausalClient,
  createQuery,
  ImpressionJSON,
  SelectFeatures,
  toImpression,
} from "../causal";
import { RatingWidget } from "../components/RatingWidget";

type RatingFeatures = SelectFeatures<"RatingBox">;

type SSRProps = {
  product: typeof products[keyof typeof products];
  json: ImpressionJSON<RatingFeatures>;
};

export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context
) => {
  const product = products[context.query.pid as keyof typeof products];
  if (product == undefined) {
    return {
      redirect: { destination: "ssr-example?pid=iphone" },
    } as any; // eslint-disable-line;
  }

  const query = createQuery<RatingFeatures>({
    RatingBox: { product: product.name },
  });

  const { impression, error } = await causalClient.requestImpression(query);

  if (error) {
    console.log(
      "There is no impression server running yet, but it still works! " +
        "Causal is resilient to network and backend outages because the defaults are compiled in 😃."
    );
  }

  const props: SSRProps = { product, json: impression.toJSON() };
  return { props };
};

export default function Example({ json, product }: SSRProps) {
  const [rating, setRating] = useState(0);

  const impression = toImpression(json);

  return (
    <div className="center">
      <h1>{product.name}</h1>
      <img src={product.url} alt="product image" />

      <h3>{impression.RatingBox?.call_to_action}</h3>

      <RatingWidget
        curRating={rating}
        onSetRating={(newRating) => {
          setRating(newRating);
          impression.RatingBox?.signalrating({ stars: rating });
        }}
      />
      <a href={"ssr-next-example?pid=" + product.next}>Rate Another</a>
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
