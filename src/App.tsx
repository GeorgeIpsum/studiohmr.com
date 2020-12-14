import React, { CSSProperties, useEffect, useState } from 'react';
import { ReactComponent as Bg } from './bg.svg';
import { ReactComponent as Bg2 } from './bg2.svg';
import hmr from './hmr.png';
import hmrw from './hmr.webp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

const getThings = () => {
  const a: [(HTMLElement | null), (HTMLElement | null)][] = [];
  for (let i = 1; i < 15; i++) {
    const b = document.getElementById(`bg_${ i }`);
    const b2 = document.getElementById(`bg_${ i }_2`);
    if (b || b2) a.push([b, b2]);
  }
  return a;
};

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
};

const Home: React.FC = () => {
  const { height: h, width: w } = useWindowSize();
  const width = w ?? window.innerWidth;
  const height = h ?? window.innerHeight;
  const imgSize = 0.3 * height;

  const middleHeight = (height / 2) - (imgSize / 2);
  const middleWidth = (width / 2) - (imgSize / 2);
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
    transform: `translate(-${ (width / 2 - (imgSize * scale) / 2) - 5 }px, -${ (height / 2 - (imgSize * scale) / 2) - 5 }px) scale(${ scale.toString() })`
  };

  let pictureStyle: CSSProperties = {
    position: 'absolute',
    top: middleHeight + (firstTransform ? 0 : 30),
    left: middleWidth,
    transition: animating ? `scale 1s ease-out, opacity 1s ease-in, top 1s ease-in, transform 2s ease-in-out` : undefined,
    opacity: firstTransform ? '1' : '0'
  };

  if (useTransform) {
    pictureStyle = {
      ...pictureStyle,
      ...transform
    };
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
  };

  const useHotDog = (height ?? 0) > (width ?? 0);
  const bgStyle: CSSProperties = { height: '100%', width: '100%' };

  return (<>
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: useHotDog ? 'center' : 'flex-start', flexFlow: 'row', background: 'black' }}>
      <Bg style={{ ...bgStyle, display: useHotDog ? 'none' : 'block' }} />
      <Bg2 style={{ ...bgStyle, display: useHotDog ? 'block' : 'none' }} />
    </div>
    <picture id="logo" style={pictureStyle}>
      <source style={imageStyle} type="image/webp" srcSet={hmrw} />
      <img style={imageStyle} src={hmr} alt="hmr" />
    </picture>
    <div style={h1Style}><h1 style={{ fontFamily: 'sans-serif', fontSize: 24 }}>STUDIO HMR</h1></div>
  </>);
};

const Sunrise: React.FC = () => {
  // const { width: w, height: h } = useWindowSize();
  // const width = w ?? window.innerWidth;
  // const height = h ?? window.innerHeight;
  const [goBackVisible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      const sun = document.getElementById("OH_PUTRID_LIGHT");
      if (sun) {
        sun.style.bottom = '31%';
      }

      const sky = document.getElementById("let_the_sky_fall");
      if (sky) {
        sky.style.background = '#fa7b620F';
      }

      const bg = document.getElementById("dont_let_go");
      if (bg) {
        bg.style.opacity = '1';
      }

      setTimeout(() => {
        setVisible(true);
      }, 5000);
    }, 50);
  }, []);

  const userAgent = navigator.userAgent.toLowerCase();
  const isSafari = userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1;

  const SKYFALL = () => {
    if (isSafari) {
      return (<div id="flor" style={{ width: '100%', height: '32%' }} />);
    }

    return (<>
      <div id="faun" className="bbg">
        <div id="dawn_3" className="bg" />
      </div>
      <div id="flora" className="bbg">
        <div id="dawn_2" className="bg" />
      </div>
      <div id="flor" className="bbg">
        <div id="dawn" className="bg" />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="forest_1" clipPathUnits="objectBoundingBox">
            <path d="M0,0.076 L0.01,0.046,0.019,0.059,0.028,0.096,0.034,0.102,0.045,0.099,0.047,0,0.056,0.083,0.064,0.122,0.076,0.132,0.09,0.135,0.099,0.122,0.107,0.083,0.111,0.056,0.117,0.112 H0.126 L0.131,0.135,0.14,0.152,0.146,0.175,0.151,0.145,0.158,0.168,0.165,0.116,0.17,0.125,0.178,0.053,0.184,0.109,0.192,0.122,0.2,0.149,0.205,0.185,0.221,0.191,0.23,0.221,0.24,0.254,0.251,0.29,0.268,0.297,0.278,0.33,0.282,0.366,0.293,0.386,0.313,0.366,0.325,0.34,0.335,0.376,0.35,0.393,0.356,0.383,0.368,0.419,0.385,0.422,0.391,0.406,0.401,0.422,0.414,0.419,0.426,0.446,0.453,0.442,0.457,0.403,0.461,0.383,0.467,0.416,0.473,0.406,0.482,0.432,0.49,0.429,0.498,0.409,0.508,0.327,0.514,0.38 H0.523 L0.536,0.389,0.55,0.403,0.558,0.333,0.564,0.373,0.574,0.35,0.585,0.347,0.613,0.314,0.624,0.248,0.629,0.277,0.639,0.287,0.644,0.277,0.646,0.297,0.653,0.317,0.66,0.215,0.667,0.271,0.67,0.304,0.675,0.244,0.682,0.284 H0.694 L0.697,0.323,0.705,0.33,0.713,0.244,0.717,0.271,0.725,0.297,0.734,0.294,0.745,0.284,0.754,0.307,0.773,0.277,0.785,0.3,0.799,0.281,0.811,0.254,0.813,0.271,0.821,0.3,0.83,0.205,0.842,0.162,0.842,0.215,0.857,0.231,0.887,0.208,0.892,0.234,0.901,0.182,0.908,0.241 H0.917 L0.92,0.215,0.926,0.198,0.928,0.241,0.936,0.231,0.944,0.198,0.944,0.238,0.955,0.224,0.959,0.264,0.971,0.208,0.973,0.297,0.98,0.211,1,0.304,1,1.0 L-1,1" />
          </clipPath>
          <clipPath id="forest_2" clipPathUnits="objectBoundingBox">
            <path d="M0,0.081 L0.014,0.111,0.025,0.104,0.05,0.146,0.063,0.123,0.095,0.153,0.106,0.139,0.11,0.148,0.114,0.111,0.13,0.1,0.141,0.113,0.153,0.146,0.163,0.137,0.173,0.153 H0.203 L0.225,0.157,0.244,0.164,0.257,0.171 H0.275 L0.291,0.181,0.308,0.188 H0.325 L0.337,0.208 H0.355 L0.367,0.25,0.386,0.264,0.4,0.285,0.417,0.322,0.436,0.361,0.444,0.37,0.459,0.398,0.464,0.382,0.482,0.391,0.493,0.387,0.503,0.396,0.516,0.41,0.527,0.412,0.532,0.426,0.539,0.41,0.552,0.391,0.568,0.396,0.58,0.4,0.592,0.38,0.608,0.382,0.62,0.37,0.628,0.333,0.643,0.317,0.659,0.31,0.671,0.322,0.682,0.282,0.695,0.243,0.718,0.197,0.744,0.148,0.768,0.1,0.777,0.076,0.795,0.09,0.807,0.086,0.84,0.109,0.881,0.037,0.897,0.046,0.931,0.032,0.94,0.019 H0.951 L0.966,0.012,0.976,0.03,1,0.023,1,1 L-0,1" />
          </clipPath>
          <clipPath id="forest_3" clipPathUnits="objectBoundingBox">
            <path d="M0,0 C0.036,0.107,0.076,0.07,0.076,0.07 S0.166,0.064,0.189,0.102 S0.214,0.191,0.297,0.219 S0.367,0.202,0.463,0.187 S0.579,0.232,0.634,0.214 S0.728,0.109,0.802,0.069 S1,0.033,1,0.041 S1,1,1,1 L-0,1 S-0,0,0,0" />
          </clipPath>
        </defs>
      </svg>
    </>);
  };

  const otherDisplay: CSSProperties = goBackVisible
    ? {
      opacity: '1'
    } : {
      opacity: '0'
    };

  return (<div id="dont_let_go" style={{ opacity: 0, transition: 'opacity 0.5s ease', height: '100%' }}>
    <Link to="" style={{ position: 'fixed', top: 15, left: 15, zIndex: 100000 }}>
      <div style={{ transition: 'opacity 1s ease', ...otherDisplay }}>
        <GoBack style={{ background: 'transparent', fill: 'white' }} />
      </div>
    </Link>
    <div id="let_the_sky_fall" style={{ maxWidth: '100%', height: '100%', background: '#fa7b6200', position: 'relative', overflowX: 'hidden', transition: 'background 4s ease' }}>
      <Nasty style={{position: 'absolute', right: '50%', bottom: '11%'}} />
      { SKYFALL() }
    </div>
    <div style={{ height: 1500, position: 'relative' }} className="next">
      {isSafari && <div style={{ position: 'absolute', bottom: 0, width: '100%', color: 'white', textAlign: 'center', marginBottom: 5 }}>Please use a better browser. Thx</div>}
    </div>
  </div>);
};

const Nasty: React.FC<{ style: CSSProperties }> = ({ style }) => {
  return <div id="OH_PUTRID_LIGHT" style={{ height: 30, width: 30, borderRadius: 30, backgroundColor: '#fa7b62', transition: 'bottom 4s ease', ...style }} />;
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{ width?: number, height?: number; }>({
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

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<{ mouseX?: number, mouseY?: number; }>({
    mouseX: undefined,
    mouseY: undefined
  });

  const handleMouseMove = (ev: MouseEvent) => {
    setMousePosition({
      mouseX: ev.clientX,
      mouseY: ev.clientY
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}

const GoBack: React.FC<{ style: CSSProperties, width?: string, height?: string }> = ({ style, width = '20px', height = '20px' }) => {
  return (
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width={width} height={height} viewBox="0 0 408 408" style={style} xmlSpace="preserve">
      <path d="M408,178.5H96.9L239.7,35.7L204,0L0,204l204,204l35.7-35.7L96.9,229.5H408V178.5z" />
    </svg>
  );
}

export default App;
