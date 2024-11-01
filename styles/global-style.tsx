import { createGlobalStyle, css } from 'styled-components';
import { IMAGE_ARRAY } from '../utils/constants';

const reset = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    color: #f8f8f7;
    font-family: 'Inter', sans-serif;
  }
  html,
  body {
    max-width: 100vw;
    background-color: #383838;
  }
  main {
    padding: 32px 0px;
  }
`;

const viewTransition = css`
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      opacity: 1;
      transform: translateX(0%);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }
  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  @keyframes jump-in {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    70% {
      opacity: 1;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @keyframes jump-out {
    from {
      opacity: 1;
      transform: translateY(0%);
    }
    30% {
      opacity: 1;
      transform: translateY(-10%);
    }
    to {
      opacity: 0;
      transform: translateY(100%);
    }
  }

  @keyframes rotate-out {
    from {
      opacity: 1;
      transform: rotate(360deg) scale(1);
    }
    to {
      opacity: 0;
      transform: rotate(0deg) scale(0.8);
    }
  }
  @keyframes rotate-in {
    from {
      opacity: 0;
      transform: rotate(0deg) scale(0.8);
    }
    to {
      opacity: 1;
      transform: rotate(360deg) scale(1);
    }
  }

  @keyframes three-dee-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(1.75);
    }
  }
  @keyframes three-dee-in {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes zoomin-out {
    from {
      opacity: 1;
      transform: translateX(0%);
    }
    20% {
      opacity: 1;
      transform: translateX(-10%);
    }
    70% {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  @keyframes zoomin-in {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    30% {
      opacity: 0;
      transform: translateX(-100%);
    }
    80% {
      opacity: 1;
      transform: translateX(10%);
    }
    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  @keyframes cash-in {
    from {
      opacity: 0;
      transform: translateY(5%);
      translate: -40px;
    }
    25% {
      translate: 40px;
    }
    50% {
      translate: -40px;
    }
    75% {
      translate: 40px;
    }
    to {
      opacity: 1;
      transform: translateY(0%);
      translate: 0px;
    }
  }
  @keyframes cash-out {
    from {
      opacity: 1;
      transform: translateY(0%);
      translate: 0px;
    }
    25% {
      translate: 40px;
    }
    50% {
      translate: -40px;
    }
    75% {
      translate: 40px;
    }
    to {
      opacity: 0;
      transform: translateY(5%);
      translate: -40px;
    }
  }

  ::view-transition-new(root) {
    animation: fade-in 0.4s ease-in-out;
  }
  ::view-transition-old(root) {
    animation: fade-out 0.4s ease-in-out;
  }

  ${() =>
    IMAGE_ARRAY.map((image, i) => {
      const ANIMATION_MAPPER: Record<string, [string, string]> = {
        '0': ['slide-in', 'slide-out'],
        '1': ['jump-in', 'jump-out'],
        '2': ['rotate-in', 'rotate-out'],
        '3': ['three-dee-in', 'three-dee-out'],
        '4': ['zoomin-in', 'zoomin-out'],
        '5': ['cash-in', 'cash-out'],
      };

      return `
      ::view-transition-new(${image.slug}) {
          animation: ${ANIMATION_MAPPER?.[i]?.[0] ?? 'slide-in'} 0.5s ease-in-out;
      }
      ::view-transition-old(${image.slug}) {
          animation: ${ANIMATION_MAPPER?.[i]?.[1] ?? 'slide-out'} 0.5s ease-in-out;
      }
      `;
    }).join('')}
`;

export const GlobalStyle = createGlobalStyle`
  ${reset}
  ${viewTransition}
`;
