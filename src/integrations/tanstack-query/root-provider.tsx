import { QueryClient } from "@tanstack/react-query";
import superjson from "superjson";
import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import fetchPonyfill from "fetch-ponyfill";

import type { TRPCRouter } from "@/integrations/trpc/router";
import { TRPCProvider } from "@/integrations/trpc/react";

function getUrl() {
  if (typeof window !== "undefined") {
    // browser should use relative path
    return `${window.location.origin}/api/trpc`;
  }
  if (process.env.VERCEL_URL) {
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}/api/trpc`;
  }
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}/api/trpc`;
}

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    httpBatchStreamLink({
      transformer: superjson,
      url: getUrl(),
      fetch: fetchPonyfill().fetch,
    }),
  ],
});

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: { serializeData: superjson.serialize },
      hydrate: { deserializeData: superjson.deserialize },
    },
  });

  const serverHelpers = createTRPCOptionsProxy({
    client: trpcClient,
    queryClient: queryClient,
  });
  return {
    queryClient,
    trpc: serverHelpers,
  };
}

export function Provider({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      {children}
    </TRPCProvider>
  );
}
