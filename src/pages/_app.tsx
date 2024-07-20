// Top
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useEffect, useState } from "react";

// Supabase
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  Session,
  useSession,
} from "@supabase/auth-helpers-react";

// ChakraUI
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme/theme";

// Query
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Layout
import AppLayout from "@/components/layout/Layout/AppLayout";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  const pathsRequiringLayout: string[] = ["/app"];
  const excludedPaths: string[] = [
    "/apps/[accountId]/collections/contact/[contactId]",
    "/apps/[accountId]/campaigns/[campaignId]",
  ];
  const requiresLayout = pathsRequiringLayout.some((path) =>
    router.pathname.startsWith(path)
  );
  const shouldExclude = excludedPaths.some((path) =>
    router.pathname.startsWith(path)
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          {requiresLayout && !shouldExclude ? (
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
