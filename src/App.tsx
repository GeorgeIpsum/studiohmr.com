import React, { CSSProperties, useEffect, useState } from 'react';
import { ReactComponent as Bg } from './bg.svg';
import { ReactComponent as Bg2 } from './bg2.svg';
import hmr from './hmr.png';
import hmrw from './hmr.webp';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

const getThings = () => {
  const a: [(HTMLElement | null), (HTMLElement | null)][] = [];
  for (let i = 1; i < 15; i++) {
    const b = document.getElementById(`bg_${ i }`);
    const b2 = document.getElementById(`bg_${ i }_2`);
    if (b || b2) a.push([b,b2]);
  }
  return a;
}

function easeInSine(x: number): number {
  return 1 - Math.cos((x * Math.PI) / 2);
}

// function easeInCubic(x: number): number {
//   return x * x * x;
// }

// function easeInCirc(x: number): number {
//   return 1 - Math.sqrt(1 - Math.pow(x, 2));
// }

const easingFunc = easeInSine;

const App: React.FC = () => {
  return (<>
    <Router>
      <Switch>
        <Route path="/sunrise">
          <Sunrise />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </>);
}

const Home: React.FC = () => {
  const { height, width } = useWindowSize();
  const imgSize = 0.3 * (height ?? 1200);
  const middleHeight = (window.innerHeight / 2) - (imgSize / 2);
  const middleWidth = (window.innerWidth / 2) - (imgSize / 2);
  const [useTransform, setUseTransform] = useState<boolean>(false);
  const [firstTransform, setFirstTransform] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {
    const fills = getThings();
    if (Array.isArray(fills)) {
      for (let i = 0; i < fills.length; i++) {
        const fill = fills[i];
        setTimeout(() => {
          if (fill[0]) {
            fill[0].style.opacity = '1';
            fill[0].style.translate = '0px 0px';
          }
          if (fill[1]) {
            fill[1].style.opacity = '1';
            fill[1].style.translate = '0px 0px';
          }
        }, (200 * fills.length * easingFunc((i + 1) / fills.length)));
      }
    }
    setTimeout(() => {
      setFirstTransform(true);
    }, 200);
    setTimeout(() => {
      setUseTransform(true);
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
      }, 2500);
    }, 1700);
    setTimeout(() => {
      setShowText(true);
    }, 2500);
  }, []);

  const imageStyle: CSSProperties = {
    height: imgSize,
    width: imgSize,
    pointerEvents: 'none'
  };

  const scale = (height ?? 500) < 500 ? 0.5 : 0.3;

  const transform: CSSProperties = {
    transform: `translate(-${ (window.innerWidth / 2 - (imgSize * scale) / 2) - 5 }px, -${ (window.innerHeight / 2 - (imgSize * scale) / 2) - 5 }px) scale(${ scale.toString() })`
  };

  let pictureStyle: CSSProperties = {
    position: 'absolute',
    top: middleHeight + (firstTransform ? 0 : 30),
    left: middleWidth,
    transition: `scale 1s ease-out, opacity 1s ease-in, top 1s ease-in${ animating ? ', transform 2s ease-in-out' : ''}`,
    opacity: firstTransform ? '1' : '0'
  };

  if (useTransform) {
    pictureStyle = {
      ...pictureStyle,
      ...transform
    }
  }

  const h1Style: CSSProperties = {
    position: 'absolute',
    top: 5,
    left: imgSize * scale + 5,
    color: 'white',
    height: imgSize * scale,
    display: 'flex',
    alignItems: 'center',
    opacity: showText ? '1' : '0',
    transition: 'opacity 0.5s ease-in'
  }

  const useHotDog = (height ?? 0) > (width ?? 0);
  const bgStyle: CSSProperties = { height: '100%', width: '100%' };

  return (<>
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', flexFlow: 'row', background: 'black' }}>
      <Bg style={{...bgStyle, display: useHotDog ? 'none' : 'block'}} />
      <Bg2 style={{...bgStyle, display: useHotDog ? 'block' : 'none'}} />
    </div>
    <picture id="logo" style={pictureStyle}>
      <source style={imageStyle} type="image/webp" srcSet={hmrw} />
      <img style={imageStyle} src={hmr} />
    </picture>
    <div style={h1Style}><h1 style={{ fontFamily: 'sans-serif', fontSize: 24 }}>STUDIO HMR</h1></div>
  </>);
}

const Sunrise: React.FC = () => {
  return <div style={{ color: 'white' }}>Coming Soon</div>;
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{ width?: number, height?: number }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

// function useMousePosition() {
//   const [mousePosition, setMousePosition] = useState<{ mouseX?: number, mouseY?: number; }>({
//     mouseX: undefined,
//     mouseY: undefined
//   });

//   const handleMouseMove = (ev: MouseEvent) => {
//     setMousePosition({
//       mouseX: ev.clientX,
//       mouseY: ev.clientY
//     });
//   }

//   useEffect(() => {
//     window.addEventListener("mousemove", handleMouseMove);

//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return mousePosition;
// }

export default App;
