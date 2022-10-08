import React from 'react';
import Head from 'next/head';

const defaultMeta = {
  title: 'Coffin Ecommerce.',
  siteName: 'coffin-ecommerce.vercel.app',
  description: 'Each one of our wicker coffins has been intricately handwoven by skilled basket makers making each coffin unique and special.',
  url: 'https://coffin-ecommerce.vercel.app',
  type: 'website',
  robots: 'follow, index',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
  isBlog?: boolean;
  banner?: string;
} & Partial<typeof defaultMeta>;

const Seo = (props: SeoProps) => {

  const meta = {
    ...defaultMeta,
    ...props,
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <meta name='description' content={meta.description}/>
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:title' content={meta.title} />

      {/*<meta name='keywords' content={meta.keywords}/>*/}
      {/*<meta property='og:title' content={meta.ogTitle}/>*/}
      {/*<meta property='og:type' content={meta.ogType}/>*/}
      {/*<meta property='og:url' content={meta.ogUlr}/>*/}
      {/*<meta property='og:image' content={meta.ogImage}/>*/}
      <meta charSet='utf-8'/>
      <meta name='theme-color' content='#ffffff' />
      <link rel='icon' href='/favicon.ico'></link>
    </Head>
  );
}

export default Seo;
