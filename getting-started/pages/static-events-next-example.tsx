import { GetServerSideProps } from "next";
import { useState } from "react";
import { CausalClient, generateId, queryBuilder, RatingBox } from "../causal";
import { RatingWidget } from "../components/RatingWidget";

type SSRProps = {
  product: typeof products[keyof typeof products];
  CTA: string;
  impressionId: string;
};

export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context
) => {
  const product = products[context.query.pid as keyof typeof products];

  const impressionId = generateId();

  const query = queryBuilder().getRatingBox({ product: product.name });
  const { impression, error } = await causalClient.requestImpression(
    query,
    impressionId
  );

  if (product == undefined || impression.RatingBox == undefined) {
    return {
      redirect: { destination: "ssr-example?pid=iphone" },
    } as any; // eslint-disable-line
  }

  if (error) {
    console.log(
      "There is no impression server running yet, but it still works! " +
        "Causal is resilient to network and backend outages because the defaults are compiled in 😃."
    );
  }

  const props: SSRProps = {
    impressionId,
    product,
    CTA: impression.RatingBox?.call_to_action,
  };
  return { props };
};

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
          RatingBox.signalrating(deviceId, impressionId, { stars: rating });

          // For autocomplete convienence, you can also reference the feature
          // classes through the allFeatures variable.
          //
          // allFeatures.RatingBox.signalrating(deviceId, impressionId, {
          //   stars: rating,
          // });
        }}
      />
      <a href={"static-events-next-example?pid=" + product.next}>
        Rate Another
      </a>
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
