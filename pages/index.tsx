import Head from 'next/head';
import Container from '../components/common/container';
import styled from 'styled-components';
import { LG_MIN_MEDIA_QUERY, MD_MIN_MEDIA_QUERY, SM_MIN_MEDIA_QUERY } from '../styles/theme';
import { IMAGE_ARRAY } from '../utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import PageTransitionProvider from '../components/page-transition-provider';

const StyledDescription = styled.p`
  padding-top: 6px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin: 36px auto;

  ${SM_MIN_MEDIA_QUERY} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${MD_MIN_MEDIA_QUERY} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledImgWrapper = styled(Link)`
  height: 220px;
  width: 100%;
  position: relative;
  margin: 0 auto;

  img {
    object-fit: contain;
  }

  ${LG_MIN_MEDIA_QUERY} {
    height: 275px;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>View Transition API example</title>
        <meta name='description' content='Index page for Litebox View Transition API example' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <PageTransitionProvider>
          <Container>
            <h1>View Transition API example</h1>
            <StyledDescription>Click any image to see the view transition</StyledDescription>

            <StyledGrid>
              {IMAGE_ARRAY.map(image => {
                return (
                  <StyledImgWrapper key={image.slug} href={`/${image.slug}`}>
                    <Image src={image.image} alt={image.name} fill />
                  </StyledImgWrapper>
                );
              })}
            </StyledGrid>
          </Container>
        </PageTransitionProvider>
      </main>
    </>
  );
}
