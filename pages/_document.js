import { GOOGLE_ANALYTICS_ID } from "@/config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document({ metaInfo }) {
  return (
    <Html lang="en">
      <Head>
        <title>
          {metaInfo && metaInfo.title
            ? metaInfo.title
            : "BootCampGo | Find a coding bootcamp"}
        </title>
        <meta
          name="title"
          content={
            metaInfo && metaInfo.yoast_wpseo_title
              ? metaInfo.yoast_wpseo_title
              : "Bootcamp title"
          }
        />
        <meta
          name="description"
          content={
            metaInfo && metaInfo.yoast_wpseo_metadesc
              ? metaInfo.yoast_wpseo_metadesc
              : "Bootcamp description"
          }
        />
        <meta
          name="keywords"
          content={
            metaInfo && metaInfo.yoast_wpseo_metakeywords
              ? metaInfo.yoast_wpseo_metakeywords
              : "Bootcamp keyword"
          }
        />
        <meta
          name="image"
          content={
            metaInfo && metaInfo.yoast_wpseo_opengraph_image
              ? metaInfo.yoast_wpseo_opengraph_image
              : "Bootcamp image"
          }
        />
        <meta
          name="redirect"
          content={
            metaInfo && metaInfo.yoast_wpseo_redirect
              ? metaInfo.yoast_wpseo_redirect
              : " Bootcamp redirect"
          }
        />
        <meta
          name="robots_adv"
          content={
            metaInfo && metaInfo.yoast_wpseo_meta_robots_adv
              ? metaInfo.yoast_wpseo_meta_robots_adv
              : " Bootcamp robots adv"
          }
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
        <meta name="robots" content="noindex,nofollow" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        />

        <script
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

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossorigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
