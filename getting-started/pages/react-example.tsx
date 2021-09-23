import {
  CausalProvider,
  queryBuilder,
  useCausal,
  CausalClient,
  setBaseUrl,
} from "../causal";

const causalClient = new CausalClient({
  cacheDurationSeconds: 60,
  deviceId: "abc123",
});

export default function App() {
  return (
    <CausalProvider client={causalClient}>
      <ReactExample />
    </CausalProvider>
  );
}

function ReactExample() {
  const query = queryBuilder().getRatingBox({ product: "iPhone 13" });

  const { data, loading, error } = useCausal(query, {
    deviceId: "abc123",
  });

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!data || error) {
  //   return <div>Error...</div>;
  // }

  return <div>{data.RatingBox?.call_to_action}</div>;
}
