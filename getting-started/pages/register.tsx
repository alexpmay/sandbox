import { useRouter } from "next/router";
import React from "react";
import { RegisterDevice } from "../causal";
import ClientOnly, { getOrGenDeviceId } from "../utils";

export default function Page() {
  return (
    <ClientOnly>
      <RegistrationPage />
    </ClientOnly>
  );
}

export function RegistrationPage() {
  const router = useRouter();

  const query = router.query;
  if (!query.userId) {
    return <div>No user id in query string</div>;
  }

  const deviceId = getOrGenDeviceId(router);
  return (
    <div>
      <RegisterDevice
        userId={query.userId as string}
        deviceId={deviceId}
      ></RegisterDevice>
    </div>
  );
}
