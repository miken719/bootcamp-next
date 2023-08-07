import { GOOGLE_ANALYTICS_ID } from "@/config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/favicon.ico"
        ></link>
        <meta httpEquiv="dns-prefetch-control" content="on" />

        <link rel="canonical" href="https://bootcamp-navigator.vercel.app/" />
        <link
          rel="canonical"
          href="https://bootcamp-navigator.vercel.app/auth/login"
        />
        <link
          rel="canonical"
          href="https://bootcamp-navigator.vercel.app/auth/register"
        />
        <link
          rel="canonical"
          href="https://bootcamp-navigator.vercel.app/auth/forgetpassword"
        />
        <script
          async
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        />
        <script
          async
          defer
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
