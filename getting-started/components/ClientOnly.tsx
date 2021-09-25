import { ReactNode, useEffect, useState } from "react";

function ClientOnly({
  children,
  ...props
}: {
  children?: ReactNode;
  [props: string]: unknown;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...props}>{children}</div>;
}

export default ClientOnly;
