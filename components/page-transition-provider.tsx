import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransitionProvider = ({ children }: PageTransitionProps) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleRouteChange = useCallback(
    (url: string) => {
      if (isTransitioning || router.asPath === url) return;

      setIsTransitioning(true);

      /* eslint-disable @typescript-eslint/no-explicit-any */
      if ((document as any).startViewTransition) {
        (document as any).startViewTransition(() => router.push(url));
      } else {
        router.push(url);
      }
      /* eslint-enable @typescript-eslint/no-explicit-any */
    },
    [router, isTransitioning]
  );

  const onRouteChangeComplete = () => {
    setIsTransitioning(false);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [handleRouteChange, router]);

  return <>{children}</>;
};

export default PageTransitionProvider;
