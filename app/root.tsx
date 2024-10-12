import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import PublicEnv from "./components/public-env";
import { Toaster } from "./components/ui/sonner";
import DefaultLayout from "./layouts/default";
import WrapperProviders from "./providers/wrapper";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader() {
  return json({
    ENV: {
      APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID ?? "",
      APPWRITE_COLLECTION_STORE: process.env.APPWRITE_COLLECTION_STORE ?? "",
      APPWRITE_COLLECTION_CATEGORIES:
        process.env.APPWRITE_COLLECTION_CATEGORIES ?? "",
      SCRAPER_API: process.env.SCRAPER_API ?? "",
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <WrapperProviders>
          <DefaultLayout>{children}</DefaultLayout>

          <Toaster />
        </WrapperProviders>
        <ScrollRestoration />
        <PublicEnv {...data.ENV} />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
