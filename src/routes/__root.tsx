import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/lib/theme";
import { profile } from "@/lib/site";
import appCss from "../styles.css?url";

const APP_NAME = profile.name;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Yash Gaud — motion designer and video editor. Infographics, explainers, and product motion. Designing just enough.",
      },
      { name: "theme-color", content: "#F4F1E8" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased paper-grain">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('yash-theme')==='dark'){document.documentElement.classList.add('dark');document.documentElement.dataset.theme='dark'}}catch(e){}})();`,
          }}
        />
        <PreviewHostBridge />
        <AuthProvider>
          <ThemeProvider>
            <a
              href="#work"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
            >
              Skip to work
            </a>
            <div className="relative z-10 flex min-h-dvh flex-col overflow-x-visible">
              <div className="mx-auto w-full max-w-5xl flex-1 overflow-visible">
                <Outlet />
              </div>
              <SiteFooter />
            </div>
          </ThemeProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
