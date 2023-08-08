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
        <link rel="icon" href="/favicon.ico" />
        <meta httpEquiv="dns-prefetch-control" content="on" />
        <meta name="apple-mobile-web-app-title" content="CodeMastery" />
        <meta name="application-name" content="CodeMastery" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Transform your web development aspirations into reality with our Intensive Coding Bootcamp! 🚀 Gain hands-on experience, master the latest technologies, and build a standout portfolio through practical projects. Led by industry experts, our comprehensive curriculum covers both front-end and back-end development. Join a collaborative community, receive career support, and propel your journey to becoming a Web Development Pro. Enroll today and unlock your full potential in the world of web development!."
        />
        <meta
          name="keywords"
          content="VIT, Workshops, CodeMasteryCamp,CodeMastery Coding, Navigator,  Bootcamp, Summer Bootcamp, Web, App, Machine Learning, Research, Design, Development"
        />
        <meta
          property="og:url"
          content="https://bootcamp-navigator.vercel.app/"
        />
        <meta property="og:site_name" content="CodeMastery" />
        <meta property="og:image" content="/android-chrome-512x512.png" />
        <meta property="og:type" content="Website" />
        <meta
          property="og:description"
          content="Transform your web development aspirations into reality with our Intensive Coding Bootcamp! 🚀 Gain hands-on experience, master the latest technologies, and build a standout portfolio through practical projects. Led by industry experts, our comprehensive curriculum covers both front-end and back-end development. Join a collaborative community, receive career support, and propel your journey to becoming a Web Development Pro. Enroll today and unlock your full potential in the world of web development!."
        />
        <meta property="og:title" content="CodeMastery" />
        <meta name="author" content="Miken Prajapati" />

        <meta property="twitter:card" content="CodeMastery" />
        <meta
          property="twitter:url"
          content="https://bootcamp-navigator.vercel.app/"
        />
        <meta property="twitter:title" content="CodeMastery" />
        <meta
          property="twitter:description"
          content="Transform your web development aspirations into reality with our Intensive Coding Bootcamp! 🚀 Gain hands-on experience, master the latest technologies, and build a standout portfolio through practical projects. Led by industry experts, our comprehensive curriculum covers both front-end and back-end development. Join a collaborative community, receive career support, and propel your journey to becoming a Web Development Pro. Enroll today and unlock your full potential in the world of web development!."
        />
        <link rel="manifest" href="/manifest.json" />
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
