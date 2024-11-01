import Head from 'next/head';
import Container from '../components/common/container';
import styled from 'styled-components';
import { IMAGE_ARRAY } from '../utils/constants';
import Image, { StaticImageData } from 'next/image';
import { GetStaticProps } from 'next';
import { AppProps } from 'next/app';
import Link from 'next/link';
import PageTransitionProvider from '../components/page-transition-provider';

const StyledDescription = styled.p`
  padding-top: 6px;
`;

const StyledImgWrapper = styled(Link)<{ transitionName: string }>`
  position: relative;
  margin: 36px auto;
  display: block;
  height: 575px;
  width: 100%;
  max-width: 575px;
  view-transition-name: ${({ transitionName }) => transitionName};

  img {
    object-fit: contain;
  }
`;

interface Props extends AppProps {
  pageImage: {
    name: string;
    image: StaticImageData;
    slug: string;
  };
}

export default function ImagePage({ pageImage }: Props) {
  return (
    <>
      <Head>
        <title>{pageImage.name}</title>
        <meta name='description' content='Individual image page for Litebox View Transition API example' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <PageTransitionProvider>
          <Container>
            <h1>{pageImage.name}:</h1>
            <StyledDescription>Click on the image to go back to the gallery:</StyledDescription>

            <StyledImgWrapper href='/' transitionName={pageImage.slug}>
              <Image src={pageImage.image} alt={pageImage.name} fill />
            </StyledImgWrapper>
          </Container>
        </PageTransitionProvider>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = IMAGE_ARRAY.map(image => ({
    params: { slug: image.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ctx => {
  const slug = ctx.params?.slug as string;

  const imageIndex = IMAGE_ARRAY.findIndex(obj => obj.slug === slug);
  if (imageIndex === -1) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const currentImage = IMAGE_ARRAY[imageIndex];

  if (!Object.keys(currentImage).length) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  return {
    props: {
      pageImage: currentImage,
    },
    revalidate: 10,
  };
};
