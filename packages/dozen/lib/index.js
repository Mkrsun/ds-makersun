function ___$insertStyle(css) {
    if (!css || typeof window === 'undefined') {
        return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

import { jsx, jsxs } from 'react/jsx-runtime';
import React, { useState, useRef, useEffect, Children, useContext, useLayoutEffect } from 'react';
import { connect, Provider } from 'react-redux';
import ReactDOM from 'react-dom';

___$insertStyle(".ds-makersun-dozen-pill-container {\n  display: flex;\n  border: 2px solid #333333;\n  justify-content: center;\n  align-items: center;\n  border-radius: 100%;\n  width: 21px;\n  height: 21px;\n  font-size: 11px;\n  font-weight: 700;\n}");

const Pill = ({ className = '', ariaLabel, type = 'normal', value, style, onClick, onMouseEnter, onMouseLeave, }) => {
    return (jsx("div", { className: `ds-makersun-dozen-pill-container ${type}-pill ${className}`, "data-testid": `ds-makersun-dozen-pill`, "aria-label": ariaLabel, tabIndex: 0, onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, style: style, children: value }));
};

___$insertStyle(".ds-makersun-dozen-task-container {\n  display: flex;\n  border: 1px solid #333333;\n  border-bottom: 2px solid #333333;\n  border-radius: 7px;\n  max-width: 350px;\n  cursor: pointer;\n  background-color: white;\n}\n.ds-makersun-dozen-task-container .left-side {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 10px 8px;\n  height: 100%;\n  width: 85%;\n  user-select: none;\n  box-sizing: border-box;\n}\n.ds-makersun-dozen-task-container .right-side {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 15%;\n}");

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __rest$1(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const hexToRgba = (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    return rgba;
};
const getDeltaPercentage = (size, delta) => {
    return Math.ceil((delta * 100) / size);
};

___$insertStyle(".ds-makersun-dozen-swipeable-wrapper-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background-color 0.3s;\n  position: relative;\n  width: fit-content;\n  overflow: hidden;\n}\n.ds-makersun-dozen-swipeable-wrapper-container .overlay {\n  opacity: 0;\n}\n.ds-makersun-dozen-swipeable-wrapper-container.swiping .overlay {\n  opacity: 1;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 0%;\n  height: 100%;\n  pointer-events: none;\n  transition: transform 0.3s ease-in-out, background-color 500ms ease-in-out, opacity 100ms ease-in-out;\n}");

const defaultValues = {
    onHoverColor: '#2869261',
};
const SwipeableWrapper = (_a) => {
    var _b;
    var { className = '', ariaLabel, overlayColor, completeOverlayColor, onHoverColor, children, gesturesEnabled, isCompleted, onTouchStart, onTouchEnd, onMouseDown, onMouseUp, onSwipeComplete, setIsComplete, setShowDoneIcon } = _a, props = __rest$1(_a, ["className", "ariaLabel", "overlayColor", "completeOverlayColor", "onHoverColor", "children", "gesturesEnabled", "isCompleted", "onTouchStart", "onTouchEnd", "onMouseDown", "onMouseUp", "onSwipeComplete", "setIsComplete", "setShowDoneIcon"]);
    const [startX, setStartX] = useState(null);
    const [swipeDistance, setSwipeDistance] = useState(0);
    const [halfWidth, setHalfWidth] = useState(null);
    const [currentOverlayColor, setCurrentOverlayColor] = useState(overlayColor ? hexToRgba(overlayColor) : '#B8FFB5');
    const [isHover, setIsHover] = useState(false);
    const containerRef = useRef(null);
    const handleTouchStart = (event) => {
        onTouchStart && onTouchStart(event);
        setStartX(event.touches[0].clientX);
    };
    const handleTouchMove = (event) => {
        if (startX !== null && gesturesEnabled) {
            const currentX = event.touches[0].clientX;
            const deltaX = currentX - startX;
            setSwipeDistance(deltaX);
        }
    };
    const handleTouchEnd = (event) => {
        onTouchEnd && gesturesEnabled && onTouchEnd(event);
        if (startX !== null && halfWidth && gesturesEnabled) {
            if (Math.abs(swipeDistance) > halfWidth) {
                onSwipeComplete && onSwipeComplete();
            }
            setStartX(null);
            setSwipeDistance(0);
        }
    };
    const handleMouseDown = (event) => {
        if (gesturesEnabled) {
            onMouseDown && onMouseDown(event);
            setStartX(event.clientX);
        }
    };
    const handleMouseMove = (event) => {
        if (startX !== null && gesturesEnabled) {
            const currentX = event.clientX;
            const deltaX = currentX - startX;
            setSwipeDistance(deltaX);
        }
    };
    const handleMouseUp = (event) => {
        if (gesturesEnabled) {
            onMouseUp && onMouseUp(event);
            if (startX !== null && halfWidth) {
                if (Math.abs(swipeDistance) > halfWidth) {
                    onSwipeComplete && onSwipeComplete();
                }
                setStartX(null);
                setSwipeDistance(0);
            }
        }
    };
    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };
    const getBackgroundColor = (isHover, onHoverColor) => {
        if (isHover && !startX) {
            if (onHoverColor) {
                return hexToRgba(onHoverColor);
            }
            else {
                return hexToRgba(defaultValues.onHoverColor);
            }
        }
        else {
            return 'initial';
        }
    };
    useEffect(() => {
        if (halfWidth && Math.abs(swipeDistance) > halfWidth && gesturesEnabled) {
            // Set complete overlay color
            setCurrentOverlayColor(completeOverlayColor ? hexToRgba(completeOverlayColor, 1) : 'green');
            setShowDoneIcon && setShowDoneIcon(true);
        }
        else {
            setCurrentOverlayColor(overlayColor ? hexToRgba(overlayColor) : hexToRgba('#B8FFB5'));
            setShowDoneIcon && setShowDoneIcon(false);
        }
    }, [
        swipeDistance,
        halfWidth,
        completeOverlayColor,
        overlayColor,
        gesturesEnabled,
        isCompleted,
        setIsComplete,
        setShowDoneIcon,
    ]);
    useEffect(() => {
        if (containerRef && containerRef.current) {
            setHalfWidth(Math.ceil(containerRef.current.offsetWidth / 10) * 4);
        }
    }, [containerRef]);
    useEffect(() => {
        const div = containerRef.current;
        if (div && gesturesEnabled) {
            const touchMoveListener = (event) => {
                event.preventDefault();
            };
            div.addEventListener('touchmove', touchMoveListener, { passive: false });
            return () => {
                div.removeEventListener('touchmove', touchMoveListener);
            };
        }
    }, [containerRef, gesturesEnabled]);
    return (jsxs("div", Object.assign({ ref: containerRef, className: `ds-makersun-dozen-swipeable-wrapper-container ${className} ${startX ? 'swiping' : ''}`, "data-testid": `ds-makersun-dozen-swipeable-wrapper`, "aria-label": ariaLabel, tabIndex: 0, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, style: {
            backgroundColor: getBackgroundColor(isHover, onHoverColor),
        } }, props, { children: [jsx("div", { className: "overlay", style: {
                    backgroundColor: currentOverlayColor,
                    width: ` ${((_b = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth)
                        ? getDeltaPercentage(containerRef.current.offsetWidth, swipeDistance)
                        : '0'}%`,
                } }), children] })));
};

const Task = ({ className = '', ariaLabel, label, rightIcon, rightIconComplete, overlayColor, completeOverlayColor, onHoverColor, isCompleted, gesturesEnabled, onSwipeComplete, handleIsComplete, onClick, }) => {
    const [isCompletedLocal, setIsCompletedLocal] = useState(isCompleted !== null && isCompleted !== void 0 ? isCompleted : false);
    const [showDoneIcon, setShowDoneIcon] = useState(isCompleted !== null && isCompleted !== void 0 ? isCompleted : false);
    const handleOnSwipeComplete = () => {
        if (gesturesEnabled) {
            onSwipeComplete && onSwipeComplete();
            console.log('on swipe complete babyy');
            setIsCompletedLocal(true);
        }
    };
    const handleSetIsComplete = (isCompleted) => {
        if (gesturesEnabled) {
            handleIsComplete && handleIsComplete();
            setIsCompletedLocal(isCompleted);
        }
    };
    const handleOnClickRightSide = (event) => {
        if (onClick && gesturesEnabled) {
            return onClick(event);
        }
        else {
            return () => { };
        }
    };
    useEffect(() => {
        console.log({ isCompletedLocal, isCompleted, rightIconComplete });
    }, [isCompletedLocal, isCompleted, rightIconComplete]);
    return (jsxs(SwipeableWrapper, { className: `ds-makersun-dozen-task-container ${className}`, "data-testid": `ds-makersun-dozen-task`, "aria-label": ariaLabel, overlayColor: overlayColor !== null && overlayColor !== void 0 ? overlayColor : '#B8FFB5', completeOverlayColor: completeOverlayColor !== null && completeOverlayColor !== void 0 ? completeOverlayColor : 'green', onHoverColor: onHoverColor !== null && onHoverColor !== void 0 ? onHoverColor : '#2869261', onSwipeComplete: handleOnSwipeComplete, setIsComplete: handleSetIsComplete, setShowDoneIcon: setShowDoneIcon, isCompleted: isCompletedLocal, gesturesEnabled: gesturesEnabled && !isCompletedLocal, children: [jsx("div", { className: "left-side", children: label }), jsx("div", { onClick: handleOnClickRightSide, className: "right-side", children: (isCompletedLocal || showDoneIcon) && rightIconComplete
                    ? rightIconComplete
                    : rightIcon })] }));
};

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = React.createContext && React.createContext(DefaultContext);

var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function (node, i) {
    return React.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  // eslint-disable-next-line react/display-name
  return function (props) {
    return React.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function (conf) {
    var attr = props.attr,
      size = props.size,
      title = props.title,
      svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return React.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && React.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? React.createElement(IconContext.Consumer, null, function (conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function MdDone (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24"},"child":[{"tag":"path","attr":{"fill":"none","d":"M0 0h24v24H0z"}},{"tag":"path","attr":{"d":"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}}]})(props);
}function MdWork (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24"},"child":[{"tag":"path","attr":{"fill":"none","d":"M0 0h24v24H0z"}},{"tag":"path","attr":{"d":"M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"}}]})(props);
}

___$insertStyle(".ds-makersun-dozen-done-container {\n  display: flex;\n  border-radius: 100%;\n  background-color: #3BE146;\n  height: 24px;\n  width: 24px;\n  justify-content: center;\n  align-items: center;\n}");

const Done = ({ className = '', ariaLabel = '', size, color, fontSize, style = {}, }) => {
    return (jsx("div", { className: `ds-makersun-dozen-done-container ${className}`, "data-testid": `ds-makersun-dozen-done`, "aria-label": ariaLabel !== null && ariaLabel !== void 0 ? ariaLabel : 'Done Icon', style: style, children: jsx(MdDone, { width: size !== null && size !== void 0 ? size : 18, height: size !== null && size !== void 0 ? size : 18, color: color !== null && color !== void 0 ? color : 'white', fontSize: fontSize !== null && fontSize !== void 0 ? fontSize : '1rem' }) }));
};

___$insertStyle(".ds-makersun-dozen-task-container {\n  min-width: 300px;\n  background-color: white !important;\n  margin-bottom: 1rem;\n}");

const TaskHome = ({ label, onSwipeComplete, onDragStart, onDragOver, onDrop, onDragEnd, gesturesEnabled, isCompleted, }) => {
    return (jsx(Task, { className: "ds-makersun-dozen-task-home-container", label: label !== null && label !== void 0 ? label : '', rightIcon: jsx(MdWork, { width: 18, height: 18 }), rightIconComplete: jsx(Done, {}), overlayColor: "#B6EBBA", completeOverlayColor: "#3BE146", onHoverColor: "#E9E8E8", onSwipeComplete: onSwipeComplete, onDragStart: onDragStart, onDragOver: onDragOver, onDrop: onDrop, onDragEnd: onDragEnd, gesturesEnabled: gesturesEnabled, isCompleted: isCompleted }));
};

___$insertStyle(".ds-makersun-dozen-greeting-container {\n  display: flex;\n  color: #333;\n  font-size: 24px;\n  font-style: normal;\n  font-weight: 700;\n  line-height: normal;\n}");

const Greeting = ({ className = '', ariaLabel, label, width, height, }) => {
    return (jsx("div", { className: `ds-makersun-dozen-greeting-container ${className}`, "data-testid": `ds-makersun-dozen-greeting`, "aria-label": ariaLabel, tabIndex: 0, style: {
            width: width !== null && width !== void 0 ? width : '100%',
            height: height !== null && height !== void 0 ? height : '100%',
        }, children: label }));
};

___$insertStyle(".ds-makersun-dozen-tab-container {\n  display: flex;\n}");

const Tab = (_a) => {
    var { className = '', ariaLabel, children } = _a, props = __rest$1(_a, ["className", "ariaLabel", "children"]);
    return (jsx("div", Object.assign({ className: `ds-makersun-dozen-tab-container ${className}`, "data-testid": `ds-makersun-dozen-tab`, "aria-label": ariaLabel, tabIndex: 0 }, props, { children: children })));
};

___$insertStyle(".ds-makersun-dozen-tab-option-container {\n  color: #BCBCBC;\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 700;\n  line-height: normal;\n  margin-left: 12px;\n  cursor: pointer;\n}\n.ds-makersun-dozen-tab-option-container.active {\n  color: #333;\n  text-decoration-line: underline;\n}");

const TabOption = ({ className = '', ariaLabel, label, isActive, onClick, }) => {
    return (jsx("div", { className: `ds-makersun-dozen-tab-option-container ${className} ${isActive ? 'active' : ''}`, "data-testid": `ds-makersun-dozen-tab-option`, "aria-label": ariaLabel, tabIndex: 0, onClick: onClick, children: label }));
};

// Custom hook para manejar el estado del formulario con validación
const useGetPercentageWidth = ({ containerRef, percentage = 100, }) => {
    var _a;
    const [percentageWidth, setPercentageWidth] = useState((_a = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth);
    useEffect(() => {
        if (containerRef && containerRef.current && percentage !== 100) {
            setPercentageWidth(Math.ceil((percentage * containerRef.current.offsetWidth) / 100));
        }
    }, [containerRef, percentage]);
    return {
        percentageWidth,
    };
};

___$insertStyle(".ds-makersun-dozen-tabs-container {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  position: relative;\n}\n.ds-makersun-dozen-tabs-container .ds-makersun-dozen-tabs-header-container {\n  display: flex;\n}\n.ds-makersun-dozen-tabs-container .ds-makersun-dozen-tabs-content-container {\n  display: flex;\n  position: relative;\n  width: 100%;\n  transition: transform 0.3s ease-in-out;\n}\n.ds-makersun-dozen-tabs-container .ds-makersun-dozen-tabs-content-container > div {\n  flex: 0 0 100%;\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  padding-top: 2rem;\n}");

const Tabs = ({ className = '', ariaLabel, options, children, }) => {
    const [selectedTabOptionIndex, setSelectedTabOption] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);
    const tabsContainerRef = useRef(null);
    const { percentageWidth } = useGetPercentageWidth({
        containerRef: tabsContainerRef,
        percentage: 20,
    });
    const [isWaiting, setIsWaiting] = useState(false);
    const containerRef = useRef(null);
    const handlePrev = () => {
        setSelectedTabOption((prevIndex) => Math.max(prevIndex - 1, 0));
    };
    const handleNext = () => {
        const childrenArray = Children.toArray(children);
        setSelectedTabOption((prevIndex) => Math.min(prevIndex + 1, childrenArray.length - 1));
    };
    const handleSwipeLeft = handlePrev;
    const handleSwipeRight = handleNext;
    const handleSelectTabOption = (index) => {
        setSelectedTabOption(index);
    };
    const handleMouseDown = (event) => {
        setTouchStartX(event.clientX);
    };
    const handleMouseMove = (event) => {
        const touchEndX = event.clientX;
        const deltaX = touchEndX - (touchStartX !== null && touchStartX !== void 0 ? touchStartX : 0);
        if (percentageWidth && Math.abs(deltaX) > percentageWidth && !isWaiting) {
            if (deltaX > 0) {
                handleSwipeLeft();
            }
            else {
                handleSwipeRight();
            }
            setIsWaiting(true);
            setTimeout(() => {
                setIsWaiting(false);
            }, 300);
        }
    };
    const handleMouseUp = () => {
        setTouchStartX(0);
    };
    const handleTouchStart = (event) => {
        setTouchStartX(event.touches[0].clientX);
    };
    const handleTouchMove = (event) => {
        const touchEndX = event.touches[0].clientX;
        const deltaX = touchEndX - (touchStartX !== null && touchStartX !== void 0 ? touchStartX : 0);
        if (percentageWidth && Math.abs(deltaX) > percentageWidth && !isWaiting) {
            if (deltaX > 0) {
                handleSwipeLeft();
            }
            else {
                handleSwipeRight();
            }
            setIsWaiting(true);
            setTimeout(() => {
                setIsWaiting(false);
            }, 300);
        }
    };
    const handleTouchEnd = () => {
        setTouchStartX(0);
    };
    useEffect(() => {
        const div = tabsContainerRef.current;
        if (div) {
            const touchMoveListener = (event) => {
                event.preventDefault();
            };
            div.addEventListener('touchmove', touchMoveListener, {
                passive: false,
            });
            return () => {
                div.removeEventListener('touchmove', touchMoveListener);
            };
        }
    }, [tabsContainerRef]);
    return (jsxs("div", { className: `ds-makersun-dozen-tabs-container ${className}`, "data-testid": `ds-makersun-dozen-tabs`, "aria-label": ariaLabel, tabIndex: 0, ref: containerRef, children: [jsx("div", { className: "ds-makersun-dozen-tabs-header-container", children: options === null || options === void 0 ? void 0 : options.map((option, index) => (jsx(TabOption, { label: option, isActive: index === selectedTabOptionIndex, onClick: () => handleSelectTabOption(index) }, option))) }), jsx("div", { ref: tabsContainerRef, className: "ds-makersun-dozen-tabs-content-container", style: { transform: `translateX(-${selectedTabOptionIndex * 100}%)` }, children: Children.map(children, (child, index) => (jsx(Tab, { onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: child }, index))) })] }));
};

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = (function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
})();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }

  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);

  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other


  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}

function kindOf(val) {
  var typeOfVal = typeof val;

  if (process.env.NODE_ENV !== 'production') {
    typeOfVal = miniKindOf(val);
  }

  return typeOfVal;
}

/**
 * @deprecated
 *
 * **We recommend using the `configureStore` method
 * of the `@reduxjs/toolkit` package**, which replaces `createStore`.
 *
 * Redux Toolkit is our recommended approach for writing Redux logic today,
 * including store setup, reducers, data fetching, and more.
 *
 * **For more details, please read this Redux docs page:**
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * `configureStore` from Redux Toolkit is an improved version of `createStore` that
 * simplifies setup and helps avoid common bugs.
 *
 * You should not be using the `redux` core package by itself today, except for learning purposes.
 * The `createStore` method from the core `redux` package will not be removed, but we encourage
 * all users to migrate to using Redux Toolkit for all Redux code.
 *
 * If you want to use `createStore` without this visual deprecation warning, use
 * the `legacy_createStore` import instead:
 *
 * `import { legacy_createStore as createStore} from 'redux'`
 *
 */

function createStore$1(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(0) : 'It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(1) : "Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
    }

    return enhancer(createStore$1)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(2) : "Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(3) : 'You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(4) : "Expected the listener to be a function. Instead, received: '" + kindOf(listener) + "'");
    }

    if (isDispatching) {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(5) : 'You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(6) : 'You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(7) : "Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    }

    if (typeof action.type === 'undefined') {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }

    if (isDispatching) {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(9) : 'Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(10) : "Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(11) : "Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(16) : "bindActionCreators expected an object or a function, but instead received: '" + kindOf(actionCreators) + "'. " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error(process.env.NODE_ENV === "production" ? formatProdErrorMessage(15) : 'Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2(_objectSpread2({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}

function areInputsEqual$1(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (var i = 0; i < newInputs.length; i++) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }

  return true;
}

function useMemoOne(getResult, inputs) {
  var initial = useState(function () {
    return {
      inputs: inputs,
      result: getResult()
    };
  })[0];
  var isFirstRun = useRef(true);
  var committed = useRef(initial);
  var useCache = isFirstRun.current || Boolean(inputs && committed.current.inputs && areInputsEqual$1(inputs, committed.current.inputs));
  var cache = useCache ? committed.current : {
    inputs: inputs,
    result: getResult()
  };
  useEffect(function () {
    isFirstRun.current = false;
    committed.current = cache;
  }, [cache]);
  return cache.result;
}
function useCallbackOne(callback, inputs) {
  return useMemoOne(function () {
    return callback;
  }, inputs);
}
var useMemo = useMemoOne;
var useCallback = useCallbackOne;

var isProduction$2 = process.env.NODE_ENV === 'production';
var prefix$2 = 'Invariant failed';
function invariant$1(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction$2) {
        throw new Error(prefix$2);
    }
    var provided = typeof message === 'function' ? message() : message;
    var value = provided ? "".concat(prefix$2, ": ").concat(provided) : prefix$2;
    throw new Error(value);
}

var getRect = function getRect(_ref) {
  var top = _ref.top,
      right = _ref.right,
      bottom = _ref.bottom,
      left = _ref.left;
  var width = right - left;
  var height = bottom - top;
  var rect = {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: width,
    height: height,
    x: left,
    y: top,
    center: {
      x: (right + left) / 2,
      y: (bottom + top) / 2
    }
  };
  return rect;
};
var expand = function expand(target, expandBy) {
  return {
    top: target.top - expandBy.top,
    left: target.left - expandBy.left,
    bottom: target.bottom + expandBy.bottom,
    right: target.right + expandBy.right
  };
};
var shrink = function shrink(target, shrinkBy) {
  return {
    top: target.top + shrinkBy.top,
    left: target.left + shrinkBy.left,
    bottom: target.bottom - shrinkBy.bottom,
    right: target.right - shrinkBy.right
  };
};

var shift = function shift(target, shiftBy) {
  return {
    top: target.top + shiftBy.y,
    left: target.left + shiftBy.x,
    bottom: target.bottom + shiftBy.y,
    right: target.right + shiftBy.x
  };
};

var noSpacing$1 = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var createBox = function createBox(_ref2) {
  var borderBox = _ref2.borderBox,
      _ref2$margin = _ref2.margin,
      margin = _ref2$margin === void 0 ? noSpacing$1 : _ref2$margin,
      _ref2$border = _ref2.border,
      border = _ref2$border === void 0 ? noSpacing$1 : _ref2$border,
      _ref2$padding = _ref2.padding,
      padding = _ref2$padding === void 0 ? noSpacing$1 : _ref2$padding;
  var marginBox = getRect(expand(borderBox, margin));
  var paddingBox = getRect(shrink(borderBox, border));
  var contentBox = getRect(shrink(paddingBox, padding));
  return {
    marginBox: marginBox,
    borderBox: getRect(borderBox),
    paddingBox: paddingBox,
    contentBox: contentBox,
    margin: margin,
    border: border,
    padding: padding
  };
};

var parse = function parse(raw) {
  var value = raw.slice(0, -2);
  var suffix = raw.slice(-2);

  if (suffix !== 'px') {
    return 0;
  }

  var result = Number(value);
  !!isNaN(result) ? process.env.NODE_ENV !== "production" ? invariant$1(false, "Could not parse value [raw: " + raw + ", without suffix: " + value + "]") : invariant$1(false) : void 0;
  return result;
};

var getWindowScroll$1 = function getWindowScroll() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
};

var offset = function offset(original, change) {
  var borderBox = original.borderBox,
      border = original.border,
      margin = original.margin,
      padding = original.padding;
  var shifted = shift(borderBox, change);
  return createBox({
    borderBox: shifted,
    border: border,
    margin: margin,
    padding: padding
  });
};
var withScroll = function withScroll(original, scroll) {
  if (scroll === void 0) {
    scroll = getWindowScroll$1();
  }

  return offset(original, scroll);
};
var calculateBox = function calculateBox(borderBox, styles) {
  var margin = {
    top: parse(styles.marginTop),
    right: parse(styles.marginRight),
    bottom: parse(styles.marginBottom),
    left: parse(styles.marginLeft)
  };
  var padding = {
    top: parse(styles.paddingTop),
    right: parse(styles.paddingRight),
    bottom: parse(styles.paddingBottom),
    left: parse(styles.paddingLeft)
  };
  var border = {
    top: parse(styles.borderTopWidth),
    right: parse(styles.borderRightWidth),
    bottom: parse(styles.borderBottomWidth),
    left: parse(styles.borderLeftWidth)
  };
  return createBox({
    borderBox: borderBox,
    margin: margin,
    padding: padding,
    border: border
  });
};
var getBox = function getBox(el) {
  var borderBox = el.getBoundingClientRect();
  var styles = window.getComputedStyle(el);
  return calculateBox(borderBox, styles);
};

var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual$2(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual$2(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }
        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    }
    return memoized;
}

var rafSchd = function rafSchd(fn) {
  var lastArgs = [];
  var frameId = null;

  var wrapperFn = function wrapperFn() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;

    if (frameId) {
      return;
    }

    frameId = requestAnimationFrame(function () {
      frameId = null;
      fn.apply(void 0, lastArgs);
    });
  };

  wrapperFn.cancel = function () {
    if (!frameId) {
      return;
    }

    cancelAnimationFrame(frameId);
    frameId = null;
  };

  return wrapperFn;
};

var rafSchd$1 = rafSchd;

var isProduction = process.env.NODE_ENV === 'production';
var spacesAndTabs = /[ \t]{2,}/g;
var lineStartWithSpaces = /^[ \t]*/gm;

var clean = function clean(value) {
  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
};

var getDevMessage = function getDevMessage(message) {
  return clean("\n  %creact-beautiful-dnd\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development only message. It will be removed in production builds.\n");
};

var getFormattedMessage = function getFormattedMessage(message) {
  return [getDevMessage(message), 'color: #00C584; font-size: 1.2em; font-weight: bold;', 'line-height: 1.5', 'color: #723874;'];
};
var isDisabledFlag = '__react-beautiful-dnd-disable-dev-warnings';
function log(type, message) {
  var _console;

  if (isProduction) {
    return;
  }

  if (typeof window !== 'undefined' && window[isDisabledFlag]) {
    return;
  }

  (_console = console)[type].apply(_console, getFormattedMessage(message));
}
var warning = log.bind(null, 'warn');
var error = log.bind(null, 'error');

function noop() {}

function getOptions(shared, fromBinding) {
  return _extends({}, shared, {}, fromBinding);
}

function bindEvents(el, bindings, sharedOptions) {
  var unbindings = bindings.map(function (binding) {
    var options = getOptions(sharedOptions, binding.options);
    el.addEventListener(binding.eventName, binding.fn, options);
    return function unbind() {
      el.removeEventListener(binding.eventName, binding.fn, options);
    };
  });
  return function unbindAll() {
    unbindings.forEach(function (unbind) {
      unbind();
    });
  };
}

var isProduction$1 = process.env.NODE_ENV === 'production';
var prefix = 'Invariant failed';
function RbdInvariant(message) {
  this.message = message;
}

RbdInvariant.prototype.toString = function toString() {
  return this.message;
};

function invariant(condition, message) {
  if (condition) {
    return;
  }

  if (isProduction$1) {
    throw new RbdInvariant(prefix);
  } else {
    throw new RbdInvariant(prefix + ": " + (message || ''));
  }
}

var ErrorBoundary = function (_React$Component) {
  _inheritsLoose(ErrorBoundary, _React$Component);

  function ErrorBoundary() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.callbacks = null;
    _this.unbind = noop;

    _this.onWindowError = function (event) {
      var callbacks = _this.getCallbacks();

      if (callbacks.isDragging()) {
        callbacks.tryAbort();
        process.env.NODE_ENV !== "production" ? warning("\n        An error was caught by our window 'error' event listener while a drag was occurring.\n        The active drag has been aborted.\n      ") : void 0;
      }

      var err = event.error;

      if (err instanceof RbdInvariant) {
        event.preventDefault();

        if (process.env.NODE_ENV !== 'production') {
          error(err.message);
        }
      }
    };

    _this.getCallbacks = function () {
      if (!_this.callbacks) {
        throw new Error('Unable to find AppCallbacks in <ErrorBoundary/>');
      }

      return _this.callbacks;
    };

    _this.setCallbacks = function (callbacks) {
      _this.callbacks = callbacks;
    };

    return _this;
  }

  var _proto = ErrorBoundary.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unbind = bindEvents(window, [{
      eventName: 'error',
      fn: this.onWindowError
    }]);
  };

  _proto.componentDidCatch = function componentDidCatch(err) {
    if (err instanceof RbdInvariant) {
      if (process.env.NODE_ENV !== 'production') {
        error(err.message);
      }

      this.setState({});
      return;
    }

    throw err;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unbind();
  };

  _proto.render = function render() {
    return this.props.children(this.setCallbacks);
  };

  return ErrorBoundary;
}(React.Component);

var dragHandleUsageInstructions = "\n  Press space bar to start a drag.\n  When dragging you can use the arrow keys to move the item around and escape to cancel.\n  Some screen readers may require you to be in focus mode or to use your pass through key\n";

var position = function position(index) {
  return index + 1;
};

var onDragStart = function onDragStart(start) {
  return "\n  You have lifted an item in position " + position(start.source.index) + "\n";
};

var withLocation = function withLocation(source, destination) {
  var isInHomeList = source.droppableId === destination.droppableId;
  var startPosition = position(source.index);
  var endPosition = position(destination.index);

  if (isInHomeList) {
    return "\n      You have moved the item from position " + startPosition + "\n      to position " + endPosition + "\n    ";
  }

  return "\n    You have moved the item from position " + startPosition + "\n    in list " + source.droppableId + "\n    to list " + destination.droppableId + "\n    in position " + endPosition + "\n  ";
};

var withCombine = function withCombine(id, source, combine) {
  var inHomeList = source.droppableId === combine.droppableId;

  if (inHomeList) {
    return "\n      The item " + id + "\n      has been combined with " + combine.draggableId;
  }

  return "\n      The item " + id + "\n      in list " + source.droppableId + "\n      has been combined with " + combine.draggableId + "\n      in list " + combine.droppableId + "\n    ";
};

var onDragUpdate = function onDragUpdate(update) {
  var location = update.destination;

  if (location) {
    return withLocation(update.source, location);
  }

  var combine = update.combine;

  if (combine) {
    return withCombine(update.draggableId, update.source, combine);
  }

  return 'You are over an area that cannot be dropped on';
};

var returnedToStart = function returnedToStart(source) {
  return "\n  The item has returned to its starting position\n  of " + position(source.index) + "\n";
};

var onDragEnd = function onDragEnd(result) {
  if (result.reason === 'CANCEL') {
    return "\n      Movement cancelled.\n      " + returnedToStart(result.source) + "\n    ";
  }

  var location = result.destination;
  var combine = result.combine;

  if (location) {
    return "\n      You have dropped the item.\n      " + withLocation(result.source, location) + "\n    ";
  }

  if (combine) {
    return "\n      You have dropped the item.\n      " + withCombine(result.draggableId, result.source, combine) + "\n    ";
  }

  return "\n    The item has been dropped while not over a drop area.\n    " + returnedToStart(result.source) + "\n  ";
};

var preset = {
  dragHandleUsageInstructions: dragHandleUsageInstructions,
  onDragStart: onDragStart,
  onDragUpdate: onDragUpdate,
  onDragEnd: onDragEnd
};

var origin = {
  x: 0,
  y: 0
};
var add = function add(point1, point2) {
  return {
    x: point1.x + point2.x,
    y: point1.y + point2.y
  };
};
var subtract = function subtract(point1, point2) {
  return {
    x: point1.x - point2.x,
    y: point1.y - point2.y
  };
};
var isEqual = function isEqual(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};
var negate = function negate(point) {
  return {
    x: point.x !== 0 ? -point.x : 0,
    y: point.y !== 0 ? -point.y : 0
  };
};
var patch = function patch(line, value, otherValue) {
  var _ref;

  if (otherValue === void 0) {
    otherValue = 0;
  }

  return _ref = {}, _ref[line] = value, _ref[line === 'x' ? 'y' : 'x'] = otherValue, _ref;
};
var distance = function distance(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
};
var closest = function closest(target, points) {
  return Math.min.apply(Math, points.map(function (point) {
    return distance(target, point);
  }));
};
var apply = function apply(fn) {
  return function (point) {
    return {
      x: fn(point.x),
      y: fn(point.y)
    };
  };
};

var executeClip = (function (frame, subject) {
  var result = getRect({
    top: Math.max(subject.top, frame.top),
    right: Math.min(subject.right, frame.right),
    bottom: Math.min(subject.bottom, frame.bottom),
    left: Math.max(subject.left, frame.left)
  });

  if (result.width <= 0 || result.height <= 0) {
    return null;
  }

  return result;
});

var offsetByPosition = function offsetByPosition(spacing, point) {
  return {
    top: spacing.top + point.y,
    left: spacing.left + point.x,
    bottom: spacing.bottom + point.y,
    right: spacing.right + point.x
  };
};
var getCorners = function getCorners(spacing) {
  return [{
    x: spacing.left,
    y: spacing.top
  }, {
    x: spacing.right,
    y: spacing.top
  }, {
    x: spacing.left,
    y: spacing.bottom
  }, {
    x: spacing.right,
    y: spacing.bottom
  }];
};
var noSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

var scroll = function scroll(target, frame) {
  if (!frame) {
    return target;
  }

  return offsetByPosition(target, frame.scroll.diff.displacement);
};

var increase = function increase(target, axis, withPlaceholder) {
  if (withPlaceholder && withPlaceholder.increasedBy) {
    var _extends2;

    return _extends({}, target, (_extends2 = {}, _extends2[axis.end] = target[axis.end] + withPlaceholder.increasedBy[axis.line], _extends2));
  }

  return target;
};

var clip = function clip(target, frame) {
  if (frame && frame.shouldClipSubject) {
    return executeClip(frame.pageMarginBox, target);
  }

  return getRect(target);
};

var getSubject = (function (_ref) {
  var page = _ref.page,
      withPlaceholder = _ref.withPlaceholder,
      axis = _ref.axis,
      frame = _ref.frame;
  var scrolled = scroll(page.marginBox, frame);
  var increased = increase(scrolled, axis, withPlaceholder);
  var clipped = clip(increased, frame);
  return {
    page: page,
    withPlaceholder: withPlaceholder,
    active: clipped
  };
});

var scrollDroppable = (function (droppable, newScroll) {
  !droppable.frame ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
  var scrollable = droppable.frame;
  var scrollDiff = subtract(newScroll, scrollable.scroll.initial);
  var scrollDisplacement = negate(scrollDiff);

  var frame = _extends({}, scrollable, {
    scroll: {
      initial: scrollable.scroll.initial,
      current: newScroll,
      diff: {
        value: scrollDiff,
        displacement: scrollDisplacement
      },
      max: scrollable.scroll.max
    }
  });

  var subject = getSubject({
    page: droppable.subject.page,
    withPlaceholder: droppable.subject.withPlaceholder,
    axis: droppable.axis,
    frame: frame
  });

  var result = _extends({}, droppable, {
    frame: frame,
    subject: subject
  });

  return result;
});

function isInteger(value) {
  if (Number.isInteger) {
    return Number.isInteger(value);
  }

  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
function values(map) {
  if (Object.values) {
    return Object.values(map);
  }

  return Object.keys(map).map(function (key) {
    return map[key];
  });
}
function findIndex(list, predicate) {
  if (list.findIndex) {
    return list.findIndex(predicate);
  }

  for (var i = 0; i < list.length; i++) {
    if (predicate(list[i])) {
      return i;
    }
  }

  return -1;
}
function find(list, predicate) {
  if (list.find) {
    return list.find(predicate);
  }

  var index = findIndex(list, predicate);

  if (index !== -1) {
    return list[index];
  }

  return undefined;
}
function toArray(list) {
  return Array.prototype.slice.call(list);
}

var toDroppableMap = memoizeOne(function (droppables) {
  return droppables.reduce(function (previous, current) {
    previous[current.descriptor.id] = current;
    return previous;
  }, {});
});
var toDraggableMap = memoizeOne(function (draggables) {
  return draggables.reduce(function (previous, current) {
    previous[current.descriptor.id] = current;
    return previous;
  }, {});
});
var toDroppableList = memoizeOne(function (droppables) {
  return values(droppables);
});
var toDraggableList = memoizeOne(function (draggables) {
  return values(draggables);
});

var getDraggablesInsideDroppable = memoizeOne(function (droppableId, draggables) {
  var result = toDraggableList(draggables).filter(function (draggable) {
    return droppableId === draggable.descriptor.droppableId;
  }).sort(function (a, b) {
    return a.descriptor.index - b.descriptor.index;
  });
  return result;
});

function tryGetDestination(impact) {
  if (impact.at && impact.at.type === 'REORDER') {
    return impact.at.destination;
  }

  return null;
}
function tryGetCombine(impact) {
  if (impact.at && impact.at.type === 'COMBINE') {
    return impact.at.combine;
  }

  return null;
}

var removeDraggableFromList = memoizeOne(function (remove, list) {
  return list.filter(function (item) {
    return item.descriptor.id !== remove.descriptor.id;
  });
});

var moveToNextCombine = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      draggable = _ref.draggable,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination,
      previousImpact = _ref.previousImpact;

  if (!destination.isCombineEnabled) {
    return null;
  }

  var location = tryGetDestination(previousImpact);

  if (!location) {
    return null;
  }

  function getImpact(target) {
    var at = {
      type: 'COMBINE',
      combine: {
        draggableId: target,
        droppableId: destination.descriptor.id
      }
    };
    return _extends({}, previousImpact, {
      at: at
    });
  }

  var all = previousImpact.displaced.all;
  var closestId = all.length ? all[0] : null;

  if (isMovingForward) {
    return closestId ? getImpact(closestId) : null;
  }

  var withoutDraggable = removeDraggableFromList(draggable, insideDestination);

  if (!closestId) {
    if (!withoutDraggable.length) {
      return null;
    }

    var last = withoutDraggable[withoutDraggable.length - 1];
    return getImpact(last.descriptor.id);
  }

  var indexOfClosest = findIndex(withoutDraggable, function (d) {
    return d.descriptor.id === closestId;
  });
  !(indexOfClosest !== -1) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Could not find displaced item in set') : invariant(false) : void 0;
  var proposedIndex = indexOfClosest - 1;

  if (proposedIndex < 0) {
    return null;
  }

  var before = withoutDraggable[proposedIndex];
  return getImpact(before.descriptor.id);
});

var isHomeOf = (function (draggable, destination) {
  return draggable.descriptor.droppableId === destination.descriptor.id;
});

var noDisplacedBy = {
  point: origin,
  value: 0
};
var emptyGroups = {
  invisible: {},
  visible: {},
  all: []
};
var noImpact = {
  displaced: emptyGroups,
  displacedBy: noDisplacedBy,
  at: null
};

var isWithin = (function (lowerBound, upperBound) {
  return function (value) {
    return lowerBound <= value && value <= upperBound;
  };
});

var isPartiallyVisibleThroughFrame = (function (frame) {
  var isWithinVertical = isWithin(frame.top, frame.bottom);
  var isWithinHorizontal = isWithin(frame.left, frame.right);
  return function (subject) {
    var isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);

    if (isContained) {
      return true;
    }

    var isPartiallyVisibleVertically = isWithinVertical(subject.top) || isWithinVertical(subject.bottom);
    var isPartiallyVisibleHorizontally = isWithinHorizontal(subject.left) || isWithinHorizontal(subject.right);
    var isPartiallyContained = isPartiallyVisibleVertically && isPartiallyVisibleHorizontally;

    if (isPartiallyContained) {
      return true;
    }

    var isBiggerVertically = subject.top < frame.top && subject.bottom > frame.bottom;
    var isBiggerHorizontally = subject.left < frame.left && subject.right > frame.right;
    var isTargetBiggerThanFrame = isBiggerVertically && isBiggerHorizontally;

    if (isTargetBiggerThanFrame) {
      return true;
    }

    var isTargetBiggerOnOneAxis = isBiggerVertically && isPartiallyVisibleHorizontally || isBiggerHorizontally && isPartiallyVisibleVertically;
    return isTargetBiggerOnOneAxis;
  };
});

var isTotallyVisibleThroughFrame = (function (frame) {
  var isWithinVertical = isWithin(frame.top, frame.bottom);
  var isWithinHorizontal = isWithin(frame.left, frame.right);
  return function (subject) {
    var isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
    return isContained;
  };
});

var vertical = {
  direction: 'vertical',
  line: 'y',
  crossAxisLine: 'x',
  start: 'top',
  end: 'bottom',
  size: 'height',
  crossAxisStart: 'left',
  crossAxisEnd: 'right',
  crossAxisSize: 'width'
};
var horizontal = {
  direction: 'horizontal',
  line: 'x',
  crossAxisLine: 'y',
  start: 'left',
  end: 'right',
  size: 'width',
  crossAxisStart: 'top',
  crossAxisEnd: 'bottom',
  crossAxisSize: 'height'
};

var isTotallyVisibleThroughFrameOnAxis = (function (axis) {
  return function (frame) {
    var isWithinVertical = isWithin(frame.top, frame.bottom);
    var isWithinHorizontal = isWithin(frame.left, frame.right);
    return function (subject) {
      if (axis === vertical) {
        return isWithinVertical(subject.top) && isWithinVertical(subject.bottom);
      }

      return isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
    };
  };
});

var getDroppableDisplaced = function getDroppableDisplaced(target, destination) {
  var displacement = destination.frame ? destination.frame.scroll.diff.displacement : origin;
  return offsetByPosition(target, displacement);
};

var isVisibleInDroppable = function isVisibleInDroppable(target, destination, isVisibleThroughFrameFn) {
  if (!destination.subject.active) {
    return false;
  }

  return isVisibleThroughFrameFn(destination.subject.active)(target);
};

var isVisibleInViewport = function isVisibleInViewport(target, viewport, isVisibleThroughFrameFn) {
  return isVisibleThroughFrameFn(viewport)(target);
};

var isVisible = function isVisible(_ref) {
  var toBeDisplaced = _ref.target,
      destination = _ref.destination,
      viewport = _ref.viewport,
      withDroppableDisplacement = _ref.withDroppableDisplacement,
      isVisibleThroughFrameFn = _ref.isVisibleThroughFrameFn;
  var displacedTarget = withDroppableDisplacement ? getDroppableDisplaced(toBeDisplaced, destination) : toBeDisplaced;
  return isVisibleInDroppable(displacedTarget, destination, isVisibleThroughFrameFn) && isVisibleInViewport(displacedTarget, viewport, isVisibleThroughFrameFn);
};

var isPartiallyVisible = function isPartiallyVisible(args) {
  return isVisible(_extends({}, args, {
    isVisibleThroughFrameFn: isPartiallyVisibleThroughFrame
  }));
};
var isTotallyVisible = function isTotallyVisible(args) {
  return isVisible(_extends({}, args, {
    isVisibleThroughFrameFn: isTotallyVisibleThroughFrame
  }));
};
var isTotallyVisibleOnAxis = function isTotallyVisibleOnAxis(args) {
  return isVisible(_extends({}, args, {
    isVisibleThroughFrameFn: isTotallyVisibleThroughFrameOnAxis(args.destination.axis)
  }));
};

var getShouldAnimate = function getShouldAnimate(id, last, forceShouldAnimate) {
  if (typeof forceShouldAnimate === 'boolean') {
    return forceShouldAnimate;
  }

  if (!last) {
    return true;
  }

  var invisible = last.invisible,
      visible = last.visible;

  if (invisible[id]) {
    return false;
  }

  var previous = visible[id];
  return previous ? previous.shouldAnimate : true;
};

function getTarget(draggable, displacedBy) {
  var marginBox = draggable.page.marginBox;
  var expandBy = {
    top: displacedBy.point.y,
    right: 0,
    bottom: 0,
    left: displacedBy.point.x
  };
  return getRect(expand(marginBox, expandBy));
}

function getDisplacementGroups(_ref) {
  var afterDragging = _ref.afterDragging,
      destination = _ref.destination,
      displacedBy = _ref.displacedBy,
      viewport = _ref.viewport,
      forceShouldAnimate = _ref.forceShouldAnimate,
      last = _ref.last;
  return afterDragging.reduce(function process(groups, draggable) {
    var target = getTarget(draggable, displacedBy);
    var id = draggable.descriptor.id;
    groups.all.push(id);
    var isVisible = isPartiallyVisible({
      target: target,
      destination: destination,
      viewport: viewport,
      withDroppableDisplacement: true
    });

    if (!isVisible) {
      groups.invisible[draggable.descriptor.id] = true;
      return groups;
    }

    var shouldAnimate = getShouldAnimate(id, last, forceShouldAnimate);
    var displacement = {
      draggableId: id,
      shouldAnimate: shouldAnimate
    };
    groups.visible[id] = displacement;
    return groups;
  }, {
    all: [],
    visible: {},
    invisible: {}
  });
}

function getIndexOfLastItem(draggables, options) {
  if (!draggables.length) {
    return 0;
  }

  var indexOfLastItem = draggables[draggables.length - 1].descriptor.index;
  return options.inHomeList ? indexOfLastItem : indexOfLastItem + 1;
}

function goAtEnd(_ref) {
  var insideDestination = _ref.insideDestination,
      inHomeList = _ref.inHomeList,
      displacedBy = _ref.displacedBy,
      destination = _ref.destination;
  var newIndex = getIndexOfLastItem(insideDestination, {
    inHomeList: inHomeList
  });
  return {
    displaced: emptyGroups,
    displacedBy: displacedBy,
    at: {
      type: 'REORDER',
      destination: {
        droppableId: destination.descriptor.id,
        index: newIndex
      }
    }
  };
}

function calculateReorderImpact(_ref2) {
  var draggable = _ref2.draggable,
      insideDestination = _ref2.insideDestination,
      destination = _ref2.destination,
      viewport = _ref2.viewport,
      displacedBy = _ref2.displacedBy,
      last = _ref2.last,
      index = _ref2.index,
      forceShouldAnimate = _ref2.forceShouldAnimate;
  var inHomeList = isHomeOf(draggable, destination);

  if (index == null) {
    return goAtEnd({
      insideDestination: insideDestination,
      inHomeList: inHomeList,
      displacedBy: displacedBy,
      destination: destination
    });
  }

  var match = find(insideDestination, function (item) {
    return item.descriptor.index === index;
  });

  if (!match) {
    return goAtEnd({
      insideDestination: insideDestination,
      inHomeList: inHomeList,
      displacedBy: displacedBy,
      destination: destination
    });
  }

  var withoutDragging = removeDraggableFromList(draggable, insideDestination);
  var sliceFrom = insideDestination.indexOf(match);
  var impacted = withoutDragging.slice(sliceFrom);
  var displaced = getDisplacementGroups({
    afterDragging: impacted,
    destination: destination,
    displacedBy: displacedBy,
    last: last,
    viewport: viewport.frame,
    forceShouldAnimate: forceShouldAnimate
  });
  return {
    displaced: displaced,
    displacedBy: displacedBy,
    at: {
      type: 'REORDER',
      destination: {
        droppableId: destination.descriptor.id,
        index: index
      }
    }
  };
}

function didStartAfterCritical(draggableId, afterCritical) {
  return Boolean(afterCritical.effected[draggableId]);
}

var fromCombine = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      destination = _ref.destination,
      draggables = _ref.draggables,
      combine = _ref.combine,
      afterCritical = _ref.afterCritical;

  if (!destination.isCombineEnabled) {
    return null;
  }

  var combineId = combine.draggableId;
  var combineWith = draggables[combineId];
  var combineWithIndex = combineWith.descriptor.index;
  var didCombineWithStartAfterCritical = didStartAfterCritical(combineId, afterCritical);

  if (didCombineWithStartAfterCritical) {
    if (isMovingForward) {
      return combineWithIndex;
    }

    return combineWithIndex - 1;
  }

  if (isMovingForward) {
    return combineWithIndex + 1;
  }

  return combineWithIndex;
});

var fromReorder = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      isInHomeList = _ref.isInHomeList,
      insideDestination = _ref.insideDestination,
      location = _ref.location;

  if (!insideDestination.length) {
    return null;
  }

  var currentIndex = location.index;
  var proposedIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;
  var firstIndex = insideDestination[0].descriptor.index;
  var lastIndex = insideDestination[insideDestination.length - 1].descriptor.index;
  var upperBound = isInHomeList ? lastIndex : lastIndex + 1;

  if (proposedIndex < firstIndex) {
    return null;
  }

  if (proposedIndex > upperBound) {
    return null;
  }

  return proposedIndex;
});

var moveToNextIndex = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      isInHomeList = _ref.isInHomeList,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;
  var wasAt = previousImpact.at;
  !wasAt ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot move in direction without previous impact location') : invariant(false) : void 0;

  if (wasAt.type === 'REORDER') {
    var _newIndex = fromReorder({
      isMovingForward: isMovingForward,
      isInHomeList: isInHomeList,
      location: wasAt.destination,
      insideDestination: insideDestination
    });

    if (_newIndex == null) {
      return null;
    }

    return calculateReorderImpact({
      draggable: draggable,
      insideDestination: insideDestination,
      destination: destination,
      viewport: viewport,
      last: previousImpact.displaced,
      displacedBy: previousImpact.displacedBy,
      index: _newIndex
    });
  }

  var newIndex = fromCombine({
    isMovingForward: isMovingForward,
    destination: destination,
    displaced: previousImpact.displaced,
    draggables: draggables,
    combine: wasAt.combine,
    afterCritical: afterCritical
  });

  if (newIndex == null) {
    return null;
  }

  return calculateReorderImpact({
    draggable: draggable,
    insideDestination: insideDestination,
    destination: destination,
    viewport: viewport,
    last: previousImpact.displaced,
    displacedBy: previousImpact.displacedBy,
    index: newIndex
  });
});

var getCombinedItemDisplacement = (function (_ref) {
  var displaced = _ref.displaced,
      afterCritical = _ref.afterCritical,
      combineWith = _ref.combineWith,
      displacedBy = _ref.displacedBy;
  var isDisplaced = Boolean(displaced.visible[combineWith] || displaced.invisible[combineWith]);

  if (didStartAfterCritical(combineWith, afterCritical)) {
    return isDisplaced ? origin : negate(displacedBy.point);
  }

  return isDisplaced ? displacedBy.point : origin;
});

var whenCombining = (function (_ref) {
  var afterCritical = _ref.afterCritical,
      impact = _ref.impact,
      draggables = _ref.draggables;
  var combine = tryGetCombine(impact);
  !combine ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
  var combineWith = combine.draggableId;
  var center = draggables[combineWith].page.borderBox.center;
  var displaceBy = getCombinedItemDisplacement({
    displaced: impact.displaced,
    afterCritical: afterCritical,
    combineWith: combineWith,
    displacedBy: impact.displacedBy
  });
  return add(center, displaceBy);
});

var distanceFromStartToBorderBoxCenter = function distanceFromStartToBorderBoxCenter(axis, box) {
  return box.margin[axis.start] + box.borderBox[axis.size] / 2;
};

var distanceFromEndToBorderBoxCenter = function distanceFromEndToBorderBoxCenter(axis, box) {
  return box.margin[axis.end] + box.borderBox[axis.size] / 2;
};

var getCrossAxisBorderBoxCenter = function getCrossAxisBorderBoxCenter(axis, target, isMoving) {
  return target[axis.crossAxisStart] + isMoving.margin[axis.crossAxisStart] + isMoving.borderBox[axis.crossAxisSize] / 2;
};

var goAfter = function goAfter(_ref) {
  var axis = _ref.axis,
      moveRelativeTo = _ref.moveRelativeTo,
      isMoving = _ref.isMoving;
  return patch(axis.line, moveRelativeTo.marginBox[axis.end] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
};
var goBefore = function goBefore(_ref2) {
  var axis = _ref2.axis,
      moveRelativeTo = _ref2.moveRelativeTo,
      isMoving = _ref2.isMoving;
  return patch(axis.line, moveRelativeTo.marginBox[axis.start] - distanceFromEndToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
};
var goIntoStart = function goIntoStart(_ref3) {
  var axis = _ref3.axis,
      moveInto = _ref3.moveInto,
      isMoving = _ref3.isMoving;
  return patch(axis.line, moveInto.contentBox[axis.start] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveInto.contentBox, isMoving));
};

var whenReordering = (function (_ref) {
  var impact = _ref.impact,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      droppable = _ref.droppable,
      afterCritical = _ref.afterCritical;
  var insideDestination = getDraggablesInsideDroppable(droppable.descriptor.id, draggables);
  var draggablePage = draggable.page;
  var axis = droppable.axis;

  if (!insideDestination.length) {
    return goIntoStart({
      axis: axis,
      moveInto: droppable.page,
      isMoving: draggablePage
    });
  }

  var displaced = impact.displaced,
      displacedBy = impact.displacedBy;
  var closestAfter = displaced.all[0];

  if (closestAfter) {
    var closest = draggables[closestAfter];

    if (didStartAfterCritical(closestAfter, afterCritical)) {
      return goBefore({
        axis: axis,
        moveRelativeTo: closest.page,
        isMoving: draggablePage
      });
    }

    var withDisplacement = offset(closest.page, displacedBy.point);
    return goBefore({
      axis: axis,
      moveRelativeTo: withDisplacement,
      isMoving: draggablePage
    });
  }

  var last = insideDestination[insideDestination.length - 1];

  if (last.descriptor.id === draggable.descriptor.id) {
    return draggablePage.borderBox.center;
  }

  if (didStartAfterCritical(last.descriptor.id, afterCritical)) {
    var page = offset(last.page, negate(afterCritical.displacedBy.point));
    return goAfter({
      axis: axis,
      moveRelativeTo: page,
      isMoving: draggablePage
    });
  }

  return goAfter({
    axis: axis,
    moveRelativeTo: last.page,
    isMoving: draggablePage
  });
});

var withDroppableDisplacement = (function (droppable, point) {
  var frame = droppable.frame;

  if (!frame) {
    return point;
  }

  return add(point, frame.scroll.diff.displacement);
});

var getResultWithoutDroppableDisplacement = function getResultWithoutDroppableDisplacement(_ref) {
  var impact = _ref.impact,
      draggable = _ref.draggable,
      droppable = _ref.droppable,
      draggables = _ref.draggables,
      afterCritical = _ref.afterCritical;
  var original = draggable.page.borderBox.center;
  var at = impact.at;

  if (!droppable) {
    return original;
  }

  if (!at) {
    return original;
  }

  if (at.type === 'REORDER') {
    return whenReordering({
      impact: impact,
      draggable: draggable,
      draggables: draggables,
      droppable: droppable,
      afterCritical: afterCritical
    });
  }

  return whenCombining({
    impact: impact,
    draggables: draggables,
    afterCritical: afterCritical
  });
};

var getPageBorderBoxCenterFromImpact = (function (args) {
  var withoutDisplacement = getResultWithoutDroppableDisplacement(args);
  var droppable = args.droppable;
  var withDisplacement = droppable ? withDroppableDisplacement(droppable, withoutDisplacement) : withoutDisplacement;
  return withDisplacement;
});

var scrollViewport = (function (viewport, newScroll) {
  var diff = subtract(newScroll, viewport.scroll.initial);
  var displacement = negate(diff);
  var frame = getRect({
    top: newScroll.y,
    bottom: newScroll.y + viewport.frame.height,
    left: newScroll.x,
    right: newScroll.x + viewport.frame.width
  });
  var updated = {
    frame: frame,
    scroll: {
      initial: viewport.scroll.initial,
      max: viewport.scroll.max,
      current: newScroll,
      diff: {
        value: diff,
        displacement: displacement
      }
    }
  };
  return updated;
});

function getDraggables(ids, draggables) {
  return ids.map(function (id) {
    return draggables[id];
  });
}

function tryGetVisible(id, groups) {
  for (var i = 0; i < groups.length; i++) {
    var displacement = groups[i].visible[id];

    if (displacement) {
      return displacement;
    }
  }

  return null;
}

var speculativelyIncrease = (function (_ref) {
  var impact = _ref.impact,
      viewport = _ref.viewport,
      destination = _ref.destination,
      draggables = _ref.draggables,
      maxScrollChange = _ref.maxScrollChange;
  var scrolledViewport = scrollViewport(viewport, add(viewport.scroll.current, maxScrollChange));
  var scrolledDroppable = destination.frame ? scrollDroppable(destination, add(destination.frame.scroll.current, maxScrollChange)) : destination;
  var last = impact.displaced;
  var withViewportScroll = getDisplacementGroups({
    afterDragging: getDraggables(last.all, draggables),
    destination: destination,
    displacedBy: impact.displacedBy,
    viewport: scrolledViewport.frame,
    last: last,
    forceShouldAnimate: false
  });
  var withDroppableScroll = getDisplacementGroups({
    afterDragging: getDraggables(last.all, draggables),
    destination: scrolledDroppable,
    displacedBy: impact.displacedBy,
    viewport: viewport.frame,
    last: last,
    forceShouldAnimate: false
  });
  var invisible = {};
  var visible = {};
  var groups = [last, withViewportScroll, withDroppableScroll];
  last.all.forEach(function (id) {
    var displacement = tryGetVisible(id, groups);

    if (displacement) {
      visible[id] = displacement;
      return;
    }

    invisible[id] = true;
  });

  var newImpact = _extends({}, impact, {
    displaced: {
      all: last.all,
      invisible: invisible,
      visible: visible
    }
  });

  return newImpact;
});

var withViewportDisplacement = (function (viewport, point) {
  return add(viewport.scroll.diff.displacement, point);
});

var getClientFromPageBorderBoxCenter = (function (_ref) {
  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
      draggable = _ref.draggable,
      viewport = _ref.viewport;
  var withoutPageScrollChange = withViewportDisplacement(viewport, pageBorderBoxCenter);
  var offset = subtract(withoutPageScrollChange, draggable.page.borderBox.center);
  return add(draggable.client.borderBox.center, offset);
});

var isTotallyVisibleInNewLocation = (function (_ref) {
  var draggable = _ref.draggable,
      destination = _ref.destination,
      newPageBorderBoxCenter = _ref.newPageBorderBoxCenter,
      viewport = _ref.viewport,
      withDroppableDisplacement = _ref.withDroppableDisplacement,
      _ref$onlyOnMainAxis = _ref.onlyOnMainAxis,
      onlyOnMainAxis = _ref$onlyOnMainAxis === void 0 ? false : _ref$onlyOnMainAxis;
  var changeNeeded = subtract(newPageBorderBoxCenter, draggable.page.borderBox.center);
  var shifted = offsetByPosition(draggable.page.borderBox, changeNeeded);
  var args = {
    target: shifted,
    destination: destination,
    withDroppableDisplacement: withDroppableDisplacement,
    viewport: viewport
  };
  return onlyOnMainAxis ? isTotallyVisibleOnAxis(args) : isTotallyVisible(args);
});

var moveToNextPlace = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      draggable = _ref.draggable,
      destination = _ref.destination,
      draggables = _ref.draggables,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
      previousClientSelection = _ref.previousClientSelection,
      afterCritical = _ref.afterCritical;

  if (!destination.isEnabled) {
    return null;
  }

  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  var isInHomeList = isHomeOf(draggable, destination);
  var impact = moveToNextCombine({
    isMovingForward: isMovingForward,
    draggable: draggable,
    destination: destination,
    insideDestination: insideDestination,
    previousImpact: previousImpact
  }) || moveToNextIndex({
    isMovingForward: isMovingForward,
    isInHomeList: isInHomeList,
    draggable: draggable,
    draggables: draggables,
    destination: destination,
    insideDestination: insideDestination,
    previousImpact: previousImpact,
    viewport: viewport,
    afterCritical: afterCritical
  });

  if (!impact) {
    return null;
  }

  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact: impact,
    draggable: draggable,
    droppable: destination,
    draggables: draggables,
    afterCritical: afterCritical
  });
  var isVisibleInNewLocation = isTotallyVisibleInNewLocation({
    draggable: draggable,
    destination: destination,
    newPageBorderBoxCenter: pageBorderBoxCenter,
    viewport: viewport.frame,
    withDroppableDisplacement: false,
    onlyOnMainAxis: true
  });

  if (isVisibleInNewLocation) {
    var clientSelection = getClientFromPageBorderBoxCenter({
      pageBorderBoxCenter: pageBorderBoxCenter,
      draggable: draggable,
      viewport: viewport
    });
    return {
      clientSelection: clientSelection,
      impact: impact,
      scrollJumpRequest: null
    };
  }

  var distance = subtract(pageBorderBoxCenter, previousPageBorderBoxCenter);
  var cautious = speculativelyIncrease({
    impact: impact,
    viewport: viewport,
    destination: destination,
    draggables: draggables,
    maxScrollChange: distance
  });
  return {
    clientSelection: previousClientSelection,
    impact: cautious,
    scrollJumpRequest: distance
  };
});

var getKnownActive = function getKnownActive(droppable) {
  var rect = droppable.subject.active;
  !rect ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot get clipped area from droppable') : invariant(false) : void 0;
  return rect;
};

var getBestCrossAxisDroppable = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      pageBorderBoxCenter = _ref.pageBorderBoxCenter,
      source = _ref.source,
      droppables = _ref.droppables,
      viewport = _ref.viewport;
  var active = source.subject.active;

  if (!active) {
    return null;
  }

  var axis = source.axis;
  var isBetweenSourceClipped = isWithin(active[axis.start], active[axis.end]);
  var candidates = toDroppableList(droppables).filter(function (droppable) {
    return droppable !== source;
  }).filter(function (droppable) {
    return droppable.isEnabled;
  }).filter(function (droppable) {
    return Boolean(droppable.subject.active);
  }).filter(function (droppable) {
    return isPartiallyVisibleThroughFrame(viewport.frame)(getKnownActive(droppable));
  }).filter(function (droppable) {
    var activeOfTarget = getKnownActive(droppable);

    if (isMovingForward) {
      return active[axis.crossAxisEnd] < activeOfTarget[axis.crossAxisEnd];
    }

    return activeOfTarget[axis.crossAxisStart] < active[axis.crossAxisStart];
  }).filter(function (droppable) {
    var activeOfTarget = getKnownActive(droppable);
    var isBetweenDestinationClipped = isWithin(activeOfTarget[axis.start], activeOfTarget[axis.end]);
    return isBetweenSourceClipped(activeOfTarget[axis.start]) || isBetweenSourceClipped(activeOfTarget[axis.end]) || isBetweenDestinationClipped(active[axis.start]) || isBetweenDestinationClipped(active[axis.end]);
  }).sort(function (a, b) {
    var first = getKnownActive(a)[axis.crossAxisStart];
    var second = getKnownActive(b)[axis.crossAxisStart];

    if (isMovingForward) {
      return first - second;
    }

    return second - first;
  }).filter(function (droppable, index, array) {
    return getKnownActive(droppable)[axis.crossAxisStart] === getKnownActive(array[0])[axis.crossAxisStart];
  });

  if (!candidates.length) {
    return null;
  }

  if (candidates.length === 1) {
    return candidates[0];
  }

  var contains = candidates.filter(function (droppable) {
    var isWithinDroppable = isWithin(getKnownActive(droppable)[axis.start], getKnownActive(droppable)[axis.end]);
    return isWithinDroppable(pageBorderBoxCenter[axis.line]);
  });

  if (contains.length === 1) {
    return contains[0];
  }

  if (contains.length > 1) {
    return contains.sort(function (a, b) {
      return getKnownActive(a)[axis.start] - getKnownActive(b)[axis.start];
    })[0];
  }

  return candidates.sort(function (a, b) {
    var first = closest(pageBorderBoxCenter, getCorners(getKnownActive(a)));
    var second = closest(pageBorderBoxCenter, getCorners(getKnownActive(b)));

    if (first !== second) {
      return first - second;
    }

    return getKnownActive(a)[axis.start] - getKnownActive(b)[axis.start];
  })[0];
});

var getCurrentPageBorderBoxCenter = function getCurrentPageBorderBoxCenter(draggable, afterCritical) {
  var original = draggable.page.borderBox.center;
  return didStartAfterCritical(draggable.descriptor.id, afterCritical) ? subtract(original, afterCritical.displacedBy.point) : original;
};
var getCurrentPageBorderBox = function getCurrentPageBorderBox(draggable, afterCritical) {
  var original = draggable.page.borderBox;
  return didStartAfterCritical(draggable.descriptor.id, afterCritical) ? offsetByPosition(original, negate(afterCritical.displacedBy.point)) : original;
};

var getClosestDraggable = (function (_ref) {
  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
      viewport = _ref.viewport,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination,
      afterCritical = _ref.afterCritical;
  var sorted = insideDestination.filter(function (draggable) {
    return isTotallyVisible({
      target: getCurrentPageBorderBox(draggable, afterCritical),
      destination: destination,
      viewport: viewport.frame,
      withDroppableDisplacement: true
    });
  }).sort(function (a, b) {
    var distanceToA = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(a, afterCritical)));
    var distanceToB = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(b, afterCritical)));

    if (distanceToA < distanceToB) {
      return -1;
    }

    if (distanceToB < distanceToA) {
      return 1;
    }

    return a.descriptor.index - b.descriptor.index;
  });
  return sorted[0] || null;
});

var getDisplacedBy = memoizeOne(function getDisplacedBy(axis, displaceBy) {
  var displacement = displaceBy[axis.line];
  return {
    value: displacement,
    point: patch(axis.line, displacement)
  };
});

var getRequiredGrowthForPlaceholder = function getRequiredGrowthForPlaceholder(droppable, placeholderSize, draggables) {
  var axis = droppable.axis;

  if (droppable.descriptor.mode === 'virtual') {
    return patch(axis.line, placeholderSize[axis.line]);
  }

  var availableSpace = droppable.subject.page.contentBox[axis.size];
  var insideDroppable = getDraggablesInsideDroppable(droppable.descriptor.id, draggables);
  var spaceUsed = insideDroppable.reduce(function (sum, dimension) {
    return sum + dimension.client.marginBox[axis.size];
  }, 0);
  var requiredSpace = spaceUsed + placeholderSize[axis.line];
  var needsToGrowBy = requiredSpace - availableSpace;

  if (needsToGrowBy <= 0) {
    return null;
  }

  return patch(axis.line, needsToGrowBy);
};

var withMaxScroll = function withMaxScroll(frame, max) {
  return _extends({}, frame, {
    scroll: _extends({}, frame.scroll, {
      max: max
    })
  });
};

var addPlaceholder = function addPlaceholder(droppable, draggable, draggables) {
  var frame = droppable.frame;
  !!isHomeOf(draggable, droppable) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Should not add placeholder space to home list') : invariant(false) : void 0;
  !!droppable.subject.withPlaceholder ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot add placeholder size to a subject when it already has one') : invariant(false) : void 0;
  var placeholderSize = getDisplacedBy(droppable.axis, draggable.displaceBy).point;
  var requiredGrowth = getRequiredGrowthForPlaceholder(droppable, placeholderSize, draggables);
  var added = {
    placeholderSize: placeholderSize,
    increasedBy: requiredGrowth,
    oldFrameMaxScroll: droppable.frame ? droppable.frame.scroll.max : null
  };

  if (!frame) {
    var _subject = getSubject({
      page: droppable.subject.page,
      withPlaceholder: added,
      axis: droppable.axis,
      frame: droppable.frame
    });

    return _extends({}, droppable, {
      subject: _subject
    });
  }

  var maxScroll = requiredGrowth ? add(frame.scroll.max, requiredGrowth) : frame.scroll.max;
  var newFrame = withMaxScroll(frame, maxScroll);
  var subject = getSubject({
    page: droppable.subject.page,
    withPlaceholder: added,
    axis: droppable.axis,
    frame: newFrame
  });
  return _extends({}, droppable, {
    subject: subject,
    frame: newFrame
  });
};
var removePlaceholder = function removePlaceholder(droppable) {
  var added = droppable.subject.withPlaceholder;
  !added ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot remove placeholder form subject when there was none') : invariant(false) : void 0;
  var frame = droppable.frame;

  if (!frame) {
    var _subject2 = getSubject({
      page: droppable.subject.page,
      axis: droppable.axis,
      frame: null,
      withPlaceholder: null
    });

    return _extends({}, droppable, {
      subject: _subject2
    });
  }

  var oldMaxScroll = added.oldFrameMaxScroll;
  !oldMaxScroll ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected droppable with frame to have old max frame scroll when removing placeholder') : invariant(false) : void 0;
  var newFrame = withMaxScroll(frame, oldMaxScroll);
  var subject = getSubject({
    page: droppable.subject.page,
    axis: droppable.axis,
    frame: newFrame,
    withPlaceholder: null
  });
  return _extends({}, droppable, {
    subject: subject,
    frame: newFrame
  });
};

var moveToNewDroppable = (function (_ref) {
  var previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
      moveRelativeTo = _ref.moveRelativeTo,
      insideDestination = _ref.insideDestination,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      destination = _ref.destination,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;

  if (!moveRelativeTo) {
    if (insideDestination.length) {
      return null;
    }

    var proposed = {
      displaced: emptyGroups,
      displacedBy: noDisplacedBy,
      at: {
        type: 'REORDER',
        destination: {
          droppableId: destination.descriptor.id,
          index: 0
        }
      }
    };
    var proposedPageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
      impact: proposed,
      draggable: draggable,
      droppable: destination,
      draggables: draggables,
      afterCritical: afterCritical
    });
    var withPlaceholder = isHomeOf(draggable, destination) ? destination : addPlaceholder(destination, draggable, draggables);
    var isVisibleInNewLocation = isTotallyVisibleInNewLocation({
      draggable: draggable,
      destination: withPlaceholder,
      newPageBorderBoxCenter: proposedPageBorderBoxCenter,
      viewport: viewport.frame,
      withDroppableDisplacement: false,
      onlyOnMainAxis: true
    });
    return isVisibleInNewLocation ? proposed : null;
  }

  var isGoingBeforeTarget = Boolean(previousPageBorderBoxCenter[destination.axis.line] <= moveRelativeTo.page.borderBox.center[destination.axis.line]);

  var proposedIndex = function () {
    var relativeTo = moveRelativeTo.descriptor.index;

    if (moveRelativeTo.descriptor.id === draggable.descriptor.id) {
      return relativeTo;
    }

    if (isGoingBeforeTarget) {
      return relativeTo;
    }

    return relativeTo + 1;
  }();

  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
  return calculateReorderImpact({
    draggable: draggable,
    insideDestination: insideDestination,
    destination: destination,
    viewport: viewport,
    displacedBy: displacedBy,
    last: emptyGroups,
    index: proposedIndex
  });
});

var moveCrossAxis = (function (_ref) {
  var isMovingForward = _ref.isMovingForward,
      previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
      draggable = _ref.draggable,
      isOver = _ref.isOver,
      draggables = _ref.draggables,
      droppables = _ref.droppables,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;
  var destination = getBestCrossAxisDroppable({
    isMovingForward: isMovingForward,
    pageBorderBoxCenter: previousPageBorderBoxCenter,
    source: isOver,
    droppables: droppables,
    viewport: viewport
  });

  if (!destination) {
    return null;
  }

  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  var moveRelativeTo = getClosestDraggable({
    pageBorderBoxCenter: previousPageBorderBoxCenter,
    viewport: viewport,
    destination: destination,
    insideDestination: insideDestination,
    afterCritical: afterCritical
  });
  var impact = moveToNewDroppable({
    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
    destination: destination,
    draggable: draggable,
    draggables: draggables,
    moveRelativeTo: moveRelativeTo,
    insideDestination: insideDestination,
    viewport: viewport,
    afterCritical: afterCritical
  });

  if (!impact) {
    return null;
  }

  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact: impact,
    draggable: draggable,
    droppable: destination,
    draggables: draggables,
    afterCritical: afterCritical
  });
  var clientSelection = getClientFromPageBorderBoxCenter({
    pageBorderBoxCenter: pageBorderBoxCenter,
    draggable: draggable,
    viewport: viewport
  });
  return {
    clientSelection: clientSelection,
    impact: impact,
    scrollJumpRequest: null
  };
});

var whatIsDraggedOver = (function (impact) {
  var at = impact.at;

  if (!at) {
    return null;
  }

  if (at.type === 'REORDER') {
    return at.destination.droppableId;
  }

  return at.combine.droppableId;
});

var getDroppableOver = function getDroppableOver(impact, droppables) {
  var id = whatIsDraggedOver(impact);
  return id ? droppables[id] : null;
};

var moveInDirection = (function (_ref) {
  var state = _ref.state,
      type = _ref.type;
  var isActuallyOver = getDroppableOver(state.impact, state.dimensions.droppables);
  var isMainAxisMovementAllowed = Boolean(isActuallyOver);
  var home = state.dimensions.droppables[state.critical.droppable.id];
  var isOver = isActuallyOver || home;
  var direction = isOver.axis.direction;
  var isMovingOnMainAxis = direction === 'vertical' && (type === 'MOVE_UP' || type === 'MOVE_DOWN') || direction === 'horizontal' && (type === 'MOVE_LEFT' || type === 'MOVE_RIGHT');

  if (isMovingOnMainAxis && !isMainAxisMovementAllowed) {
    return null;
  }

  var isMovingForward = type === 'MOVE_DOWN' || type === 'MOVE_RIGHT';
  var draggable = state.dimensions.draggables[state.critical.draggable.id];
  var previousPageBorderBoxCenter = state.current.page.borderBoxCenter;
  var _state$dimensions = state.dimensions,
      draggables = _state$dimensions.draggables,
      droppables = _state$dimensions.droppables;
  return isMovingOnMainAxis ? moveToNextPlace({
    isMovingForward: isMovingForward,
    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
    draggable: draggable,
    destination: isOver,
    draggables: draggables,
    viewport: state.viewport,
    previousClientSelection: state.current.client.selection,
    previousImpact: state.impact,
    afterCritical: state.afterCritical
  }) : moveCrossAxis({
    isMovingForward: isMovingForward,
    previousPageBorderBoxCenter: previousPageBorderBoxCenter,
    draggable: draggable,
    isOver: isOver,
    draggables: draggables,
    droppables: droppables,
    viewport: state.viewport,
    afterCritical: state.afterCritical
  });
});

function isMovementAllowed(state) {
  return state.phase === 'DRAGGING' || state.phase === 'COLLECTING';
}

function isPositionInFrame(frame) {
  var isWithinVertical = isWithin(frame.top, frame.bottom);
  var isWithinHorizontal = isWithin(frame.left, frame.right);
  return function run(point) {
    return isWithinVertical(point.y) && isWithinHorizontal(point.x);
  };
}

function getHasOverlap(first, second) {
  return first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top;
}

function getFurthestAway(_ref) {
  var pageBorderBox = _ref.pageBorderBox,
      draggable = _ref.draggable,
      candidates = _ref.candidates;
  var startCenter = draggable.page.borderBox.center;
  var sorted = candidates.map(function (candidate) {
    var axis = candidate.axis;
    var target = patch(candidate.axis.line, pageBorderBox.center[axis.line], candidate.page.borderBox.center[axis.crossAxisLine]);
    return {
      id: candidate.descriptor.id,
      distance: distance(startCenter, target)
    };
  }).sort(function (a, b) {
    return b.distance - a.distance;
  });
  return sorted[0] ? sorted[0].id : null;
}

function getDroppableOver$1(_ref2) {
  var pageBorderBox = _ref2.pageBorderBox,
      draggable = _ref2.draggable,
      droppables = _ref2.droppables;
  var candidates = toDroppableList(droppables).filter(function (item) {
    if (!item.isEnabled) {
      return false;
    }

    var active = item.subject.active;

    if (!active) {
      return false;
    }

    if (!getHasOverlap(pageBorderBox, active)) {
      return false;
    }

    if (isPositionInFrame(active)(pageBorderBox.center)) {
      return true;
    }

    var axis = item.axis;
    var childCenter = active.center[axis.crossAxisLine];
    var crossAxisStart = pageBorderBox[axis.crossAxisStart];
    var crossAxisEnd = pageBorderBox[axis.crossAxisEnd];
    var isContained = isWithin(active[axis.crossAxisStart], active[axis.crossAxisEnd]);
    var isStartContained = isContained(crossAxisStart);
    var isEndContained = isContained(crossAxisEnd);

    if (!isStartContained && !isEndContained) {
      return true;
    }

    if (isStartContained) {
      return crossAxisStart < childCenter;
    }

    return crossAxisEnd > childCenter;
  });

  if (!candidates.length) {
    return null;
  }

  if (candidates.length === 1) {
    return candidates[0].descriptor.id;
  }

  return getFurthestAway({
    pageBorderBox: pageBorderBox,
    draggable: draggable,
    candidates: candidates
  });
}

var offsetRectByPosition = function offsetRectByPosition(rect, point) {
  return getRect(offsetByPosition(rect, point));
};

var withDroppableScroll = (function (droppable, area) {
  var frame = droppable.frame;

  if (!frame) {
    return area;
  }

  return offsetRectByPosition(area, frame.scroll.diff.value);
});

function getIsDisplaced(_ref) {
  var displaced = _ref.displaced,
      id = _ref.id;
  return Boolean(displaced.visible[id] || displaced.invisible[id]);
}

function atIndex(_ref) {
  var draggable = _ref.draggable,
      closest = _ref.closest,
      inHomeList = _ref.inHomeList;

  if (!closest) {
    return null;
  }

  if (!inHomeList) {
    return closest.descriptor.index;
  }

  if (closest.descriptor.index > draggable.descriptor.index) {
    return closest.descriptor.index - 1;
  }

  return closest.descriptor.index;
}

var getReorderImpact = (function (_ref2) {
  var targetRect = _ref2.pageBorderBoxWithDroppableScroll,
      draggable = _ref2.draggable,
      destination = _ref2.destination,
      insideDestination = _ref2.insideDestination,
      last = _ref2.last,
      viewport = _ref2.viewport,
      afterCritical = _ref2.afterCritical;
  var axis = destination.axis;
  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
  var displacement = displacedBy.value;
  var targetStart = targetRect[axis.start];
  var targetEnd = targetRect[axis.end];
  var withoutDragging = removeDraggableFromList(draggable, insideDestination);
  var closest = find(withoutDragging, function (child) {
    var id = child.descriptor.id;
    var childCenter = child.page.borderBox.center[axis.line];
    var didStartAfterCritical$1 = didStartAfterCritical(id, afterCritical);
    var isDisplaced = getIsDisplaced({
      displaced: last,
      id: id
    });

    if (didStartAfterCritical$1) {
      if (isDisplaced) {
        return targetEnd <= childCenter;
      }

      return targetStart < childCenter - displacement;
    }

    if (isDisplaced) {
      return targetEnd <= childCenter + displacement;
    }

    return targetStart < childCenter;
  });
  var newIndex = atIndex({
    draggable: draggable,
    closest: closest,
    inHomeList: isHomeOf(draggable, destination)
  });
  return calculateReorderImpact({
    draggable: draggable,
    insideDestination: insideDestination,
    destination: destination,
    viewport: viewport,
    last: last,
    displacedBy: displacedBy,
    index: newIndex
  });
});

var combineThresholdDivisor = 4;
var getCombineImpact = (function (_ref) {
  var draggable = _ref.draggable,
      targetRect = _ref.pageBorderBoxWithDroppableScroll,
      previousImpact = _ref.previousImpact,
      destination = _ref.destination,
      insideDestination = _ref.insideDestination,
      afterCritical = _ref.afterCritical;

  if (!destination.isCombineEnabled) {
    return null;
  }

  var axis = destination.axis;
  var displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
  var displacement = displacedBy.value;
  var targetStart = targetRect[axis.start];
  var targetEnd = targetRect[axis.end];
  var withoutDragging = removeDraggableFromList(draggable, insideDestination);
  var combineWith = find(withoutDragging, function (child) {
    var id = child.descriptor.id;
    var childRect = child.page.borderBox;
    var childSize = childRect[axis.size];
    var threshold = childSize / combineThresholdDivisor;
    var didStartAfterCritical$1 = didStartAfterCritical(id, afterCritical);
    var isDisplaced = getIsDisplaced({
      displaced: previousImpact.displaced,
      id: id
    });

    if (didStartAfterCritical$1) {
      if (isDisplaced) {
        return targetEnd > childRect[axis.start] + threshold && targetEnd < childRect[axis.end] - threshold;
      }

      return targetStart > childRect[axis.start] - displacement + threshold && targetStart < childRect[axis.end] - displacement - threshold;
    }

    if (isDisplaced) {
      return targetEnd > childRect[axis.start] + displacement + threshold && targetEnd < childRect[axis.end] + displacement - threshold;
    }

    return targetStart > childRect[axis.start] + threshold && targetStart < childRect[axis.end] - threshold;
  });

  if (!combineWith) {
    return null;
  }

  var impact = {
    displacedBy: displacedBy,
    displaced: previousImpact.displaced,
    at: {
      type: 'COMBINE',
      combine: {
        draggableId: combineWith.descriptor.id,
        droppableId: destination.descriptor.id
      }
    }
  };
  return impact;
});

var getDragImpact = (function (_ref) {
  var pageOffset = _ref.pageOffset,
      draggable = _ref.draggable,
      draggables = _ref.draggables,
      droppables = _ref.droppables,
      previousImpact = _ref.previousImpact,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;
  var pageBorderBox = offsetRectByPosition(draggable.page.borderBox, pageOffset);
  var destinationId = getDroppableOver$1({
    pageBorderBox: pageBorderBox,
    draggable: draggable,
    droppables: droppables
  });

  if (!destinationId) {
    return noImpact;
  }

  var destination = droppables[destinationId];
  var insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  var pageBorderBoxWithDroppableScroll = withDroppableScroll(destination, pageBorderBox);
  return getCombineImpact({
    pageBorderBoxWithDroppableScroll: pageBorderBoxWithDroppableScroll,
    draggable: draggable,
    previousImpact: previousImpact,
    destination: destination,
    insideDestination: insideDestination,
    afterCritical: afterCritical
  }) || getReorderImpact({
    pageBorderBoxWithDroppableScroll: pageBorderBoxWithDroppableScroll,
    draggable: draggable,
    destination: destination,
    insideDestination: insideDestination,
    last: previousImpact.displaced,
    viewport: viewport,
    afterCritical: afterCritical
  });
});

var patchDroppableMap = (function (droppables, updated) {
  var _extends2;

  return _extends({}, droppables, (_extends2 = {}, _extends2[updated.descriptor.id] = updated, _extends2));
});

var clearUnusedPlaceholder = function clearUnusedPlaceholder(_ref) {
  var previousImpact = _ref.previousImpact,
      impact = _ref.impact,
      droppables = _ref.droppables;
  var last = whatIsDraggedOver(previousImpact);
  var now = whatIsDraggedOver(impact);

  if (!last) {
    return droppables;
  }

  if (last === now) {
    return droppables;
  }

  var lastDroppable = droppables[last];

  if (!lastDroppable.subject.withPlaceholder) {
    return droppables;
  }

  var updated = removePlaceholder(lastDroppable);
  return patchDroppableMap(droppables, updated);
};

var recomputePlaceholders = (function (_ref2) {
  var draggable = _ref2.draggable,
      draggables = _ref2.draggables,
      droppables = _ref2.droppables,
      previousImpact = _ref2.previousImpact,
      impact = _ref2.impact;
  var cleaned = clearUnusedPlaceholder({
    previousImpact: previousImpact,
    impact: impact,
    droppables: droppables
  });
  var isOver = whatIsDraggedOver(impact);

  if (!isOver) {
    return cleaned;
  }

  var droppable = droppables[isOver];

  if (isHomeOf(draggable, droppable)) {
    return cleaned;
  }

  if (droppable.subject.withPlaceholder) {
    return cleaned;
  }

  var patched = addPlaceholder(droppable, draggable, draggables);
  return patchDroppableMap(cleaned, patched);
});

var update = (function (_ref) {
  var state = _ref.state,
      forcedClientSelection = _ref.clientSelection,
      forcedDimensions = _ref.dimensions,
      forcedViewport = _ref.viewport,
      forcedImpact = _ref.impact,
      scrollJumpRequest = _ref.scrollJumpRequest;
  var viewport = forcedViewport || state.viewport;
  var dimensions = forcedDimensions || state.dimensions;
  var clientSelection = forcedClientSelection || state.current.client.selection;
  var offset = subtract(clientSelection, state.initial.client.selection);
  var client = {
    offset: offset,
    selection: clientSelection,
    borderBoxCenter: add(state.initial.client.borderBoxCenter, offset)
  };
  var page = {
    selection: add(client.selection, viewport.scroll.current),
    borderBoxCenter: add(client.borderBoxCenter, viewport.scroll.current),
    offset: add(client.offset, viewport.scroll.diff.value)
  };
  var current = {
    client: client,
    page: page
  };

  if (state.phase === 'COLLECTING') {
    return _extends({
      phase: 'COLLECTING'
    }, state, {
      dimensions: dimensions,
      viewport: viewport,
      current: current
    });
  }

  var draggable = dimensions.draggables[state.critical.draggable.id];
  var newImpact = forcedImpact || getDragImpact({
    pageOffset: page.offset,
    draggable: draggable,
    draggables: dimensions.draggables,
    droppables: dimensions.droppables,
    previousImpact: state.impact,
    viewport: viewport,
    afterCritical: state.afterCritical
  });
  var withUpdatedPlaceholders = recomputePlaceholders({
    draggable: draggable,
    impact: newImpact,
    previousImpact: state.impact,
    draggables: dimensions.draggables,
    droppables: dimensions.droppables
  });

  var result = _extends({}, state, {
    current: current,
    dimensions: {
      draggables: dimensions.draggables,
      droppables: withUpdatedPlaceholders
    },
    impact: newImpact,
    viewport: viewport,
    scrollJumpRequest: scrollJumpRequest || null,
    forceShouldAnimate: scrollJumpRequest ? false : null
  });

  return result;
});

function getDraggables$1(ids, draggables) {
  return ids.map(function (id) {
    return draggables[id];
  });
}

var recompute = (function (_ref) {
  var impact = _ref.impact,
      viewport = _ref.viewport,
      draggables = _ref.draggables,
      destination = _ref.destination,
      forceShouldAnimate = _ref.forceShouldAnimate;
  var last = impact.displaced;
  var afterDragging = getDraggables$1(last.all, draggables);
  var displaced = getDisplacementGroups({
    afterDragging: afterDragging,
    destination: destination,
    displacedBy: impact.displacedBy,
    viewport: viewport.frame,
    forceShouldAnimate: forceShouldAnimate,
    last: last
  });
  return _extends({}, impact, {
    displaced: displaced
  });
});

var getClientBorderBoxCenter = (function (_ref) {
  var impact = _ref.impact,
      draggable = _ref.draggable,
      droppable = _ref.droppable,
      draggables = _ref.draggables,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;
  var pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact: impact,
    draggable: draggable,
    draggables: draggables,
    droppable: droppable,
    afterCritical: afterCritical
  });
  return getClientFromPageBorderBoxCenter({
    pageBorderBoxCenter: pageBorderBoxCenter,
    draggable: draggable,
    viewport: viewport
  });
});

var refreshSnap = (function (_ref) {
  var state = _ref.state,
      forcedDimensions = _ref.dimensions,
      forcedViewport = _ref.viewport;
  !(state.movementMode === 'SNAP') ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
  var needsVisibilityCheck = state.impact;
  var viewport = forcedViewport || state.viewport;
  var dimensions = forcedDimensions || state.dimensions;
  var draggables = dimensions.draggables,
      droppables = dimensions.droppables;
  var draggable = draggables[state.critical.draggable.id];
  var isOver = whatIsDraggedOver(needsVisibilityCheck);
  !isOver ? process.env.NODE_ENV !== "production" ? invariant(false, 'Must be over a destination in SNAP movement mode') : invariant(false) : void 0;
  var destination = droppables[isOver];
  var impact = recompute({
    impact: needsVisibilityCheck,
    viewport: viewport,
    destination: destination,
    draggables: draggables
  });
  var clientSelection = getClientBorderBoxCenter({
    impact: impact,
    draggable: draggable,
    droppable: destination,
    draggables: draggables,
    viewport: viewport,
    afterCritical: state.afterCritical
  });
  return update({
    impact: impact,
    clientSelection: clientSelection,
    state: state,
    dimensions: dimensions,
    viewport: viewport
  });
});

var getHomeLocation = (function (descriptor) {
  return {
    index: descriptor.index,
    droppableId: descriptor.droppableId
  };
});

var getLiftEffect = (function (_ref) {
  var draggable = _ref.draggable,
      home = _ref.home,
      draggables = _ref.draggables,
      viewport = _ref.viewport;
  var displacedBy = getDisplacedBy(home.axis, draggable.displaceBy);
  var insideHome = getDraggablesInsideDroppable(home.descriptor.id, draggables);
  var rawIndex = insideHome.indexOf(draggable);
  !(rawIndex !== -1) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected draggable to be inside home list') : invariant(false) : void 0;
  var afterDragging = insideHome.slice(rawIndex + 1);
  var effected = afterDragging.reduce(function (previous, item) {
    previous[item.descriptor.id] = true;
    return previous;
  }, {});
  var afterCritical = {
    inVirtualList: home.descriptor.mode === 'virtual',
    displacedBy: displacedBy,
    effected: effected
  };
  var displaced = getDisplacementGroups({
    afterDragging: afterDragging,
    destination: home,
    displacedBy: displacedBy,
    last: null,
    viewport: viewport.frame,
    forceShouldAnimate: false
  });
  var impact = {
    displaced: displaced,
    displacedBy: displacedBy,
    at: {
      type: 'REORDER',
      destination: getHomeLocation(draggable.descriptor)
    }
  };
  return {
    impact: impact,
    afterCritical: afterCritical
  };
});

var patchDimensionMap = (function (dimensions, updated) {
  return {
    draggables: dimensions.draggables,
    droppables: patchDroppableMap(dimensions.droppables, updated)
  };
});

var start = function start(key) {
  if (process.env.NODE_ENV !== 'production') {
    {
      return;
    }
  }
};
var finish = function finish(key) {
  if (process.env.NODE_ENV !== 'production') {
    {
      return;
    }
  }
};

var offsetDraggable = (function (_ref) {
  var draggable = _ref.draggable,
      offset$1 = _ref.offset,
      initialWindowScroll = _ref.initialWindowScroll;
  var client = offset(draggable.client, offset$1);
  var page = withScroll(client, initialWindowScroll);

  var moved = _extends({}, draggable, {
    placeholder: _extends({}, draggable.placeholder, {
      client: client
    }),
    client: client,
    page: page
  });

  return moved;
});

var getFrame = (function (droppable) {
  var frame = droppable.frame;
  !frame ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected Droppable to have a frame') : invariant(false) : void 0;
  return frame;
});

var adjustAdditionsForScrollChanges = (function (_ref) {
  var additions = _ref.additions,
      updatedDroppables = _ref.updatedDroppables,
      viewport = _ref.viewport;
  var windowScrollChange = viewport.scroll.diff.value;
  return additions.map(function (draggable) {
    var droppableId = draggable.descriptor.droppableId;
    var modified = updatedDroppables[droppableId];
    var frame = getFrame(modified);
    var droppableScrollChange = frame.scroll.diff.value;
    var totalChange = add(windowScrollChange, droppableScrollChange);
    var moved = offsetDraggable({
      draggable: draggable,
      offset: totalChange,
      initialWindowScroll: viewport.scroll.initial
    });
    return moved;
  });
});

var publishWhileDraggingInVirtual = (function (_ref) {
  var state = _ref.state,
      published = _ref.published;
  start();
  var withScrollChange = published.modified.map(function (update) {
    var existing = state.dimensions.droppables[update.droppableId];
    var scrolled = scrollDroppable(existing, update.scroll);
    return scrolled;
  });

  var droppables = _extends({}, state.dimensions.droppables, {}, toDroppableMap(withScrollChange));

  var updatedAdditions = toDraggableMap(adjustAdditionsForScrollChanges({
    additions: published.additions,
    updatedDroppables: droppables,
    viewport: state.viewport
  }));

  var draggables = _extends({}, state.dimensions.draggables, {}, updatedAdditions);

  published.removals.forEach(function (id) {
    delete draggables[id];
  });
  var dimensions = {
    droppables: droppables,
    draggables: draggables
  };
  var wasOverId = whatIsDraggedOver(state.impact);
  var wasOver = wasOverId ? dimensions.droppables[wasOverId] : null;
  var draggable = dimensions.draggables[state.critical.draggable.id];
  var home = dimensions.droppables[state.critical.droppable.id];

  var _getLiftEffect = getLiftEffect({
    draggable: draggable,
    home: home,
    draggables: draggables,
    viewport: state.viewport
  }),
      onLiftImpact = _getLiftEffect.impact,
      afterCritical = _getLiftEffect.afterCritical;

  var previousImpact = wasOver && wasOver.isCombineEnabled ? state.impact : onLiftImpact;
  var impact = getDragImpact({
    pageOffset: state.current.page.offset,
    draggable: dimensions.draggables[state.critical.draggable.id],
    draggables: dimensions.draggables,
    droppables: dimensions.droppables,
    previousImpact: previousImpact,
    viewport: state.viewport,
    afterCritical: afterCritical
  });
  finish();

  var draggingState = _extends({
    phase: 'DRAGGING'
  }, state, {
    phase: 'DRAGGING',
    impact: impact,
    onLiftImpact: onLiftImpact,
    dimensions: dimensions,
    afterCritical: afterCritical,
    forceShouldAnimate: false
  });

  if (state.phase === 'COLLECTING') {
    return draggingState;
  }

  var dropPending = _extends({
    phase: 'DROP_PENDING'
  }, draggingState, {
    phase: 'DROP_PENDING',
    reason: state.reason,
    isWaiting: false
  });

  return dropPending;
});

var isSnapping = function isSnapping(state) {
  return state.movementMode === 'SNAP';
};

var postDroppableChange = function postDroppableChange(state, updated, isEnabledChanging) {
  var dimensions = patchDimensionMap(state.dimensions, updated);

  if (!isSnapping(state) || isEnabledChanging) {
    return update({
      state: state,
      dimensions: dimensions
    });
  }

  return refreshSnap({
    state: state,
    dimensions: dimensions
  });
};

function removeScrollJumpRequest(state) {
  if (state.isDragging && state.movementMode === 'SNAP') {
    return _extends({
      phase: 'DRAGGING'
    }, state, {
      scrollJumpRequest: null
    });
  }

  return state;
}

var idle = {
  phase: 'IDLE',
  completed: null,
  shouldFlush: false
};
var reducer = (function (state, action) {
  if (state === void 0) {
    state = idle;
  }

  if (action.type === 'FLUSH') {
    return _extends({}, idle, {
      shouldFlush: true
    });
  }

  if (action.type === 'INITIAL_PUBLISH') {
    !(state.phase === 'IDLE') ? process.env.NODE_ENV !== "production" ? invariant(false, 'INITIAL_PUBLISH must come after a IDLE phase') : invariant(false) : void 0;
    var _action$payload = action.payload,
        critical = _action$payload.critical,
        clientSelection = _action$payload.clientSelection,
        viewport = _action$payload.viewport,
        dimensions = _action$payload.dimensions,
        movementMode = _action$payload.movementMode;
    var draggable = dimensions.draggables[critical.draggable.id];
    var home = dimensions.droppables[critical.droppable.id];
    var client = {
      selection: clientSelection,
      borderBoxCenter: draggable.client.borderBox.center,
      offset: origin
    };
    var initial = {
      client: client,
      page: {
        selection: add(client.selection, viewport.scroll.initial),
        borderBoxCenter: add(client.selection, viewport.scroll.initial),
        offset: add(client.selection, viewport.scroll.diff.value)
      }
    };
    var isWindowScrollAllowed = toDroppableList(dimensions.droppables).every(function (item) {
      return !item.isFixedOnPage;
    });

    var _getLiftEffect = getLiftEffect({
      draggable: draggable,
      home: home,
      draggables: dimensions.draggables,
      viewport: viewport
    }),
        impact = _getLiftEffect.impact,
        afterCritical = _getLiftEffect.afterCritical;

    var result = {
      phase: 'DRAGGING',
      isDragging: true,
      critical: critical,
      movementMode: movementMode,
      dimensions: dimensions,
      initial: initial,
      current: initial,
      isWindowScrollAllowed: isWindowScrollAllowed,
      impact: impact,
      afterCritical: afterCritical,
      onLiftImpact: impact,
      viewport: viewport,
      scrollJumpRequest: null,
      forceShouldAnimate: null
    };
    return result;
  }

  if (action.type === 'COLLECTION_STARTING') {
    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
      return state;
    }

    !(state.phase === 'DRAGGING') ? process.env.NODE_ENV !== "production" ? invariant(false, "Collection cannot start from phase " + state.phase) : invariant(false) : void 0;

    var _result = _extends({
      phase: 'COLLECTING'
    }, state, {
      phase: 'COLLECTING'
    });

    return _result;
  }

  if (action.type === 'PUBLISH_WHILE_DRAGGING') {
    !(state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') ? process.env.NODE_ENV !== "production" ? invariant(false, "Unexpected " + action.type + " received in phase " + state.phase) : invariant(false) : void 0;
    return publishWhileDraggingInVirtual({
      state: state,
      published: action.payload
    });
  }

  if (action.type === 'MOVE') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }

    !isMovementAllowed(state) ? process.env.NODE_ENV !== "production" ? invariant(false, action.type + " not permitted in phase " + state.phase) : invariant(false) : void 0;
    var _clientSelection = action.payload.client;

    if (isEqual(_clientSelection, state.current.client.selection)) {
      return state;
    }

    return update({
      state: state,
      clientSelection: _clientSelection,
      impact: isSnapping(state) ? state.impact : null
    });
  }

  if (action.type === 'UPDATE_DROPPABLE_SCROLL') {
    if (state.phase === 'DROP_PENDING') {
      return removeScrollJumpRequest(state);
    }

    if (state.phase === 'COLLECTING') {
      return removeScrollJumpRequest(state);
    }

    !isMovementAllowed(state) ? process.env.NODE_ENV !== "production" ? invariant(false, action.type + " not permitted in phase " + state.phase) : invariant(false) : void 0;
    var _action$payload2 = action.payload,
        id = _action$payload2.id,
        newScroll = _action$payload2.newScroll;
    var target = state.dimensions.droppables[id];

    if (!target) {
      return state;
    }

    var scrolled = scrollDroppable(target, newScroll);
    return postDroppableChange(state, scrolled, false);
  }

  if (action.type === 'UPDATE_DROPPABLE_IS_ENABLED') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }

    !isMovementAllowed(state) ? process.env.NODE_ENV !== "production" ? invariant(false, "Attempting to move in an unsupported phase " + state.phase) : invariant(false) : void 0;
    var _action$payload3 = action.payload,
        _id = _action$payload3.id,
        isEnabled = _action$payload3.isEnabled;
    var _target = state.dimensions.droppables[_id];
    !_target ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot find Droppable[id: " + _id + "] to toggle its enabled state") : invariant(false) : void 0;
    !(_target.isEnabled !== isEnabled) ? process.env.NODE_ENV !== "production" ? invariant(false, "Trying to set droppable isEnabled to " + String(isEnabled) + "\n      but it is already " + String(_target.isEnabled)) : invariant(false) : void 0;

    var updated = _extends({}, _target, {
      isEnabled: isEnabled
    });

    return postDroppableChange(state, updated, true);
  }

  if (action.type === 'UPDATE_DROPPABLE_IS_COMBINE_ENABLED') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }

    !isMovementAllowed(state) ? process.env.NODE_ENV !== "production" ? invariant(false, "Attempting to move in an unsupported phase " + state.phase) : invariant(false) : void 0;
    var _action$payload4 = action.payload,
        _id2 = _action$payload4.id,
        isCombineEnabled = _action$payload4.isCombineEnabled;
    var _target2 = state.dimensions.droppables[_id2];
    !_target2 ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot find Droppable[id: " + _id2 + "] to toggle its isCombineEnabled state") : invariant(false) : void 0;
    !(_target2.isCombineEnabled !== isCombineEnabled) ? process.env.NODE_ENV !== "production" ? invariant(false, "Trying to set droppable isCombineEnabled to " + String(isCombineEnabled) + "\n      but it is already " + String(_target2.isCombineEnabled)) : invariant(false) : void 0;

    var _updated = _extends({}, _target2, {
      isCombineEnabled: isCombineEnabled
    });

    return postDroppableChange(state, _updated, true);
  }

  if (action.type === 'MOVE_BY_WINDOW_SCROLL') {
    if (state.phase === 'DROP_PENDING' || state.phase === 'DROP_ANIMATING') {
      return state;
    }

    !isMovementAllowed(state) ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot move by window in phase " + state.phase) : invariant(false) : void 0;
    !state.isWindowScrollAllowed ? process.env.NODE_ENV !== "production" ? invariant(false, 'Window scrolling is currently not supported for fixed lists') : invariant(false) : void 0;
    var _newScroll = action.payload.newScroll;

    if (isEqual(state.viewport.scroll.current, _newScroll)) {
      return removeScrollJumpRequest(state);
    }

    var _viewport = scrollViewport(state.viewport, _newScroll);

    if (isSnapping(state)) {
      return refreshSnap({
        state: state,
        viewport: _viewport
      });
    }

    return update({
      state: state,
      viewport: _viewport
    });
  }

  if (action.type === 'UPDATE_VIEWPORT_MAX_SCROLL') {
    if (!isMovementAllowed(state)) {
      return state;
    }

    var maxScroll = action.payload.maxScroll;

    if (isEqual(maxScroll, state.viewport.scroll.max)) {
      return state;
    }

    var withMaxScroll = _extends({}, state.viewport, {
      scroll: _extends({}, state.viewport.scroll, {
        max: maxScroll
      })
    });

    return _extends({
      phase: 'DRAGGING'
    }, state, {
      viewport: withMaxScroll
    });
  }

  if (action.type === 'MOVE_UP' || action.type === 'MOVE_DOWN' || action.type === 'MOVE_LEFT' || action.type === 'MOVE_RIGHT') {
    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
      return state;
    }

    !(state.phase === 'DRAGGING') ? process.env.NODE_ENV !== "production" ? invariant(false, action.type + " received while not in DRAGGING phase") : invariant(false) : void 0;

    var _result2 = moveInDirection({
      state: state,
      type: action.type
    });

    if (!_result2) {
      return state;
    }

    return update({
      state: state,
      impact: _result2.impact,
      clientSelection: _result2.clientSelection,
      scrollJumpRequest: _result2.scrollJumpRequest
    });
  }

  if (action.type === 'DROP_PENDING') {
    var reason = action.payload.reason;
    !(state.phase === 'COLLECTING') ? process.env.NODE_ENV !== "production" ? invariant(false, 'Can only move into the DROP_PENDING phase from the COLLECTING phase') : invariant(false) : void 0;

    var newState = _extends({
      phase: 'DROP_PENDING'
    }, state, {
      phase: 'DROP_PENDING',
      isWaiting: true,
      reason: reason
    });

    return newState;
  }

  if (action.type === 'DROP_ANIMATE') {
    var _action$payload5 = action.payload,
        completed = _action$payload5.completed,
        dropDuration = _action$payload5.dropDuration,
        newHomeClientOffset = _action$payload5.newHomeClientOffset;
    !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot animate drop from phase " + state.phase) : invariant(false) : void 0;
    var _result3 = {
      phase: 'DROP_ANIMATING',
      completed: completed,
      dropDuration: dropDuration,
      newHomeClientOffset: newHomeClientOffset,
      dimensions: state.dimensions
    };
    return _result3;
  }

  if (action.type === 'DROP_COMPLETE') {
    var _completed = action.payload.completed;
    return {
      phase: 'IDLE',
      completed: _completed,
      shouldFlush: false
    };
  }

  return state;
});

var beforeInitialCapture = function beforeInitialCapture(args) {
  return {
    type: 'BEFORE_INITIAL_CAPTURE',
    payload: args
  };
};
var lift = function lift(args) {
  return {
    type: 'LIFT',
    payload: args
  };
};
var initialPublish = function initialPublish(args) {
  return {
    type: 'INITIAL_PUBLISH',
    payload: args
  };
};
var publishWhileDragging = function publishWhileDragging(args) {
  return {
    type: 'PUBLISH_WHILE_DRAGGING',
    payload: args
  };
};
var collectionStarting = function collectionStarting() {
  return {
    type: 'COLLECTION_STARTING',
    payload: null
  };
};
var updateDroppableScroll = function updateDroppableScroll(args) {
  return {
    type: 'UPDATE_DROPPABLE_SCROLL',
    payload: args
  };
};
var updateDroppableIsEnabled = function updateDroppableIsEnabled(args) {
  return {
    type: 'UPDATE_DROPPABLE_IS_ENABLED',
    payload: args
  };
};
var updateDroppableIsCombineEnabled = function updateDroppableIsCombineEnabled(args) {
  return {
    type: 'UPDATE_DROPPABLE_IS_COMBINE_ENABLED',
    payload: args
  };
};
var move = function move(args) {
  return {
    type: 'MOVE',
    payload: args
  };
};
var moveByWindowScroll = function moveByWindowScroll(args) {
  return {
    type: 'MOVE_BY_WINDOW_SCROLL',
    payload: args
  };
};
var updateViewportMaxScroll = function updateViewportMaxScroll(args) {
  return {
    type: 'UPDATE_VIEWPORT_MAX_SCROLL',
    payload: args
  };
};
var moveUp = function moveUp() {
  return {
    type: 'MOVE_UP',
    payload: null
  };
};
var moveDown = function moveDown() {
  return {
    type: 'MOVE_DOWN',
    payload: null
  };
};
var moveRight = function moveRight() {
  return {
    type: 'MOVE_RIGHT',
    payload: null
  };
};
var moveLeft = function moveLeft() {
  return {
    type: 'MOVE_LEFT',
    payload: null
  };
};
var flush = function flush() {
  return {
    type: 'FLUSH',
    payload: null
  };
};
var animateDrop = function animateDrop(args) {
  return {
    type: 'DROP_ANIMATE',
    payload: args
  };
};
var completeDrop = function completeDrop(args) {
  return {
    type: 'DROP_COMPLETE',
    payload: args
  };
};
var drop = function drop(args) {
  return {
    type: 'DROP',
    payload: args
  };
};
var dropPending = function dropPending(args) {
  return {
    type: 'DROP_PENDING',
    payload: args
  };
};
var dropAnimationFinished = function dropAnimationFinished() {
  return {
    type: 'DROP_ANIMATION_FINISHED',
    payload: null
  };
};

function checkIndexes(insideDestination) {
  if (insideDestination.length <= 1) {
    return;
  }

  var indexes = insideDestination.map(function (d) {
    return d.descriptor.index;
  });
  var errors = {};

  for (var i = 1; i < indexes.length; i++) {
    var current = indexes[i];
    var previous = indexes[i - 1];

    if (current !== previous + 1) {
      errors[current] = true;
    }
  }

  if (!Object.keys(errors).length) {
    return;
  }

  var formatted = indexes.map(function (index) {
    var hasError = Boolean(errors[index]);
    return hasError ? "[\uD83D\uDD25" + index + "]" : "" + index;
  }).join(', ');
  process.env.NODE_ENV !== "production" ? warning("\n    Detected non-consecutive <Draggable /> indexes.\n\n    (This can cause unexpected bugs)\n\n    " + formatted + "\n  ") : void 0;
}

function validateDimensions(critical, dimensions) {
  if (process.env.NODE_ENV !== 'production') {
    var insideDestination = getDraggablesInsideDroppable(critical.droppable.id, dimensions.draggables);
    checkIndexes(insideDestination);
  }
}

var lift$1 = (function (marshal) {
  return function (_ref) {
    var getState = _ref.getState,
        dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        if (action.type !== 'LIFT') {
          next(action);
          return;
        }

        var _action$payload = action.payload,
            id = _action$payload.id,
            clientSelection = _action$payload.clientSelection,
            movementMode = _action$payload.movementMode;
        var initial = getState();

        if (initial.phase === 'DROP_ANIMATING') {
          dispatch(completeDrop({
            completed: initial.completed
          }));
        }

        !(getState().phase === 'IDLE') ? process.env.NODE_ENV !== "production" ? invariant(false, 'Unexpected phase to start a drag') : invariant(false) : void 0;
        dispatch(flush());
        dispatch(beforeInitialCapture({
          draggableId: id,
          movementMode: movementMode
        }));
        var scrollOptions = {
          shouldPublishImmediately: movementMode === 'SNAP'
        };
        var request = {
          draggableId: id,
          scrollOptions: scrollOptions
        };

        var _marshal$startPublish = marshal.startPublishing(request),
            critical = _marshal$startPublish.critical,
            dimensions = _marshal$startPublish.dimensions,
            viewport = _marshal$startPublish.viewport;

        validateDimensions(critical, dimensions);
        dispatch(initialPublish({
          critical: critical,
          dimensions: dimensions,
          clientSelection: clientSelection,
          movementMode: movementMode,
          viewport: viewport
        }));
      };
    };
  };
});

var style = (function (marshal) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type === 'INITIAL_PUBLISH') {
          marshal.dragging();
        }

        if (action.type === 'DROP_ANIMATE') {
          marshal.dropping(action.payload.completed.result.reason);
        }

        if (action.type === 'FLUSH' || action.type === 'DROP_COMPLETE') {
          marshal.resting();
        }

        next(action);
      };
    };
  };
});

var curves = {
  outOfTheWay: 'cubic-bezier(0.2, 0, 0, 1)',
  drop: 'cubic-bezier(.2,1,.1,1)'
};
var combine = {
  opacity: {
    drop: 0,
    combining: 0.7
  },
  scale: {
    drop: 0.75
  }
};
var timings = {
  outOfTheWay: 0.2,
  minDropTime: 0.33,
  maxDropTime: 0.55
};
var outOfTheWayTiming = timings.outOfTheWay + "s " + curves.outOfTheWay;
var transitions = {
  fluid: "opacity " + outOfTheWayTiming,
  snap: "transform " + outOfTheWayTiming + ", opacity " + outOfTheWayTiming,
  drop: function drop(duration) {
    var timing = duration + "s " + curves.drop;
    return "transform " + timing + ", opacity " + timing;
  },
  outOfTheWay: "transform " + outOfTheWayTiming,
  placeholder: "height " + outOfTheWayTiming + ", width " + outOfTheWayTiming + ", margin " + outOfTheWayTiming
};

var moveTo = function moveTo(offset) {
  return isEqual(offset, origin) ? null : "translate(" + offset.x + "px, " + offset.y + "px)";
};

var transforms = {
  moveTo: moveTo,
  drop: function drop(offset, isCombining) {
    var translate = moveTo(offset);

    if (!translate) {
      return null;
    }

    if (!isCombining) {
      return translate;
    }

    return translate + " scale(" + combine.scale.drop + ")";
  }
};

var minDropTime = timings.minDropTime,
    maxDropTime = timings.maxDropTime;
var dropTimeRange = maxDropTime - minDropTime;
var maxDropTimeAtDistance = 1500;
var cancelDropModifier = 0.6;
var getDropDuration = (function (_ref) {
  var current = _ref.current,
      destination = _ref.destination,
      reason = _ref.reason;
  var distance$1 = distance(current, destination);

  if (distance$1 <= 0) {
    return minDropTime;
  }

  if (distance$1 >= maxDropTimeAtDistance) {
    return maxDropTime;
  }

  var percentage = distance$1 / maxDropTimeAtDistance;
  var duration = minDropTime + dropTimeRange * percentage;
  var withDuration = reason === 'CANCEL' ? duration * cancelDropModifier : duration;
  return Number(withDuration.toFixed(2));
});

var getNewHomeClientOffset = (function (_ref) {
  var impact = _ref.impact,
      draggable = _ref.draggable,
      dimensions = _ref.dimensions,
      viewport = _ref.viewport,
      afterCritical = _ref.afterCritical;
  var draggables = dimensions.draggables,
      droppables = dimensions.droppables;
  var droppableId = whatIsDraggedOver(impact);
  var destination = droppableId ? droppables[droppableId] : null;
  var home = droppables[draggable.descriptor.droppableId];
  var newClientCenter = getClientBorderBoxCenter({
    impact: impact,
    draggable: draggable,
    draggables: draggables,
    afterCritical: afterCritical,
    droppable: destination || home,
    viewport: viewport
  });
  var offset = subtract(newClientCenter, draggable.client.borderBox.center);
  return offset;
});

var getDropImpact = (function (_ref) {
  var draggables = _ref.draggables,
      reason = _ref.reason,
      lastImpact = _ref.lastImpact,
      home = _ref.home,
      viewport = _ref.viewport,
      onLiftImpact = _ref.onLiftImpact;

  if (!lastImpact.at || reason !== 'DROP') {
    var recomputedHomeImpact = recompute({
      draggables: draggables,
      impact: onLiftImpact,
      destination: home,
      viewport: viewport,
      forceShouldAnimate: true
    });
    return {
      impact: recomputedHomeImpact,
      didDropInsideDroppable: false
    };
  }

  if (lastImpact.at.type === 'REORDER') {
    return {
      impact: lastImpact,
      didDropInsideDroppable: true
    };
  }

  var withoutMovement = _extends({}, lastImpact, {
    displaced: emptyGroups
  });

  return {
    impact: withoutMovement,
    didDropInsideDroppable: true
  };
});

var drop$1 = (function (_ref) {
  var getState = _ref.getState,
      dispatch = _ref.dispatch;
  return function (next) {
    return function (action) {
      if (action.type !== 'DROP') {
        next(action);
        return;
      }

      var state = getState();
      var reason = action.payload.reason;

      if (state.phase === 'COLLECTING') {
        dispatch(dropPending({
          reason: reason
        }));
        return;
      }

      if (state.phase === 'IDLE') {
        return;
      }

      var isWaitingForDrop = state.phase === 'DROP_PENDING' && state.isWaiting;
      !!isWaitingForDrop ? process.env.NODE_ENV !== "production" ? invariant(false, 'A DROP action occurred while DROP_PENDING and still waiting') : invariant(false) : void 0;
      !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot drop in phase: " + state.phase) : invariant(false) : void 0;
      var critical = state.critical;
      var dimensions = state.dimensions;
      var draggable = dimensions.draggables[state.critical.draggable.id];

      var _getDropImpact = getDropImpact({
        reason: reason,
        lastImpact: state.impact,
        afterCritical: state.afterCritical,
        onLiftImpact: state.onLiftImpact,
        home: state.dimensions.droppables[state.critical.droppable.id],
        viewport: state.viewport,
        draggables: state.dimensions.draggables
      }),
          impact = _getDropImpact.impact,
          didDropInsideDroppable = _getDropImpact.didDropInsideDroppable;

      var destination = didDropInsideDroppable ? tryGetDestination(impact) : null;
      var combine = didDropInsideDroppable ? tryGetCombine(impact) : null;
      var source = {
        index: critical.draggable.index,
        droppableId: critical.droppable.id
      };
      var result = {
        draggableId: draggable.descriptor.id,
        type: draggable.descriptor.type,
        source: source,
        reason: reason,
        mode: state.movementMode,
        destination: destination,
        combine: combine
      };
      var newHomeClientOffset = getNewHomeClientOffset({
        impact: impact,
        draggable: draggable,
        dimensions: dimensions,
        viewport: state.viewport,
        afterCritical: state.afterCritical
      });
      var completed = {
        critical: state.critical,
        afterCritical: state.afterCritical,
        result: result,
        impact: impact
      };
      var isAnimationRequired = !isEqual(state.current.client.offset, newHomeClientOffset) || Boolean(result.combine);

      if (!isAnimationRequired) {
        dispatch(completeDrop({
          completed: completed
        }));
        return;
      }

      var dropDuration = getDropDuration({
        current: state.current.client.offset,
        destination: newHomeClientOffset,
        reason: reason
      });
      var args = {
        newHomeClientOffset: newHomeClientOffset,
        dropDuration: dropDuration,
        completed: completed
      };
      dispatch(animateDrop(args));
    };
  };
});

var getWindowScroll = (function () {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
});

function getWindowScrollBinding(update) {
  return {
    eventName: 'scroll',
    options: {
      passive: true,
      capture: false
    },
    fn: function fn(event) {
      if (event.target !== window && event.target !== window.document) {
        return;
      }

      update();
    }
  };
}

function getScrollListener(_ref) {
  var onWindowScroll = _ref.onWindowScroll;

  function updateScroll() {
    onWindowScroll(getWindowScroll());
  }

  var scheduled = rafSchd$1(updateScroll);
  var binding = getWindowScrollBinding(scheduled);
  var unbind = noop;

  function isActive() {
    return unbind !== noop;
  }

  function start() {
    !!isActive() ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot start scroll listener when already active') : invariant(false) : void 0;
    unbind = bindEvents(window, [binding]);
  }

  function stop() {
    !isActive() ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot stop scroll listener when not active') : invariant(false) : void 0;
    scheduled.cancel();
    unbind();
    unbind = noop;
  }

  return {
    start: start,
    stop: stop,
    isActive: isActive
  };
}

var shouldEnd = function shouldEnd(action) {
  return action.type === 'DROP_COMPLETE' || action.type === 'DROP_ANIMATE' || action.type === 'FLUSH';
};

var scrollListener = (function (store) {
  var listener = getScrollListener({
    onWindowScroll: function onWindowScroll(newScroll) {
      store.dispatch(moveByWindowScroll({
        newScroll: newScroll
      }));
    }
  });
  return function (next) {
    return function (action) {
      if (!listener.isActive() && action.type === 'INITIAL_PUBLISH') {
        listener.start();
      }

      if (listener.isActive() && shouldEnd(action)) {
        listener.stop();
      }

      next(action);
    };
  };
});

var getExpiringAnnounce = (function (announce) {
  var wasCalled = false;
  var isExpired = false;
  var timeoutId = setTimeout(function () {
    isExpired = true;
  });

  var result = function result(message) {
    if (wasCalled) {
      process.env.NODE_ENV !== "production" ? warning('Announcement already made. Not making a second announcement') : void 0;
      return;
    }

    if (isExpired) {
      process.env.NODE_ENV !== "production" ? warning("\n        Announcements cannot be made asynchronously.\n        Default message has already been announced.\n      ") : void 0;
      return;
    }

    wasCalled = true;
    announce(message);
    clearTimeout(timeoutId);
  };

  result.wasCalled = function () {
    return wasCalled;
  };

  return result;
});

var getAsyncMarshal = (function () {
  var entries = [];

  var execute = function execute(timerId) {
    var index = findIndex(entries, function (item) {
      return item.timerId === timerId;
    });
    !(index !== -1) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Could not find timer') : invariant(false) : void 0;

    var _entries$splice = entries.splice(index, 1),
        entry = _entries$splice[0];

    entry.callback();
  };

  var add = function add(fn) {
    var timerId = setTimeout(function () {
      return execute(timerId);
    });
    var entry = {
      timerId: timerId,
      callback: fn
    };
    entries.push(entry);
  };

  var flush = function flush() {
    if (!entries.length) {
      return;
    }

    var shallow = [].concat(entries);
    entries.length = 0;
    shallow.forEach(function (entry) {
      clearTimeout(entry.timerId);
      entry.callback();
    });
  };

  return {
    add: add,
    flush: flush
  };
});

var areLocationsEqual = function areLocationsEqual(first, second) {
  if (first == null && second == null) {
    return true;
  }

  if (first == null || second == null) {
    return false;
  }

  return first.droppableId === second.droppableId && first.index === second.index;
};
var isCombineEqual = function isCombineEqual(first, second) {
  if (first == null && second == null) {
    return true;
  }

  if (first == null || second == null) {
    return false;
  }

  return first.draggableId === second.draggableId && first.droppableId === second.droppableId;
};
var isCriticalEqual = function isCriticalEqual(first, second) {
  if (first === second) {
    return true;
  }

  var isDraggableEqual = first.draggable.id === second.draggable.id && first.draggable.droppableId === second.draggable.droppableId && first.draggable.type === second.draggable.type && first.draggable.index === second.draggable.index;
  var isDroppableEqual = first.droppable.id === second.droppable.id && first.droppable.type === second.droppable.type;
  return isDraggableEqual && isDroppableEqual;
};

var withTimings = function withTimings(key, fn) {
  start();
  fn();
  finish();
};

var getDragStart = function getDragStart(critical, mode) {
  return {
    draggableId: critical.draggable.id,
    type: critical.droppable.type,
    source: {
      droppableId: critical.droppable.id,
      index: critical.draggable.index
    },
    mode: mode
  };
};

var execute = function execute(responder, data, announce, getDefaultMessage) {
  if (!responder) {
    announce(getDefaultMessage(data));
    return;
  }

  var willExpire = getExpiringAnnounce(announce);
  var provided = {
    announce: willExpire
  };
  responder(data, provided);

  if (!willExpire.wasCalled()) {
    announce(getDefaultMessage(data));
  }
};

var getPublisher = (function (getResponders, announce) {
  var asyncMarshal = getAsyncMarshal();
  var dragging = null;

  var beforeCapture = function beforeCapture(draggableId, mode) {
    !!dragging ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot fire onBeforeCapture as a drag start has already been published') : invariant(false) : void 0;
    withTimings('onBeforeCapture', function () {
      var fn = getResponders().onBeforeCapture;

      if (fn) {
        var before = {
          draggableId: draggableId,
          mode: mode
        };
        fn(before);
      }
    });
  };

  var beforeStart = function beforeStart(critical, mode) {
    !!dragging ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot fire onBeforeDragStart as a drag start has already been published') : invariant(false) : void 0;
    withTimings('onBeforeDragStart', function () {
      var fn = getResponders().onBeforeDragStart;

      if (fn) {
        fn(getDragStart(critical, mode));
      }
    });
  };

  var start = function start(critical, mode) {
    !!dragging ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot fire onBeforeDragStart as a drag start has already been published') : invariant(false) : void 0;
    var data = getDragStart(critical, mode);
    dragging = {
      mode: mode,
      lastCritical: critical,
      lastLocation: data.source,
      lastCombine: null
    };
    asyncMarshal.add(function () {
      withTimings('onDragStart', function () {
        return execute(getResponders().onDragStart, data, announce, preset.onDragStart);
      });
    });
  };

  var update = function update(critical, impact) {
    var location = tryGetDestination(impact);
    var combine = tryGetCombine(impact);
    !dragging ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot fire onDragMove when onDragStart has not been called') : invariant(false) : void 0;
    var hasCriticalChanged = !isCriticalEqual(critical, dragging.lastCritical);

    if (hasCriticalChanged) {
      dragging.lastCritical = critical;
    }

    var hasLocationChanged = !areLocationsEqual(dragging.lastLocation, location);

    if (hasLocationChanged) {
      dragging.lastLocation = location;
    }

    var hasGroupingChanged = !isCombineEqual(dragging.lastCombine, combine);

    if (hasGroupingChanged) {
      dragging.lastCombine = combine;
    }

    if (!hasCriticalChanged && !hasLocationChanged && !hasGroupingChanged) {
      return;
    }

    var data = _extends({}, getDragStart(critical, dragging.mode), {
      combine: combine,
      destination: location
    });

    asyncMarshal.add(function () {
      withTimings('onDragUpdate', function () {
        return execute(getResponders().onDragUpdate, data, announce, preset.onDragUpdate);
      });
    });
  };

  var flush = function flush() {
    !dragging ? process.env.NODE_ENV !== "production" ? invariant(false, 'Can only flush responders while dragging') : invariant(false) : void 0;
    asyncMarshal.flush();
  };

  var drop = function drop(result) {
    !dragging ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot fire onDragEnd when there is no matching onDragStart') : invariant(false) : void 0;
    dragging = null;
    withTimings('onDragEnd', function () {
      return execute(getResponders().onDragEnd, result, announce, preset.onDragEnd);
    });
  };

  var abort = function abort() {
    if (!dragging) {
      return;
    }

    var result = _extends({}, getDragStart(dragging.lastCritical, dragging.mode), {
      combine: null,
      destination: null,
      reason: 'CANCEL'
    });

    drop(result);
  };

  return {
    beforeCapture: beforeCapture,
    beforeStart: beforeStart,
    start: start,
    update: update,
    flush: flush,
    drop: drop,
    abort: abort
  };
});

var responders = (function (getResponders, announce) {
  var publisher = getPublisher(getResponders, announce);
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === 'BEFORE_INITIAL_CAPTURE') {
          publisher.beforeCapture(action.payload.draggableId, action.payload.movementMode);
          return;
        }

        if (action.type === 'INITIAL_PUBLISH') {
          var critical = action.payload.critical;
          publisher.beforeStart(critical, action.payload.movementMode);
          next(action);
          publisher.start(critical, action.payload.movementMode);
          return;
        }

        if (action.type === 'DROP_COMPLETE') {
          var result = action.payload.completed.result;
          publisher.flush();
          next(action);
          publisher.drop(result);
          return;
        }

        next(action);

        if (action.type === 'FLUSH') {
          publisher.abort();
          return;
        }

        var state = store.getState();

        if (state.phase === 'DRAGGING') {
          publisher.update(state.critical, state.impact);
        }
      };
    };
  };
});

var dropAnimationFinish = (function (store) {
  return function (next) {
    return function (action) {
      if (action.type !== 'DROP_ANIMATION_FINISHED') {
        next(action);
        return;
      }

      var state = store.getState();
      !(state.phase === 'DROP_ANIMATING') ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot finish a drop animating when no drop is occurring') : invariant(false) : void 0;
      store.dispatch(completeDrop({
        completed: state.completed
      }));
    };
  };
});

var dropAnimationFlushOnScroll = (function (store) {
  var unbind = null;
  var frameId = null;

  function clear() {
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }

    if (unbind) {
      unbind();
      unbind = null;
    }
  }

  return function (next) {
    return function (action) {
      if (action.type === 'FLUSH' || action.type === 'DROP_COMPLETE' || action.type === 'DROP_ANIMATION_FINISHED') {
        clear();
      }

      next(action);

      if (action.type !== 'DROP_ANIMATE') {
        return;
      }

      var binding = {
        eventName: 'scroll',
        options: {
          capture: true,
          passive: false,
          once: true
        },
        fn: function flushDropAnimation() {
          var state = store.getState();

          if (state.phase === 'DROP_ANIMATING') {
            store.dispatch(dropAnimationFinished());
          }
        }
      };
      frameId = requestAnimationFrame(function () {
        frameId = null;
        unbind = bindEvents(window, [binding]);
      });
    };
  };
});

var dimensionMarshalStopper = (function (marshal) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type === 'DROP_COMPLETE' || action.type === 'FLUSH' || action.type === 'DROP_ANIMATE') {
          marshal.stopPublishing();
        }

        next(action);
      };
    };
  };
});

var focus = (function (marshal) {
  var isWatching = false;
  return function () {
    return function (next) {
      return function (action) {
        if (action.type === 'INITIAL_PUBLISH') {
          isWatching = true;
          marshal.tryRecordFocus(action.payload.critical.draggable.id);
          next(action);
          marshal.tryRestoreFocusRecorded();
          return;
        }

        next(action);

        if (!isWatching) {
          return;
        }

        if (action.type === 'FLUSH') {
          isWatching = false;
          marshal.tryRestoreFocusRecorded();
          return;
        }

        if (action.type === 'DROP_COMPLETE') {
          isWatching = false;
          var result = action.payload.completed.result;

          if (result.combine) {
            marshal.tryShiftRecord(result.draggableId, result.combine.draggableId);
          }

          marshal.tryRestoreFocusRecorded();
        }
      };
    };
  };
});

var shouldStop = function shouldStop(action) {
  return action.type === 'DROP_COMPLETE' || action.type === 'DROP_ANIMATE' || action.type === 'FLUSH';
};

var autoScroll = (function (autoScroller) {
  return function (store) {
    return function (next) {
      return function (action) {
        if (shouldStop(action)) {
          autoScroller.stop();
          next(action);
          return;
        }

        if (action.type === 'INITIAL_PUBLISH') {
          next(action);
          var state = store.getState();
          !(state.phase === 'DRAGGING') ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected phase to be DRAGGING after INITIAL_PUBLISH') : invariant(false) : void 0;
          autoScroller.start(state);
          return;
        }

        next(action);
        autoScroller.scroll(store.getState());
      };
    };
  };
});

var pendingDrop = (function (store) {
  return function (next) {
    return function (action) {
      next(action);

      if (action.type !== 'PUBLISH_WHILE_DRAGGING') {
        return;
      }

      var postActionState = store.getState();

      if (postActionState.phase !== 'DROP_PENDING') {
        return;
      }

      if (postActionState.isWaiting) {
        return;
      }

      store.dispatch(drop({
        reason: postActionState.reason
      }));
    };
  };
});

var composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  name: 'react-beautiful-dnd'
}) : compose;
var createStore = (function (_ref) {
  var dimensionMarshal = _ref.dimensionMarshal,
      focusMarshal = _ref.focusMarshal,
      styleMarshal = _ref.styleMarshal,
      getResponders = _ref.getResponders,
      announce = _ref.announce,
      autoScroller = _ref.autoScroller;
  return createStore$1(reducer, composeEnhancers(applyMiddleware(style(styleMarshal), dimensionMarshalStopper(dimensionMarshal), lift$1(dimensionMarshal), drop$1, dropAnimationFinish, dropAnimationFlushOnScroll, pendingDrop, autoScroll(autoScroller), scrollListener, focus(focusMarshal), responders(getResponders, announce))));
});

var clean$1 = function clean() {
  return {
    additions: {},
    removals: {},
    modified: {}
  };
};
function createPublisher(_ref) {
  var registry = _ref.registry,
      callbacks = _ref.callbacks;
  var staging = clean$1();
  var frameId = null;

  var collect = function collect() {
    if (frameId) {
      return;
    }

    callbacks.collectionStarting();
    frameId = requestAnimationFrame(function () {
      frameId = null;
      start();
      var _staging = staging,
          additions = _staging.additions,
          removals = _staging.removals,
          modified = _staging.modified;
      var added = Object.keys(additions).map(function (id) {
        return registry.draggable.getById(id).getDimension(origin);
      }).sort(function (a, b) {
        return a.descriptor.index - b.descriptor.index;
      });
      var updated = Object.keys(modified).map(function (id) {
        var entry = registry.droppable.getById(id);
        var scroll = entry.callbacks.getScrollWhileDragging();
        return {
          droppableId: id,
          scroll: scroll
        };
      });
      var result = {
        additions: added,
        removals: Object.keys(removals),
        modified: updated
      };
      staging = clean$1();
      finish();
      callbacks.publish(result);
    });
  };

  var add = function add(entry) {
    var id = entry.descriptor.id;
    staging.additions[id] = entry;
    staging.modified[entry.descriptor.droppableId] = true;

    if (staging.removals[id]) {
      delete staging.removals[id];
    }

    collect();
  };

  var remove = function remove(entry) {
    var descriptor = entry.descriptor;
    staging.removals[descriptor.id] = true;
    staging.modified[descriptor.droppableId] = true;

    if (staging.additions[descriptor.id]) {
      delete staging.additions[descriptor.id];
    }

    collect();
  };

  var stop = function stop() {
    if (!frameId) {
      return;
    }

    cancelAnimationFrame(frameId);
    frameId = null;
    staging = clean$1();
  };

  return {
    add: add,
    remove: remove,
    stop: stop
  };
}

var getMaxScroll = (function (_ref) {
  var scrollHeight = _ref.scrollHeight,
      scrollWidth = _ref.scrollWidth,
      height = _ref.height,
      width = _ref.width;
  var maxScroll = subtract({
    x: scrollWidth,
    y: scrollHeight
  }, {
    x: width,
    y: height
  });
  var adjustedMaxScroll = {
    x: Math.max(0, maxScroll.x),
    y: Math.max(0, maxScroll.y)
  };
  return adjustedMaxScroll;
});

var getDocumentElement = (function () {
  var doc = document.documentElement;
  !doc ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot find document.documentElement') : invariant(false) : void 0;
  return doc;
});

var getMaxWindowScroll = (function () {
  var doc = getDocumentElement();
  var maxScroll = getMaxScroll({
    scrollHeight: doc.scrollHeight,
    scrollWidth: doc.scrollWidth,
    width: doc.clientWidth,
    height: doc.clientHeight
  });
  return maxScroll;
});

var getViewport = (function () {
  var scroll = getWindowScroll();
  var maxScroll = getMaxWindowScroll();
  var top = scroll.y;
  var left = scroll.x;
  var doc = getDocumentElement();
  var width = doc.clientWidth;
  var height = doc.clientHeight;
  var right = left + width;
  var bottom = top + height;
  var frame = getRect({
    top: top,
    left: left,
    right: right,
    bottom: bottom
  });
  var viewport = {
    frame: frame,
    scroll: {
      initial: scroll,
      current: scroll,
      max: maxScroll,
      diff: {
        value: origin,
        displacement: origin
      }
    }
  };
  return viewport;
});

var getInitialPublish = (function (_ref) {
  var critical = _ref.critical,
      scrollOptions = _ref.scrollOptions,
      registry = _ref.registry;
  start();
  var viewport = getViewport();
  var windowScroll = viewport.scroll.current;
  var home = critical.droppable;
  var droppables = registry.droppable.getAllByType(home.type).map(function (entry) {
    return entry.callbacks.getDimensionAndWatchScroll(windowScroll, scrollOptions);
  });
  var draggables = registry.draggable.getAllByType(critical.draggable.type).map(function (entry) {
    return entry.getDimension(windowScroll);
  });
  var dimensions = {
    draggables: toDraggableMap(draggables),
    droppables: toDroppableMap(droppables)
  };
  finish();
  var result = {
    dimensions: dimensions,
    critical: critical,
    viewport: viewport
  };
  return result;
});

function shouldPublishUpdate(registry, dragging, entry) {
  if (entry.descriptor.id === dragging.id) {
    return false;
  }

  if (entry.descriptor.type !== dragging.type) {
    return false;
  }

  var home = registry.droppable.getById(entry.descriptor.droppableId);

  if (home.descriptor.mode !== 'virtual') {
    process.env.NODE_ENV !== "production" ? warning("\n      You are attempting to add or remove a Draggable [id: " + entry.descriptor.id + "]\n      while a drag is occurring. This is only supported for virtual lists.\n\n      See https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/patterns/virtual-lists.md\n    ") : void 0;
    return false;
  }

  return true;
}

var createDimensionMarshal = (function (registry, callbacks) {
  var collection = null;
  var publisher = createPublisher({
    callbacks: {
      publish: callbacks.publishWhileDragging,
      collectionStarting: callbacks.collectionStarting
    },
    registry: registry
  });

  var updateDroppableIsEnabled = function updateDroppableIsEnabled(id, isEnabled) {
    !registry.droppable.exists(id) ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot update is enabled flag of Droppable " + id + " as it is not registered") : invariant(false) : void 0;

    if (!collection) {
      return;
    }

    callbacks.updateDroppableIsEnabled({
      id: id,
      isEnabled: isEnabled
    });
  };

  var updateDroppableIsCombineEnabled = function updateDroppableIsCombineEnabled(id, isCombineEnabled) {
    if (!collection) {
      return;
    }

    !registry.droppable.exists(id) ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot update isCombineEnabled flag of Droppable " + id + " as it is not registered") : invariant(false) : void 0;
    callbacks.updateDroppableIsCombineEnabled({
      id: id,
      isCombineEnabled: isCombineEnabled
    });
  };

  var updateDroppableScroll = function updateDroppableScroll(id, newScroll) {
    if (!collection) {
      return;
    }

    !registry.droppable.exists(id) ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot update the scroll on Droppable " + id + " as it is not registered") : invariant(false) : void 0;
    callbacks.updateDroppableScroll({
      id: id,
      newScroll: newScroll
    });
  };

  var scrollDroppable = function scrollDroppable(id, change) {
    if (!collection) {
      return;
    }

    registry.droppable.getById(id).callbacks.scroll(change);
  };

  var stopPublishing = function stopPublishing() {
    if (!collection) {
      return;
    }

    publisher.stop();
    var home = collection.critical.droppable;
    registry.droppable.getAllByType(home.type).forEach(function (entry) {
      return entry.callbacks.dragStopped();
    });
    collection.unsubscribe();
    collection = null;
  };

  var subscriber = function subscriber(event) {
    !collection ? process.env.NODE_ENV !== "production" ? invariant(false, 'Should only be subscribed when a collection is occurring') : invariant(false) : void 0;
    var dragging = collection.critical.draggable;

    if (event.type === 'ADDITION') {
      if (shouldPublishUpdate(registry, dragging, event.value)) {
        publisher.add(event.value);
      }
    }

    if (event.type === 'REMOVAL') {
      if (shouldPublishUpdate(registry, dragging, event.value)) {
        publisher.remove(event.value);
      }
    }
  };

  var startPublishing = function startPublishing(request) {
    !!collection ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot start capturing critical dimensions as there is already a collection') : invariant(false) : void 0;
    var entry = registry.draggable.getById(request.draggableId);
    var home = registry.droppable.getById(entry.descriptor.droppableId);
    var critical = {
      draggable: entry.descriptor,
      droppable: home.descriptor
    };
    var unsubscribe = registry.subscribe(subscriber);
    collection = {
      critical: critical,
      unsubscribe: unsubscribe
    };
    return getInitialPublish({
      critical: critical,
      registry: registry,
      scrollOptions: request.scrollOptions
    });
  };

  var marshal = {
    updateDroppableIsEnabled: updateDroppableIsEnabled,
    updateDroppableIsCombineEnabled: updateDroppableIsCombineEnabled,
    scrollDroppable: scrollDroppable,
    updateDroppableScroll: updateDroppableScroll,
    startPublishing: startPublishing,
    stopPublishing: stopPublishing
  };
  return marshal;
});

var canStartDrag = (function (state, id) {
  if (state.phase === 'IDLE') {
    return true;
  }

  if (state.phase !== 'DROP_ANIMATING') {
    return false;
  }

  if (state.completed.result.draggableId === id) {
    return false;
  }

  return state.completed.result.reason === 'DROP';
});

var scrollWindow = (function (change) {
  window.scrollBy(change.x, change.y);
});

var getScrollableDroppables = memoizeOne(function (droppables) {
  return toDroppableList(droppables).filter(function (droppable) {
    if (!droppable.isEnabled) {
      return false;
    }

    if (!droppable.frame) {
      return false;
    }

    return true;
  });
});

var getScrollableDroppableOver = function getScrollableDroppableOver(target, droppables) {
  var maybe = find(getScrollableDroppables(droppables), function (droppable) {
    !droppable.frame ? process.env.NODE_ENV !== "production" ? invariant(false, 'Invalid result') : invariant(false) : void 0;
    return isPositionInFrame(droppable.frame.pageMarginBox)(target);
  });
  return maybe;
};

var getBestScrollableDroppable = (function (_ref) {
  var center = _ref.center,
      destination = _ref.destination,
      droppables = _ref.droppables;

  if (destination) {
    var _dimension = droppables[destination];

    if (!_dimension.frame) {
      return null;
    }

    return _dimension;
  }

  var dimension = getScrollableDroppableOver(center, droppables);
  return dimension;
});

var config = {
  startFromPercentage: 0.25,
  maxScrollAtPercentage: 0.05,
  maxPixelScroll: 28,
  ease: function ease(percentage) {
    return Math.pow(percentage, 2);
  },
  durationDampening: {
    stopDampeningAt: 1200,
    accelerateAt: 360
  }
};

var getDistanceThresholds = (function (container, axis) {
  var startScrollingFrom = container[axis.size] * config.startFromPercentage;
  var maxScrollValueAt = container[axis.size] * config.maxScrollAtPercentage;
  var thresholds = {
    startScrollingFrom: startScrollingFrom,
    maxScrollValueAt: maxScrollValueAt
  };
  return thresholds;
});

var getPercentage = (function (_ref) {
  var startOfRange = _ref.startOfRange,
      endOfRange = _ref.endOfRange,
      current = _ref.current;
  var range = endOfRange - startOfRange;

  if (range === 0) {
    process.env.NODE_ENV !== "production" ? warning("\n      Detected distance range of 0 in the fluid auto scroller\n      This is unexpected and would cause a divide by 0 issue.\n      Not allowing an auto scroll\n    ") : void 0;
    return 0;
  }

  var currentInRange = current - startOfRange;
  var percentage = currentInRange / range;
  return percentage;
});

var minScroll = 1;

var getValueFromDistance = (function (distanceToEdge, thresholds) {
  if (distanceToEdge > thresholds.startScrollingFrom) {
    return 0;
  }

  if (distanceToEdge <= thresholds.maxScrollValueAt) {
    return config.maxPixelScroll;
  }

  if (distanceToEdge === thresholds.startScrollingFrom) {
    return minScroll;
  }

  var percentageFromMaxScrollValueAt = getPercentage({
    startOfRange: thresholds.maxScrollValueAt,
    endOfRange: thresholds.startScrollingFrom,
    current: distanceToEdge
  });
  var percentageFromStartScrollingFrom = 1 - percentageFromMaxScrollValueAt;
  var scroll = config.maxPixelScroll * config.ease(percentageFromStartScrollingFrom);
  return Math.ceil(scroll);
});

var accelerateAt = config.durationDampening.accelerateAt;
var stopAt = config.durationDampening.stopDampeningAt;
var dampenValueByTime = (function (proposedScroll, dragStartTime) {
  var startOfRange = dragStartTime;
  var endOfRange = stopAt;
  var now = Date.now();
  var runTime = now - startOfRange;

  if (runTime >= stopAt) {
    return proposedScroll;
  }

  if (runTime < accelerateAt) {
    return minScroll;
  }

  var betweenAccelerateAtAndStopAtPercentage = getPercentage({
    startOfRange: accelerateAt,
    endOfRange: endOfRange,
    current: runTime
  });
  var scroll = proposedScroll * config.ease(betweenAccelerateAtAndStopAtPercentage);
  return Math.ceil(scroll);
});

var getValue = (function (_ref) {
  var distanceToEdge = _ref.distanceToEdge,
      thresholds = _ref.thresholds,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var scroll = getValueFromDistance(distanceToEdge, thresholds);

  if (scroll === 0) {
    return 0;
  }

  if (!shouldUseTimeDampening) {
    return scroll;
  }

  return Math.max(dampenValueByTime(scroll, dragStartTime), minScroll);
});

var getScrollOnAxis = (function (_ref) {
  var container = _ref.container,
      distanceToEdges = _ref.distanceToEdges,
      dragStartTime = _ref.dragStartTime,
      axis = _ref.axis,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var thresholds = getDistanceThresholds(container, axis);
  var isCloserToEnd = distanceToEdges[axis.end] < distanceToEdges[axis.start];

  if (isCloserToEnd) {
    return getValue({
      distanceToEdge: distanceToEdges[axis.end],
      thresholds: thresholds,
      dragStartTime: dragStartTime,
      shouldUseTimeDampening: shouldUseTimeDampening
    });
  }

  return -1 * getValue({
    distanceToEdge: distanceToEdges[axis.start],
    thresholds: thresholds,
    dragStartTime: dragStartTime,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
});

var adjustForSizeLimits = (function (_ref) {
  var container = _ref.container,
      subject = _ref.subject,
      proposedScroll = _ref.proposedScroll;
  var isTooBigVertically = subject.height > container.height;
  var isTooBigHorizontally = subject.width > container.width;

  if (!isTooBigHorizontally && !isTooBigVertically) {
    return proposedScroll;
  }

  if (isTooBigHorizontally && isTooBigVertically) {
    return null;
  }

  return {
    x: isTooBigHorizontally ? 0 : proposedScroll.x,
    y: isTooBigVertically ? 0 : proposedScroll.y
  };
});

var clean$2 = apply(function (value) {
  return value === 0 ? 0 : value;
});
var getScroll = (function (_ref) {
  var dragStartTime = _ref.dragStartTime,
      container = _ref.container,
      subject = _ref.subject,
      center = _ref.center,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var distanceToEdges = {
    top: center.y - container.top,
    right: container.right - center.x,
    bottom: container.bottom - center.y,
    left: center.x - container.left
  };
  var y = getScrollOnAxis({
    container: container,
    distanceToEdges: distanceToEdges,
    dragStartTime: dragStartTime,
    axis: vertical,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  var x = getScrollOnAxis({
    container: container,
    distanceToEdges: distanceToEdges,
    dragStartTime: dragStartTime,
    axis: horizontal,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  var required = clean$2({
    x: x,
    y: y
  });

  if (isEqual(required, origin)) {
    return null;
  }

  var limited = adjustForSizeLimits({
    container: container,
    subject: subject,
    proposedScroll: required
  });

  if (!limited) {
    return null;
  }

  return isEqual(limited, origin) ? null : limited;
});

var smallestSigned = apply(function (value) {
  if (value === 0) {
    return 0;
  }

  return value > 0 ? 1 : -1;
});
var getOverlap = function () {
  var getRemainder = function getRemainder(target, max) {
    if (target < 0) {
      return target;
    }

    if (target > max) {
      return target - max;
    }

    return 0;
  };

  return function (_ref) {
    var current = _ref.current,
        max = _ref.max,
        change = _ref.change;
    var targetScroll = add(current, change);
    var overlap = {
      x: getRemainder(targetScroll.x, max.x),
      y: getRemainder(targetScroll.y, max.y)
    };

    if (isEqual(overlap, origin)) {
      return null;
    }

    return overlap;
  };
}();
var canPartiallyScroll = function canPartiallyScroll(_ref2) {
  var rawMax = _ref2.max,
      current = _ref2.current,
      change = _ref2.change;
  var max = {
    x: Math.max(current.x, rawMax.x),
    y: Math.max(current.y, rawMax.y)
  };
  var smallestChange = smallestSigned(change);
  var overlap = getOverlap({
    max: max,
    current: current,
    change: smallestChange
  });

  if (!overlap) {
    return true;
  }

  if (smallestChange.x !== 0 && overlap.x === 0) {
    return true;
  }

  if (smallestChange.y !== 0 && overlap.y === 0) {
    return true;
  }

  return false;
};
var canScrollWindow = function canScrollWindow(viewport, change) {
  return canPartiallyScroll({
    current: viewport.scroll.current,
    max: viewport.scroll.max,
    change: change
  });
};
var getWindowOverlap = function getWindowOverlap(viewport, change) {
  if (!canScrollWindow(viewport, change)) {
    return null;
  }

  var max = viewport.scroll.max;
  var current = viewport.scroll.current;
  return getOverlap({
    current: current,
    max: max,
    change: change
  });
};
var canScrollDroppable = function canScrollDroppable(droppable, change) {
  var frame = droppable.frame;

  if (!frame) {
    return false;
  }

  return canPartiallyScroll({
    current: frame.scroll.current,
    max: frame.scroll.max,
    change: change
  });
};
var getDroppableOverlap = function getDroppableOverlap(droppable, change) {
  var frame = droppable.frame;

  if (!frame) {
    return null;
  }

  if (!canScrollDroppable(droppable, change)) {
    return null;
  }

  return getOverlap({
    current: frame.scroll.current,
    max: frame.scroll.max,
    change: change
  });
};

var getWindowScrollChange = (function (_ref) {
  var viewport = _ref.viewport,
      subject = _ref.subject,
      center = _ref.center,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var scroll = getScroll({
    dragStartTime: dragStartTime,
    container: viewport.frame,
    subject: subject,
    center: center,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  return scroll && canScrollWindow(viewport, scroll) ? scroll : null;
});

var getDroppableScrollChange = (function (_ref) {
  var droppable = _ref.droppable,
      subject = _ref.subject,
      center = _ref.center,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening;
  var frame = droppable.frame;

  if (!frame) {
    return null;
  }

  var scroll = getScroll({
    dragStartTime: dragStartTime,
    container: frame.pageMarginBox,
    subject: subject,
    center: center,
    shouldUseTimeDampening: shouldUseTimeDampening
  });
  return scroll && canScrollDroppable(droppable, scroll) ? scroll : null;
});

var scroll$1 = (function (_ref) {
  var state = _ref.state,
      dragStartTime = _ref.dragStartTime,
      shouldUseTimeDampening = _ref.shouldUseTimeDampening,
      scrollWindow = _ref.scrollWindow,
      scrollDroppable = _ref.scrollDroppable;
  var center = state.current.page.borderBoxCenter;
  var draggable = state.dimensions.draggables[state.critical.draggable.id];
  var subject = draggable.page.marginBox;

  if (state.isWindowScrollAllowed) {
    var viewport = state.viewport;

    var _change = getWindowScrollChange({
      dragStartTime: dragStartTime,
      viewport: viewport,
      subject: subject,
      center: center,
      shouldUseTimeDampening: shouldUseTimeDampening
    });

    if (_change) {
      scrollWindow(_change);
      return;
    }
  }

  var droppable = getBestScrollableDroppable({
    center: center,
    destination: whatIsDraggedOver(state.impact),
    droppables: state.dimensions.droppables
  });

  if (!droppable) {
    return;
  }

  var change = getDroppableScrollChange({
    dragStartTime: dragStartTime,
    droppable: droppable,
    subject: subject,
    center: center,
    shouldUseTimeDampening: shouldUseTimeDampening
  });

  if (change) {
    scrollDroppable(droppable.descriptor.id, change);
  }
});

var createFluidScroller = (function (_ref) {
  var scrollWindow = _ref.scrollWindow,
      scrollDroppable = _ref.scrollDroppable;
  var scheduleWindowScroll = rafSchd$1(scrollWindow);
  var scheduleDroppableScroll = rafSchd$1(scrollDroppable);
  var dragging = null;

  var tryScroll = function tryScroll(state) {
    !dragging ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot fluid scroll if not dragging') : invariant(false) : void 0;
    var _dragging = dragging,
        shouldUseTimeDampening = _dragging.shouldUseTimeDampening,
        dragStartTime = _dragging.dragStartTime;
    scroll$1({
      state: state,
      scrollWindow: scheduleWindowScroll,
      scrollDroppable: scheduleDroppableScroll,
      dragStartTime: dragStartTime,
      shouldUseTimeDampening: shouldUseTimeDampening
    });
  };

  var start$1 = function start$1(state) {
    start();
    !!dragging ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot start auto scrolling when already started') : invariant(false) : void 0;
    var dragStartTime = Date.now();
    var wasScrollNeeded = false;

    var fakeScrollCallback = function fakeScrollCallback() {
      wasScrollNeeded = true;
    };

    scroll$1({
      state: state,
      dragStartTime: 0,
      shouldUseTimeDampening: false,
      scrollWindow: fakeScrollCallback,
      scrollDroppable: fakeScrollCallback
    });
    dragging = {
      dragStartTime: dragStartTime,
      shouldUseTimeDampening: wasScrollNeeded
    };
    finish();

    if (wasScrollNeeded) {
      tryScroll(state);
    }
  };

  var stop = function stop() {
    if (!dragging) {
      return;
    }

    scheduleWindowScroll.cancel();
    scheduleDroppableScroll.cancel();
    dragging = null;
  };

  return {
    start: start$1,
    stop: stop,
    scroll: tryScroll
  };
});

var createJumpScroller = (function (_ref) {
  var move = _ref.move,
      scrollDroppable = _ref.scrollDroppable,
      scrollWindow = _ref.scrollWindow;

  var moveByOffset = function moveByOffset(state, offset) {
    var client = add(state.current.client.selection, offset);
    move({
      client: client
    });
  };

  var scrollDroppableAsMuchAsItCan = function scrollDroppableAsMuchAsItCan(droppable, change) {
    if (!canScrollDroppable(droppable, change)) {
      return change;
    }

    var overlap = getDroppableOverlap(droppable, change);

    if (!overlap) {
      scrollDroppable(droppable.descriptor.id, change);
      return null;
    }

    var whatTheDroppableCanScroll = subtract(change, overlap);
    scrollDroppable(droppable.descriptor.id, whatTheDroppableCanScroll);
    var remainder = subtract(change, whatTheDroppableCanScroll);
    return remainder;
  };

  var scrollWindowAsMuchAsItCan = function scrollWindowAsMuchAsItCan(isWindowScrollAllowed, viewport, change) {
    if (!isWindowScrollAllowed) {
      return change;
    }

    if (!canScrollWindow(viewport, change)) {
      return change;
    }

    var overlap = getWindowOverlap(viewport, change);

    if (!overlap) {
      scrollWindow(change);
      return null;
    }

    var whatTheWindowCanScroll = subtract(change, overlap);
    scrollWindow(whatTheWindowCanScroll);
    var remainder = subtract(change, whatTheWindowCanScroll);
    return remainder;
  };

  var jumpScroller = function jumpScroller(state) {
    var request = state.scrollJumpRequest;

    if (!request) {
      return;
    }

    var destination = whatIsDraggedOver(state.impact);
    !destination ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot perform a jump scroll when there is no destination') : invariant(false) : void 0;
    var droppableRemainder = scrollDroppableAsMuchAsItCan(state.dimensions.droppables[destination], request);

    if (!droppableRemainder) {
      return;
    }

    var viewport = state.viewport;
    var windowRemainder = scrollWindowAsMuchAsItCan(state.isWindowScrollAllowed, viewport, droppableRemainder);

    if (!windowRemainder) {
      return;
    }

    moveByOffset(state, windowRemainder);
  };

  return jumpScroller;
});

var createAutoScroller = (function (_ref) {
  var scrollDroppable = _ref.scrollDroppable,
      scrollWindow = _ref.scrollWindow,
      move = _ref.move;
  var fluidScroller = createFluidScroller({
    scrollWindow: scrollWindow,
    scrollDroppable: scrollDroppable
  });
  var jumpScroll = createJumpScroller({
    move: move,
    scrollWindow: scrollWindow,
    scrollDroppable: scrollDroppable
  });

  var scroll = function scroll(state) {
    if (state.phase !== 'DRAGGING') {
      return;
    }

    if (state.movementMode === 'FLUID') {
      fluidScroller.scroll(state);
      return;
    }

    if (!state.scrollJumpRequest) {
      return;
    }

    jumpScroll(state);
  };

  var scroller = {
    scroll: scroll,
    start: fluidScroller.start,
    stop: fluidScroller.stop
  };
  return scroller;
});

var prefix$1 = 'data-rbd';
var dragHandle = function () {
  var base = prefix$1 + "-drag-handle";
  return {
    base: base,
    draggableId: base + "-draggable-id",
    contextId: base + "-context-id"
  };
}();
var draggable = function () {
  var base = prefix$1 + "-draggable";
  return {
    base: base,
    contextId: base + "-context-id",
    id: base + "-id"
  };
}();
var droppable = function () {
  var base = prefix$1 + "-droppable";
  return {
    base: base,
    contextId: base + "-context-id",
    id: base + "-id"
  };
}();
var scrollContainer = {
  contextId: prefix$1 + "-scroll-container-context-id"
};

var makeGetSelector = function makeGetSelector(context) {
  return function (attribute) {
    return "[" + attribute + "=\"" + context + "\"]";
  };
};

var getStyles = function getStyles(rules, property) {
  return rules.map(function (rule) {
    var value = rule.styles[property];

    if (!value) {
      return '';
    }

    return rule.selector + " { " + value + " }";
  }).join(' ');
};

var noPointerEvents = 'pointer-events: none;';
var getStyles$1 = (function (contextId) {
  var getSelector = makeGetSelector(contextId);

  var dragHandle$1 = function () {
    var grabCursor = "\n      cursor: -webkit-grab;\n      cursor: grab;\n    ";
    return {
      selector: getSelector(dragHandle.contextId),
      styles: {
        always: "\n          -webkit-touch-callout: none;\n          -webkit-tap-highlight-color: rgba(0,0,0,0);\n          touch-action: manipulation;\n        ",
        resting: grabCursor,
        dragging: noPointerEvents,
        dropAnimating: grabCursor
      }
    };
  }();

  var draggable$1 = function () {
    var transition = "\n      transition: " + transitions.outOfTheWay + ";\n    ";
    return {
      selector: getSelector(draggable.contextId),
      styles: {
        dragging: transition,
        dropAnimating: transition,
        userCancel: transition
      }
    };
  }();

  var droppable$1 = {
    selector: getSelector(droppable.contextId),
    styles: {
      always: "overflow-anchor: none;"
    }
  };
  var body = {
    selector: 'body',
    styles: {
      dragging: "\n        cursor: grabbing;\n        cursor: -webkit-grabbing;\n        user-select: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        overflow-anchor: none;\n      "
    }
  };
  var rules = [draggable$1, dragHandle$1, droppable$1, body];
  return {
    always: getStyles(rules, 'always'),
    resting: getStyles(rules, 'resting'),
    dragging: getStyles(rules, 'dragging'),
    dropAnimating: getStyles(rules, 'dropAnimating'),
    userCancel: getStyles(rules, 'userCancel')
  };
});

var useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? useLayoutEffect : useEffect;

var getHead = function getHead() {
  var head = document.querySelector('head');
  !head ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot find the head to append a style to') : invariant(false) : void 0;
  return head;
};

var createStyleEl = function createStyleEl(nonce) {
  var el = document.createElement('style');

  if (nonce) {
    el.setAttribute('nonce', nonce);
  }

  el.type = 'text/css';
  return el;
};

function useStyleMarshal(contextId, nonce) {
  var styles = useMemo(function () {
    return getStyles$1(contextId);
  }, [contextId]);
  var alwaysRef = useRef(null);
  var dynamicRef = useRef(null);
  var setDynamicStyle = useCallback(memoizeOne(function (proposed) {
    var el = dynamicRef.current;
    !el ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot set dynamic style element if it is not set') : invariant(false) : void 0;
    el.textContent = proposed;
  }), []);
  var setAlwaysStyle = useCallback(function (proposed) {
    var el = alwaysRef.current;
    !el ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot set dynamic style element if it is not set') : invariant(false) : void 0;
    el.textContent = proposed;
  }, []);
  useIsomorphicLayoutEffect(function () {
    !(!alwaysRef.current && !dynamicRef.current) ? process.env.NODE_ENV !== "production" ? invariant(false, 'style elements already mounted') : invariant(false) : void 0;
    var always = createStyleEl(nonce);
    var dynamic = createStyleEl(nonce);
    alwaysRef.current = always;
    dynamicRef.current = dynamic;
    always.setAttribute(prefix$1 + "-always", contextId);
    dynamic.setAttribute(prefix$1 + "-dynamic", contextId);
    getHead().appendChild(always);
    getHead().appendChild(dynamic);
    setAlwaysStyle(styles.always);
    setDynamicStyle(styles.resting);
    return function () {
      var remove = function remove(ref) {
        var current = ref.current;
        !current ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot unmount ref as it is not set') : invariant(false) : void 0;
        getHead().removeChild(current);
        ref.current = null;
      };

      remove(alwaysRef);
      remove(dynamicRef);
    };
  }, [nonce, setAlwaysStyle, setDynamicStyle, styles.always, styles.resting, contextId]);
  var dragging = useCallback(function () {
    return setDynamicStyle(styles.dragging);
  }, [setDynamicStyle, styles.dragging]);
  var dropping = useCallback(function (reason) {
    if (reason === 'DROP') {
      setDynamicStyle(styles.dropAnimating);
      return;
    }

    setDynamicStyle(styles.userCancel);
  }, [setDynamicStyle, styles.dropAnimating, styles.userCancel]);
  var resting = useCallback(function () {
    if (!dynamicRef.current) {
      return;
    }

    setDynamicStyle(styles.resting);
  }, [setDynamicStyle, styles.resting]);
  var marshal = useMemo(function () {
    return {
      dragging: dragging,
      dropping: dropping,
      resting: resting
    };
  }, [dragging, dropping, resting]);
  return marshal;
}

var getWindowFromEl = (function (el) {
  return el && el.ownerDocument ? el.ownerDocument.defaultView : window;
});

function isHtmlElement(el) {
  return el instanceof getWindowFromEl(el).HTMLElement;
}

function findDragHandle(contextId, draggableId) {
  var selector = "[" + dragHandle.contextId + "=\"" + contextId + "\"]";
  var possible = toArray(document.querySelectorAll(selector));

  if (!possible.length) {
    process.env.NODE_ENV !== "production" ? warning("Unable to find any drag handles in the context \"" + contextId + "\"") : void 0;
    return null;
  }

  var handle = find(possible, function (el) {
    return el.getAttribute(dragHandle.draggableId) === draggableId;
  });

  if (!handle) {
    process.env.NODE_ENV !== "production" ? warning("Unable to find drag handle with id \"" + draggableId + "\" as no handle with a matching id was found") : void 0;
    return null;
  }

  if (!isHtmlElement(handle)) {
    process.env.NODE_ENV !== "production" ? warning('drag handle needs to be a HTMLElement') : void 0;
    return null;
  }

  return handle;
}

function useFocusMarshal(contextId) {
  var entriesRef = useRef({});
  var recordRef = useRef(null);
  var restoreFocusFrameRef = useRef(null);
  var isMountedRef = useRef(false);
  var register = useCallback(function register(id, focus) {
    var entry = {
      id: id,
      focus: focus
    };
    entriesRef.current[id] = entry;
    return function unregister() {
      var entries = entriesRef.current;
      var current = entries[id];

      if (current !== entry) {
        delete entries[id];
      }
    };
  }, []);
  var tryGiveFocus = useCallback(function tryGiveFocus(tryGiveFocusTo) {
    var handle = findDragHandle(contextId, tryGiveFocusTo);

    if (handle && handle !== document.activeElement) {
      handle.focus();
    }
  }, [contextId]);
  var tryShiftRecord = useCallback(function tryShiftRecord(previous, redirectTo) {
    if (recordRef.current === previous) {
      recordRef.current = redirectTo;
    }
  }, []);
  var tryRestoreFocusRecorded = useCallback(function tryRestoreFocusRecorded() {
    if (restoreFocusFrameRef.current) {
      return;
    }

    if (!isMountedRef.current) {
      return;
    }

    restoreFocusFrameRef.current = requestAnimationFrame(function () {
      restoreFocusFrameRef.current = null;
      var record = recordRef.current;

      if (record) {
        tryGiveFocus(record);
      }
    });
  }, [tryGiveFocus]);
  var tryRecordFocus = useCallback(function tryRecordFocus(id) {
    recordRef.current = null;
    var focused = document.activeElement;

    if (!focused) {
      return;
    }

    if (focused.getAttribute(dragHandle.draggableId) !== id) {
      return;
    }

    recordRef.current = id;
  }, []);
  useIsomorphicLayoutEffect(function () {
    isMountedRef.current = true;
    return function clearFrameOnUnmount() {
      isMountedRef.current = false;
      var frameId = restoreFocusFrameRef.current;

      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);
  var marshal = useMemo(function () {
    return {
      register: register,
      tryRecordFocus: tryRecordFocus,
      tryRestoreFocusRecorded: tryRestoreFocusRecorded,
      tryShiftRecord: tryShiftRecord
    };
  }, [register, tryRecordFocus, tryRestoreFocusRecorded, tryShiftRecord]);
  return marshal;
}

function createRegistry() {
  var entries = {
    draggables: {},
    droppables: {}
  };
  var subscribers = [];

  function subscribe(cb) {
    subscribers.push(cb);
    return function unsubscribe() {
      var index = subscribers.indexOf(cb);

      if (index === -1) {
        return;
      }

      subscribers.splice(index, 1);
    };
  }

  function notify(event) {
    if (subscribers.length) {
      subscribers.forEach(function (cb) {
        return cb(event);
      });
    }
  }

  function findDraggableById(id) {
    return entries.draggables[id] || null;
  }

  function getDraggableById(id) {
    var entry = findDraggableById(id);
    !entry ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot find draggable entry with id [" + id + "]") : invariant(false) : void 0;
    return entry;
  }

  var draggableAPI = {
    register: function register(entry) {
      entries.draggables[entry.descriptor.id] = entry;
      notify({
        type: 'ADDITION',
        value: entry
      });
    },
    update: function update(entry, last) {
      var current = entries.draggables[last.descriptor.id];

      if (!current) {
        return;
      }

      if (current.uniqueId !== entry.uniqueId) {
        return;
      }

      delete entries.draggables[last.descriptor.id];
      entries.draggables[entry.descriptor.id] = entry;
    },
    unregister: function unregister(entry) {
      var draggableId = entry.descriptor.id;
      var current = findDraggableById(draggableId);

      if (!current) {
        return;
      }

      if (entry.uniqueId !== current.uniqueId) {
        return;
      }

      delete entries.draggables[draggableId];
      notify({
        type: 'REMOVAL',
        value: entry
      });
    },
    getById: getDraggableById,
    findById: findDraggableById,
    exists: function exists(id) {
      return Boolean(findDraggableById(id));
    },
    getAllByType: function getAllByType(type) {
      return values(entries.draggables).filter(function (entry) {
        return entry.descriptor.type === type;
      });
    }
  };

  function findDroppableById(id) {
    return entries.droppables[id] || null;
  }

  function getDroppableById(id) {
    var entry = findDroppableById(id);
    !entry ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot find droppable entry with id [" + id + "]") : invariant(false) : void 0;
    return entry;
  }

  var droppableAPI = {
    register: function register(entry) {
      entries.droppables[entry.descriptor.id] = entry;
    },
    unregister: function unregister(entry) {
      var current = findDroppableById(entry.descriptor.id);

      if (!current) {
        return;
      }

      if (entry.uniqueId !== current.uniqueId) {
        return;
      }

      delete entries.droppables[entry.descriptor.id];
    },
    getById: getDroppableById,
    findById: findDroppableById,
    exists: function exists(id) {
      return Boolean(findDroppableById(id));
    },
    getAllByType: function getAllByType(type) {
      return values(entries.droppables).filter(function (entry) {
        return entry.descriptor.type === type;
      });
    }
  };

  function clean() {
    entries.draggables = {};
    entries.droppables = {};
    subscribers.length = 0;
  }

  return {
    draggable: draggableAPI,
    droppable: droppableAPI,
    subscribe: subscribe,
    clean: clean
  };
}

function useRegistry() {
  var registry = useMemo(createRegistry, []);
  useEffect(function () {
    return function unmount() {
      requestAnimationFrame(registry.clean);
    };
  }, [registry]);
  return registry;
}

var StoreContext = React.createContext(null);

var getBodyElement = (function () {
  var body = document.body;
  !body ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot find document.body') : invariant(false) : void 0;
  return body;
});

var visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: '0',
  padding: '0',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  'clip-path': 'inset(100%)'
};

var getId = function getId(contextId) {
  return "rbd-announcement-" + contextId;
};
function useAnnouncer(contextId) {
  var id = useMemo(function () {
    return getId(contextId);
  }, [contextId]);
  var ref = useRef(null);
  useEffect(function setup() {
    var el = document.createElement('div');
    ref.current = el;
    el.id = id;
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('aria-atomic', 'true');

    _extends(el.style, visuallyHidden);

    getBodyElement().appendChild(el);
    return function cleanup() {
      setTimeout(function remove() {
        var body = getBodyElement();

        if (body.contains(el)) {
          body.removeChild(el);
        }

        if (el === ref.current) {
          ref.current = null;
        }
      });
    };
  }, [id]);
  var announce = useCallback(function (message) {
    var el = ref.current;

    if (el) {
      el.textContent = message;
      return;
    }

    process.env.NODE_ENV !== "production" ? warning("\n      A screen reader message was trying to be announced but it was unable to do so.\n      This can occur if you unmount your <DragDropContext /> in your onDragEnd.\n      Consider calling provided.announce() before the unmount so that the instruction will\n      not be lost for users relying on a screen reader.\n\n      Message not passed to screen reader:\n\n      \"" + message + "\"\n    ") : void 0;
  }, []);
  return announce;
}

var count = 0;
var defaults = {
  separator: '::'
};
function useUniqueId(prefix, options) {
  if (options === void 0) {
    options = defaults;
  }

  return useMemo(function () {
    return "" + prefix + options.separator + count++;
  }, [options.separator, prefix]);
}

function getElementId(_ref) {
  var contextId = _ref.contextId,
      uniqueId = _ref.uniqueId;
  return "rbd-hidden-text-" + contextId + "-" + uniqueId;
}
function useHiddenTextElement(_ref2) {
  var contextId = _ref2.contextId,
      text = _ref2.text;
  var uniqueId = useUniqueId('hidden-text', {
    separator: '-'
  });
  var id = useMemo(function () {
    return getElementId({
      contextId: contextId,
      uniqueId: uniqueId
    });
  }, [uniqueId, contextId]);
  useEffect(function mount() {
    var el = document.createElement('div');
    el.id = id;
    el.textContent = text;
    el.style.display = 'none';
    getBodyElement().appendChild(el);
    return function unmount() {
      var body = getBodyElement();

      if (body.contains(el)) {
        body.removeChild(el);
      }
    };
  }, [id, text]);
  return id;
}

var AppContext = React.createContext(null);

var peerDependencies = {
	react: "^16.8.5 || ^17.0.0 || ^18.0.0",
	"react-dom": "^16.8.5 || ^17.0.0 || ^18.0.0"
};

var semver = /(\d+)\.(\d+)\.(\d+)/;

var getVersion = function getVersion(value) {
  var result = semver.exec(value);
  !(result != null) ? process.env.NODE_ENV !== "production" ? invariant(false, "Unable to parse React version " + value) : invariant(false) : void 0;
  var major = Number(result[1]);
  var minor = Number(result[2]);
  var patch = Number(result[3]);
  return {
    major: major,
    minor: minor,
    patch: patch,
    raw: value
  };
};

var isSatisfied = function isSatisfied(expected, actual) {
  if (actual.major > expected.major) {
    return true;
  }

  if (actual.major < expected.major) {
    return false;
  }

  if (actual.minor > expected.minor) {
    return true;
  }

  if (actual.minor < expected.minor) {
    return false;
  }

  return actual.patch >= expected.patch;
};

var checkReactVersion = (function (peerDepValue, actualValue) {
  var peerDep = getVersion(peerDepValue);
  var actual = getVersion(actualValue);

  if (isSatisfied(peerDep, actual)) {
    return;
  }

  process.env.NODE_ENV !== "production" ? warning("\n    React version: [" + actual.raw + "]\n    does not satisfy expected peer dependency version: [" + peerDep.raw + "]\n\n    This can result in run time bugs, and even fatal crashes\n  ") : void 0;
});

var suffix = "\n  We expect a html5 doctype: <!doctype html>\n  This is to ensure consistent browser layout and measurement\n\n  More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/doctype.md\n";
var checkDoctype = (function (doc) {
  var doctype = doc.doctype;

  if (!doctype) {
    process.env.NODE_ENV !== "production" ? warning("\n      No <!doctype html> found.\n\n      " + suffix + "\n    ") : void 0;
    return;
  }

  if (doctype.name.toLowerCase() !== 'html') {
    process.env.NODE_ENV !== "production" ? warning("\n      Unexpected <!doctype> found: (" + doctype.name + ")\n\n      " + suffix + "\n    ") : void 0;
  }

  if (doctype.publicId !== '') {
    process.env.NODE_ENV !== "production" ? warning("\n      Unexpected <!doctype> publicId found: (" + doctype.publicId + ")\n      A html5 doctype does not have a publicId\n\n      " + suffix + "\n    ") : void 0;
  }
});

function useDev(useHook) {
  if (process.env.NODE_ENV !== 'production') {
    useHook();
  }
}

function useDevSetupWarning(fn, inputs) {
  useDev(function () {
    useEffect(function () {
      try {
        fn();
      } catch (e) {
        error("\n          A setup problem was encountered.\n\n          > " + e.message + "\n        ");
      }
    }, inputs);
  });
}

function useStartupValidation() {
  useDevSetupWarning(function () {
    checkReactVersion(peerDependencies.react, React.version);
    checkDoctype(document);
  }, []);
}

function usePrevious(current) {
  var ref = useRef(current);
  useEffect(function () {
    ref.current = current;
  });
  return ref;
}

function create() {
  var lock = null;

  function isClaimed() {
    return Boolean(lock);
  }

  function isActive(value) {
    return value === lock;
  }

  function claim(abandon) {
    !!lock ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot claim lock as it is already claimed') : invariant(false) : void 0;
    var newLock = {
      abandon: abandon
    };
    lock = newLock;
    return newLock;
  }

  function release() {
    !lock ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot release lock when there is no lock') : invariant(false) : void 0;
    lock = null;
  }

  function tryAbandon() {
    if (lock) {
      lock.abandon();
      release();
    }
  }

  return {
    isClaimed: isClaimed,
    isActive: isActive,
    claim: claim,
    release: release,
    tryAbandon: tryAbandon
  };
}

var tab = 9;
var enter = 13;
var escape = 27;
var space = 32;
var pageUp = 33;
var pageDown = 34;
var end = 35;
var home = 36;
var arrowLeft = 37;
var arrowUp = 38;
var arrowRight = 39;
var arrowDown = 40;

var _preventedKeys;
var preventedKeys = (_preventedKeys = {}, _preventedKeys[enter] = true, _preventedKeys[tab] = true, _preventedKeys);
var preventStandardKeyEvents = (function (event) {
  if (preventedKeys[event.keyCode]) {
    event.preventDefault();
  }
});

var supportedEventName = function () {
  var base = 'visibilitychange';

  if (typeof document === 'undefined') {
    return base;
  }

  var candidates = [base, "ms" + base, "webkit" + base, "moz" + base, "o" + base];
  var supported = find(candidates, function (eventName) {
    return "on" + eventName in document;
  });
  return supported || base;
}();

var primaryButton = 0;
var sloppyClickThreshold = 5;

function isSloppyClickThresholdExceeded(original, current) {
  return Math.abs(current.x - original.x) >= sloppyClickThreshold || Math.abs(current.y - original.y) >= sloppyClickThreshold;
}

var idle$1 = {
  type: 'IDLE'
};

function getCaptureBindings(_ref) {
  var cancel = _ref.cancel,
      completed = _ref.completed,
      getPhase = _ref.getPhase,
      setPhase = _ref.setPhase;
  return [{
    eventName: 'mousemove',
    fn: function fn(event) {
      var button = event.button,
          clientX = event.clientX,
          clientY = event.clientY;

      if (button !== primaryButton) {
        return;
      }

      var point = {
        x: clientX,
        y: clientY
      };
      var phase = getPhase();

      if (phase.type === 'DRAGGING') {
        event.preventDefault();
        phase.actions.move(point);
        return;
      }

      !(phase.type === 'PENDING') ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot be IDLE') : invariant(false) : void 0;
      var pending = phase.point;

      if (!isSloppyClickThresholdExceeded(pending, point)) {
        return;
      }

      event.preventDefault();
      var actions = phase.actions.fluidLift(point);
      setPhase({
        type: 'DRAGGING',
        actions: actions
      });
    }
  }, {
    eventName: 'mouseup',
    fn: function fn(event) {
      var phase = getPhase();

      if (phase.type !== 'DRAGGING') {
        cancel();
        return;
      }

      event.preventDefault();
      phase.actions.drop({
        shouldBlockNextClick: true
      });
      completed();
    }
  }, {
    eventName: 'mousedown',
    fn: function fn(event) {
      if (getPhase().type === 'DRAGGING') {
        event.preventDefault();
      }

      cancel();
    }
  }, {
    eventName: 'keydown',
    fn: function fn(event) {
      var phase = getPhase();

      if (phase.type === 'PENDING') {
        cancel();
        return;
      }

      if (event.keyCode === escape) {
        event.preventDefault();
        cancel();
        return;
      }

      preventStandardKeyEvents(event);
    }
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'scroll',
    options: {
      passive: true,
      capture: false
    },
    fn: function fn() {
      if (getPhase().type === 'PENDING') {
        cancel();
      }
    }
  }, {
    eventName: 'webkitmouseforcedown',
    fn: function fn(event) {
      var phase = getPhase();
      !(phase.type !== 'IDLE') ? process.env.NODE_ENV !== "production" ? invariant(false, 'Unexpected phase') : invariant(false) : void 0;

      if (phase.actions.shouldRespectForcePress()) {
        cancel();
        return;
      }

      event.preventDefault();
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}

function useMouseSensor(api) {
  var phaseRef = useRef(idle$1);
  var unbindEventsRef = useRef(noop);
  var startCaptureBinding = useMemo(function () {
    return {
      eventName: 'mousedown',
      fn: function onMouseDown(event) {
        if (event.defaultPrevented) {
          return;
        }

        if (event.button !== primaryButton) {
          return;
        }

        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
          return;
        }

        var draggableId = api.findClosestDraggableId(event);

        if (!draggableId) {
          return;
        }

        var actions = api.tryGetLock(draggableId, stop, {
          sourceEvent: event
        });

        if (!actions) {
          return;
        }

        event.preventDefault();
        var point = {
          x: event.clientX,
          y: event.clientY
        };
        unbindEventsRef.current();
        startPendingDrag(actions, point);
      }
    };
  }, [api]);
  var preventForcePressBinding = useMemo(function () {
    return {
      eventName: 'webkitmouseforcewillbegin',
      fn: function fn(event) {
        if (event.defaultPrevented) {
          return;
        }

        var id = api.findClosestDraggableId(event);

        if (!id) {
          return;
        }

        var options = api.findOptionsForDraggable(id);

        if (!options) {
          return;
        }

        if (options.shouldRespectForcePress) {
          return;
        }

        if (!api.canGetLock(id)) {
          return;
        }

        event.preventDefault();
      }
    };
  }, [api]);
  var listenForCapture = useCallback(function listenForCapture() {
    var options = {
      passive: false,
      capture: true
    };
    unbindEventsRef.current = bindEvents(window, [preventForcePressBinding, startCaptureBinding], options);
  }, [preventForcePressBinding, startCaptureBinding]);
  var stop = useCallback(function () {
    var current = phaseRef.current;

    if (current.type === 'IDLE') {
      return;
    }

    phaseRef.current = idle$1;
    unbindEventsRef.current();
    listenForCapture();
  }, [listenForCapture]);
  var cancel = useCallback(function () {
    var phase = phaseRef.current;
    stop();

    if (phase.type === 'DRAGGING') {
      phase.actions.cancel({
        shouldBlockNextClick: true
      });
    }

    if (phase.type === 'PENDING') {
      phase.actions.abort();
    }
  }, [stop]);
  var bindCapturingEvents = useCallback(function bindCapturingEvents() {
    var options = {
      capture: true,
      passive: false
    };
    var bindings = getCaptureBindings({
      cancel: cancel,
      completed: stop,
      getPhase: function getPhase() {
        return phaseRef.current;
      },
      setPhase: function setPhase(phase) {
        phaseRef.current = phase;
      }
    });
    unbindEventsRef.current = bindEvents(window, bindings, options);
  }, [cancel, stop]);
  var startPendingDrag = useCallback(function startPendingDrag(actions, point) {
    !(phaseRef.current.type === 'IDLE') ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected to move from IDLE to PENDING drag') : invariant(false) : void 0;
    phaseRef.current = {
      type: 'PENDING',
      point: point,
      actions: actions
    };
    bindCapturingEvents();
  }, [bindCapturingEvents]);
  useIsomorphicLayoutEffect(function mount() {
    listenForCapture();
    return function unmount() {
      unbindEventsRef.current();
    };
  }, [listenForCapture]);
}

var _scrollJumpKeys;

function noop$1() {}

var scrollJumpKeys = (_scrollJumpKeys = {}, _scrollJumpKeys[pageDown] = true, _scrollJumpKeys[pageUp] = true, _scrollJumpKeys[home] = true, _scrollJumpKeys[end] = true, _scrollJumpKeys);

function getDraggingBindings(actions, stop) {
  function cancel() {
    stop();
    actions.cancel();
  }

  function drop() {
    stop();
    actions.drop();
  }

  return [{
    eventName: 'keydown',
    fn: function fn(event) {
      if (event.keyCode === escape) {
        event.preventDefault();
        cancel();
        return;
      }

      if (event.keyCode === space) {
        event.preventDefault();
        drop();
        return;
      }

      if (event.keyCode === arrowDown) {
        event.preventDefault();
        actions.moveDown();
        return;
      }

      if (event.keyCode === arrowUp) {
        event.preventDefault();
        actions.moveUp();
        return;
      }

      if (event.keyCode === arrowRight) {
        event.preventDefault();
        actions.moveRight();
        return;
      }

      if (event.keyCode === arrowLeft) {
        event.preventDefault();
        actions.moveLeft();
        return;
      }

      if (scrollJumpKeys[event.keyCode]) {
        event.preventDefault();
        return;
      }

      preventStandardKeyEvents(event);
    }
  }, {
    eventName: 'mousedown',
    fn: cancel
  }, {
    eventName: 'mouseup',
    fn: cancel
  }, {
    eventName: 'click',
    fn: cancel
  }, {
    eventName: 'touchstart',
    fn: cancel
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'wheel',
    fn: cancel,
    options: {
      passive: true
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}

function useKeyboardSensor(api) {
  var unbindEventsRef = useRef(noop$1);
  var startCaptureBinding = useMemo(function () {
    return {
      eventName: 'keydown',
      fn: function onKeyDown(event) {
        if (event.defaultPrevented) {
          return;
        }

        if (event.keyCode !== space) {
          return;
        }

        var draggableId = api.findClosestDraggableId(event);

        if (!draggableId) {
          return;
        }

        var preDrag = api.tryGetLock(draggableId, stop, {
          sourceEvent: event
        });

        if (!preDrag) {
          return;
        }

        event.preventDefault();
        var isCapturing = true;
        var actions = preDrag.snapLift();
        unbindEventsRef.current();

        function stop() {
          !isCapturing ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot stop capturing a keyboard drag when not capturing') : invariant(false) : void 0;
          isCapturing = false;
          unbindEventsRef.current();
          listenForCapture();
        }

        unbindEventsRef.current = bindEvents(window, getDraggingBindings(actions, stop), {
          capture: true,
          passive: false
        });
      }
    };
  }, [api]);
  var listenForCapture = useCallback(function tryStartCapture() {
    var options = {
      passive: false,
      capture: true
    };
    unbindEventsRef.current = bindEvents(window, [startCaptureBinding], options);
  }, [startCaptureBinding]);
  useIsomorphicLayoutEffect(function mount() {
    listenForCapture();
    return function unmount() {
      unbindEventsRef.current();
    };
  }, [listenForCapture]);
}

var idle$2 = {
  type: 'IDLE'
};
var timeForLongPress = 120;
var forcePressThreshold = 0.15;

function getWindowBindings(_ref) {
  var cancel = _ref.cancel,
      getPhase = _ref.getPhase;
  return [{
    eventName: 'orientationchange',
    fn: cancel
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'contextmenu',
    fn: function fn(event) {
      event.preventDefault();
    }
  }, {
    eventName: 'keydown',
    fn: function fn(event) {
      if (getPhase().type !== 'DRAGGING') {
        cancel();
        return;
      }

      if (event.keyCode === escape) {
        event.preventDefault();
      }

      cancel();
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}

function getHandleBindings(_ref2) {
  var cancel = _ref2.cancel,
      completed = _ref2.completed,
      getPhase = _ref2.getPhase;
  return [{
    eventName: 'touchmove',
    options: {
      capture: false
    },
    fn: function fn(event) {
      var phase = getPhase();

      if (phase.type !== 'DRAGGING') {
        cancel();
        return;
      }

      phase.hasMoved = true;
      var _event$touches$ = event.touches[0],
          clientX = _event$touches$.clientX,
          clientY = _event$touches$.clientY;
      var point = {
        x: clientX,
        y: clientY
      };
      event.preventDefault();
      phase.actions.move(point);
    }
  }, {
    eventName: 'touchend',
    fn: function fn(event) {
      var phase = getPhase();

      if (phase.type !== 'DRAGGING') {
        cancel();
        return;
      }

      event.preventDefault();
      phase.actions.drop({
        shouldBlockNextClick: true
      });
      completed();
    }
  }, {
    eventName: 'touchcancel',
    fn: function fn(event) {
      if (getPhase().type !== 'DRAGGING') {
        cancel();
        return;
      }

      event.preventDefault();
      cancel();
    }
  }, {
    eventName: 'touchforcechange',
    fn: function fn(event) {
      var phase = getPhase();
      !(phase.type !== 'IDLE') ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
      var touch = event.touches[0];

      if (!touch) {
        return;
      }

      var isForcePress = touch.force >= forcePressThreshold;

      if (!isForcePress) {
        return;
      }

      var shouldRespect = phase.actions.shouldRespectForcePress();

      if (phase.type === 'PENDING') {
        if (shouldRespect) {
          cancel();
        }

        return;
      }

      if (shouldRespect) {
        if (phase.hasMoved) {
          event.preventDefault();
          return;
        }

        cancel();
        return;
      }

      event.preventDefault();
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}

function useTouchSensor(api) {
  var phaseRef = useRef(idle$2);
  var unbindEventsRef = useRef(noop);
  var getPhase = useCallback(function getPhase() {
    return phaseRef.current;
  }, []);
  var setPhase = useCallback(function setPhase(phase) {
    phaseRef.current = phase;
  }, []);
  var startCaptureBinding = useMemo(function () {
    return {
      eventName: 'touchstart',
      fn: function onTouchStart(event) {
        if (event.defaultPrevented) {
          return;
        }

        var draggableId = api.findClosestDraggableId(event);

        if (!draggableId) {
          return;
        }

        var actions = api.tryGetLock(draggableId, stop, {
          sourceEvent: event
        });

        if (!actions) {
          return;
        }

        var touch = event.touches[0];
        var clientX = touch.clientX,
            clientY = touch.clientY;
        var point = {
          x: clientX,
          y: clientY
        };
        unbindEventsRef.current();
        startPendingDrag(actions, point);
      }
    };
  }, [api]);
  var listenForCapture = useCallback(function listenForCapture() {
    var options = {
      capture: true,
      passive: false
    };
    unbindEventsRef.current = bindEvents(window, [startCaptureBinding], options);
  }, [startCaptureBinding]);
  var stop = useCallback(function () {
    var current = phaseRef.current;

    if (current.type === 'IDLE') {
      return;
    }

    if (current.type === 'PENDING') {
      clearTimeout(current.longPressTimerId);
    }

    setPhase(idle$2);
    unbindEventsRef.current();
    listenForCapture();
  }, [listenForCapture, setPhase]);
  var cancel = useCallback(function () {
    var phase = phaseRef.current;
    stop();

    if (phase.type === 'DRAGGING') {
      phase.actions.cancel({
        shouldBlockNextClick: true
      });
    }

    if (phase.type === 'PENDING') {
      phase.actions.abort();
    }
  }, [stop]);
  var bindCapturingEvents = useCallback(function bindCapturingEvents() {
    var options = {
      capture: true,
      passive: false
    };
    var args = {
      cancel: cancel,
      completed: stop,
      getPhase: getPhase
    };
    var unbindTarget = bindEvents(window, getHandleBindings(args), options);
    var unbindWindow = bindEvents(window, getWindowBindings(args), options);

    unbindEventsRef.current = function unbindAll() {
      unbindTarget();
      unbindWindow();
    };
  }, [cancel, getPhase, stop]);
  var startDragging = useCallback(function startDragging() {
    var phase = getPhase();
    !(phase.type === 'PENDING') ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot start dragging from phase " + phase.type) : invariant(false) : void 0;
    var actions = phase.actions.fluidLift(phase.point);
    setPhase({
      type: 'DRAGGING',
      actions: actions,
      hasMoved: false
    });
  }, [getPhase, setPhase]);
  var startPendingDrag = useCallback(function startPendingDrag(actions, point) {
    !(getPhase().type === 'IDLE') ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected to move from IDLE to PENDING drag') : invariant(false) : void 0;
    var longPressTimerId = setTimeout(startDragging, timeForLongPress);
    setPhase({
      type: 'PENDING',
      point: point,
      actions: actions,
      longPressTimerId: longPressTimerId
    });
    bindCapturingEvents();
  }, [bindCapturingEvents, getPhase, setPhase, startDragging]);
  useIsomorphicLayoutEffect(function mount() {
    listenForCapture();
    return function unmount() {
      unbindEventsRef.current();
      var phase = getPhase();

      if (phase.type === 'PENDING') {
        clearTimeout(phase.longPressTimerId);
        setPhase(idle$2);
      }
    };
  }, [getPhase, listenForCapture, setPhase]);
  useIsomorphicLayoutEffect(function webkitHack() {
    var unbind = bindEvents(window, [{
      eventName: 'touchmove',
      fn: function fn() {},
      options: {
        capture: false,
        passive: false
      }
    }]);
    return unbind;
  }, []);
}

function useValidateSensorHooks(sensorHooks) {
  useDev(function () {
    var previousRef = usePrevious(sensorHooks);
    useDevSetupWarning(function () {
      !(previousRef.current.length === sensorHooks.length) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot change the amount of sensor hooks after mounting') : invariant(false) : void 0;
    });
  });
}

var interactiveTagNames = {
  input: true,
  button: true,
  textarea: true,
  select: true,
  option: true,
  optgroup: true,
  video: true,
  audio: true
};

function isAnInteractiveElement(parent, current) {
  if (current == null) {
    return false;
  }

  var hasAnInteractiveTag = Boolean(interactiveTagNames[current.tagName.toLowerCase()]);

  if (hasAnInteractiveTag) {
    return true;
  }

  var attribute = current.getAttribute('contenteditable');

  if (attribute === 'true' || attribute === '') {
    return true;
  }

  if (current === parent) {
    return false;
  }

  return isAnInteractiveElement(parent, current.parentElement);
}

function isEventInInteractiveElement(draggable, event) {
  var target = event.target;

  if (!isHtmlElement(target)) {
    return false;
  }

  return isAnInteractiveElement(draggable, target);
}

var getBorderBoxCenterPosition = (function (el) {
  return getRect(el.getBoundingClientRect()).center;
});

function isElement(el) {
  return el instanceof getWindowFromEl(el).Element;
}

var supportedMatchesName = function () {
  var base = 'matches';

  if (typeof document === 'undefined') {
    return base;
  }

  var candidates = [base, 'msMatchesSelector', 'webkitMatchesSelector'];
  var value = find(candidates, function (name) {
    return name in Element.prototype;
  });
  return value || base;
}();

function closestPonyfill(el, selector) {
  if (el == null) {
    return null;
  }

  if (el[supportedMatchesName](selector)) {
    return el;
  }

  return closestPonyfill(el.parentElement, selector);
}

function closest$1(el, selector) {
  if (el.closest) {
    return el.closest(selector);
  }

  return closestPonyfill(el, selector);
}

function getSelector(contextId) {
  return "[" + dragHandle.contextId + "=\"" + contextId + "\"]";
}

function findClosestDragHandleFromEvent(contextId, event) {
  var target = event.target;

  if (!isElement(target)) {
    process.env.NODE_ENV !== "production" ? warning('event.target must be a Element') : void 0;
    return null;
  }

  var selector = getSelector(contextId);
  var handle = closest$1(target, selector);

  if (!handle) {
    return null;
  }

  if (!isHtmlElement(handle)) {
    process.env.NODE_ENV !== "production" ? warning('drag handle must be a HTMLElement') : void 0;
    return null;
  }

  return handle;
}

function tryGetClosestDraggableIdFromEvent(contextId, event) {
  var handle = findClosestDragHandleFromEvent(contextId, event);

  if (!handle) {
    return null;
  }

  return handle.getAttribute(dragHandle.draggableId);
}

function findDraggable(contextId, draggableId) {
  var selector = "[" + draggable.contextId + "=\"" + contextId + "\"]";
  var possible = toArray(document.querySelectorAll(selector));
  var draggable$1 = find(possible, function (el) {
    return el.getAttribute(draggable.id) === draggableId;
  });

  if (!draggable$1) {
    return null;
  }

  if (!isHtmlElement(draggable$1)) {
    process.env.NODE_ENV !== "production" ? warning('Draggable element is not a HTMLElement') : void 0;
    return null;
  }

  return draggable$1;
}

function preventDefault(event) {
  event.preventDefault();
}

function _isActive(_ref) {
  var expected = _ref.expected,
      phase = _ref.phase,
      isLockActive = _ref.isLockActive,
      shouldWarn = _ref.shouldWarn;

  if (!isLockActive()) {
    if (shouldWarn) {
      process.env.NODE_ENV !== "production" ? warning("\n        Cannot perform action.\n        The sensor no longer has an action lock.\n\n        Tips:\n\n        - Throw away your action handlers when forceStop() is called\n        - Check actions.isActive() if you really need to\n      ") : void 0;
    }

    return false;
  }

  if (expected !== phase) {
    if (shouldWarn) {
      process.env.NODE_ENV !== "production" ? warning("\n        Cannot perform action.\n        The actions you used belong to an outdated phase\n\n        Current phase: " + expected + "\n        You called an action from outdated phase: " + phase + "\n\n        Tips:\n\n        - Do not use preDragActions actions after calling preDragActions.lift()\n      ") : void 0;
    }

    return false;
  }

  return true;
}

function canStart(_ref2) {
  var lockAPI = _ref2.lockAPI,
      store = _ref2.store,
      registry = _ref2.registry,
      draggableId = _ref2.draggableId;

  if (lockAPI.isClaimed()) {
    return false;
  }

  var entry = registry.draggable.findById(draggableId);

  if (!entry) {
    process.env.NODE_ENV !== "production" ? warning("Unable to find draggable with id: " + draggableId) : void 0;
    return false;
  }

  if (!entry.options.isEnabled) {
    return false;
  }

  if (!canStartDrag(store.getState(), draggableId)) {
    return false;
  }

  return true;
}

function tryStart(_ref3) {
  var lockAPI = _ref3.lockAPI,
      contextId = _ref3.contextId,
      store = _ref3.store,
      registry = _ref3.registry,
      draggableId = _ref3.draggableId,
      forceSensorStop = _ref3.forceSensorStop,
      sourceEvent = _ref3.sourceEvent;
  var shouldStart = canStart({
    lockAPI: lockAPI,
    store: store,
    registry: registry,
    draggableId: draggableId
  });

  if (!shouldStart) {
    return null;
  }

  var entry = registry.draggable.getById(draggableId);
  var el = findDraggable(contextId, entry.descriptor.id);

  if (!el) {
    process.env.NODE_ENV !== "production" ? warning("Unable to find draggable element with id: " + draggableId) : void 0;
    return null;
  }

  if (sourceEvent && !entry.options.canDragInteractiveElements && isEventInInteractiveElement(el, sourceEvent)) {
    return null;
  }

  var lock = lockAPI.claim(forceSensorStop || noop);
  var phase = 'PRE_DRAG';

  function getShouldRespectForcePress() {
    return entry.options.shouldRespectForcePress;
  }

  function isLockActive() {
    return lockAPI.isActive(lock);
  }

  function tryDispatch(expected, getAction) {
    if (_isActive({
      expected: expected,
      phase: phase,
      isLockActive: isLockActive,
      shouldWarn: true
    })) {
      store.dispatch(getAction());
    }
  }

  var tryDispatchWhenDragging = tryDispatch.bind(null, 'DRAGGING');

  function lift$1(args) {
    function completed() {
      lockAPI.release();
      phase = 'COMPLETED';
    }

    if (phase !== 'PRE_DRAG') {
      completed();
      !(phase === 'PRE_DRAG') ? process.env.NODE_ENV !== "production" ? invariant(false, "Cannot lift in phase " + phase) : invariant(false) : void 0;
    }

    store.dispatch(lift(args.liftActionArgs));
    phase = 'DRAGGING';

    function finish(reason, options) {
      if (options === void 0) {
        options = {
          shouldBlockNextClick: false
        };
      }

      args.cleanup();

      if (options.shouldBlockNextClick) {
        var unbind = bindEvents(window, [{
          eventName: 'click',
          fn: preventDefault,
          options: {
            once: true,
            passive: false,
            capture: true
          }
        }]);
        setTimeout(unbind);
      }

      completed();
      store.dispatch(drop({
        reason: reason
      }));
    }

    return _extends({
      isActive: function isActive() {
        return _isActive({
          expected: 'DRAGGING',
          phase: phase,
          isLockActive: isLockActive,
          shouldWarn: false
        });
      },
      shouldRespectForcePress: getShouldRespectForcePress,
      drop: function drop(options) {
        return finish('DROP', options);
      },
      cancel: function cancel(options) {
        return finish('CANCEL', options);
      }
    }, args.actions);
  }

  function fluidLift(clientSelection) {
    var move$1 = rafSchd$1(function (client) {
      tryDispatchWhenDragging(function () {
        return move({
          client: client
        });
      });
    });
    var api = lift$1({
      liftActionArgs: {
        id: draggableId,
        clientSelection: clientSelection,
        movementMode: 'FLUID'
      },
      cleanup: function cleanup() {
        return move$1.cancel();
      },
      actions: {
        move: move$1
      }
    });
    return _extends({}, api, {
      move: move$1
    });
  }

  function snapLift() {
    var actions = {
      moveUp: function moveUp$1() {
        return tryDispatchWhenDragging(moveUp);
      },
      moveRight: function moveRight$1() {
        return tryDispatchWhenDragging(moveRight);
      },
      moveDown: function moveDown$1() {
        return tryDispatchWhenDragging(moveDown);
      },
      moveLeft: function moveLeft$1() {
        return tryDispatchWhenDragging(moveLeft);
      }
    };
    return lift$1({
      liftActionArgs: {
        id: draggableId,
        clientSelection: getBorderBoxCenterPosition(el),
        movementMode: 'SNAP'
      },
      cleanup: noop,
      actions: actions
    });
  }

  function abortPreDrag() {
    var shouldRelease = _isActive({
      expected: 'PRE_DRAG',
      phase: phase,
      isLockActive: isLockActive,
      shouldWarn: true
    });

    if (shouldRelease) {
      lockAPI.release();
    }
  }

  var preDrag = {
    isActive: function isActive() {
      return _isActive({
        expected: 'PRE_DRAG',
        phase: phase,
        isLockActive: isLockActive,
        shouldWarn: false
      });
    },
    shouldRespectForcePress: getShouldRespectForcePress,
    fluidLift: fluidLift,
    snapLift: snapLift,
    abort: abortPreDrag
  };
  return preDrag;
}

var defaultSensors = [useMouseSensor, useKeyboardSensor, useTouchSensor];
function useSensorMarshal(_ref4) {
  var contextId = _ref4.contextId,
      store = _ref4.store,
      registry = _ref4.registry,
      customSensors = _ref4.customSensors,
      enableDefaultSensors = _ref4.enableDefaultSensors;
  var useSensors = [].concat(enableDefaultSensors ? defaultSensors : [], customSensors || []);
  var lockAPI = useState(function () {
    return create();
  })[0];
  var tryAbandonLock = useCallback(function tryAbandonLock(previous, current) {
    if (previous.isDragging && !current.isDragging) {
      lockAPI.tryAbandon();
    }
  }, [lockAPI]);
  useIsomorphicLayoutEffect(function listenToStore() {
    var previous = store.getState();
    var unsubscribe = store.subscribe(function () {
      var current = store.getState();
      tryAbandonLock(previous, current);
      previous = current;
    });
    return unsubscribe;
  }, [lockAPI, store, tryAbandonLock]);
  useIsomorphicLayoutEffect(function () {
    return lockAPI.tryAbandon;
  }, [lockAPI.tryAbandon]);
  var canGetLock = useCallback(function (draggableId) {
    return canStart({
      lockAPI: lockAPI,
      registry: registry,
      store: store,
      draggableId: draggableId
    });
  }, [lockAPI, registry, store]);
  var tryGetLock = useCallback(function (draggableId, forceStop, options) {
    return tryStart({
      lockAPI: lockAPI,
      registry: registry,
      contextId: contextId,
      store: store,
      draggableId: draggableId,
      forceSensorStop: forceStop,
      sourceEvent: options && options.sourceEvent ? options.sourceEvent : null
    });
  }, [contextId, lockAPI, registry, store]);
  var findClosestDraggableId = useCallback(function (event) {
    return tryGetClosestDraggableIdFromEvent(contextId, event);
  }, [contextId]);
  var findOptionsForDraggable = useCallback(function (id) {
    var entry = registry.draggable.findById(id);
    return entry ? entry.options : null;
  }, [registry.draggable]);
  var tryReleaseLock = useCallback(function tryReleaseLock() {
    if (!lockAPI.isClaimed()) {
      return;
    }

    lockAPI.tryAbandon();

    if (store.getState().phase !== 'IDLE') {
      store.dispatch(flush());
    }
  }, [lockAPI, store]);
  var isLockClaimed = useCallback(lockAPI.isClaimed, [lockAPI]);
  var api = useMemo(function () {
    return {
      canGetLock: canGetLock,
      tryGetLock: tryGetLock,
      findClosestDraggableId: findClosestDraggableId,
      findOptionsForDraggable: findOptionsForDraggable,
      tryReleaseLock: tryReleaseLock,
      isLockClaimed: isLockClaimed
    };
  }, [canGetLock, tryGetLock, findClosestDraggableId, findOptionsForDraggable, tryReleaseLock, isLockClaimed]);
  useValidateSensorHooks(useSensors);

  for (var i = 0; i < useSensors.length; i++) {
    useSensors[i](api);
  }
}

var createResponders = function createResponders(props) {
  return {
    onBeforeCapture: props.onBeforeCapture,
    onBeforeDragStart: props.onBeforeDragStart,
    onDragStart: props.onDragStart,
    onDragEnd: props.onDragEnd,
    onDragUpdate: props.onDragUpdate
  };
};

function getStore(lazyRef) {
  !lazyRef.current ? process.env.NODE_ENV !== "production" ? invariant(false, 'Could not find store from lazy ref') : invariant(false) : void 0;
  return lazyRef.current;
}

function App(props) {
  var contextId = props.contextId,
      setCallbacks = props.setCallbacks,
      sensors = props.sensors,
      nonce = props.nonce,
      dragHandleUsageInstructions = props.dragHandleUsageInstructions;
  var lazyStoreRef = useRef(null);
  useStartupValidation();
  var lastPropsRef = usePrevious(props);
  var getResponders = useCallback(function () {
    return createResponders(lastPropsRef.current);
  }, [lastPropsRef]);
  var announce = useAnnouncer(contextId);
  var dragHandleUsageInstructionsId = useHiddenTextElement({
    contextId: contextId,
    text: dragHandleUsageInstructions
  });
  var styleMarshal = useStyleMarshal(contextId, nonce);
  var lazyDispatch = useCallback(function (action) {
    getStore(lazyStoreRef).dispatch(action);
  }, []);
  var marshalCallbacks = useMemo(function () {
    return bindActionCreators({
      publishWhileDragging: publishWhileDragging,
      updateDroppableScroll: updateDroppableScroll,
      updateDroppableIsEnabled: updateDroppableIsEnabled,
      updateDroppableIsCombineEnabled: updateDroppableIsCombineEnabled,
      collectionStarting: collectionStarting
    }, lazyDispatch);
  }, [lazyDispatch]);
  var registry = useRegistry();
  var dimensionMarshal = useMemo(function () {
    return createDimensionMarshal(registry, marshalCallbacks);
  }, [registry, marshalCallbacks]);
  var autoScroller = useMemo(function () {
    return createAutoScroller(_extends({
      scrollWindow: scrollWindow,
      scrollDroppable: dimensionMarshal.scrollDroppable
    }, bindActionCreators({
      move: move
    }, lazyDispatch)));
  }, [dimensionMarshal.scrollDroppable, lazyDispatch]);
  var focusMarshal = useFocusMarshal(contextId);
  var store = useMemo(function () {
    return createStore({
      announce: announce,
      autoScroller: autoScroller,
      dimensionMarshal: dimensionMarshal,
      focusMarshal: focusMarshal,
      getResponders: getResponders,
      styleMarshal: styleMarshal
    });
  }, [announce, autoScroller, dimensionMarshal, focusMarshal, getResponders, styleMarshal]);

  if (process.env.NODE_ENV !== 'production') {
    if (lazyStoreRef.current && lazyStoreRef.current !== store) {
      process.env.NODE_ENV !== "production" ? warning('unexpected store change') : void 0;
    }
  }

  lazyStoreRef.current = store;
  var tryResetStore = useCallback(function () {
    var current = getStore(lazyStoreRef);
    var state = current.getState();

    if (state.phase !== 'IDLE') {
      current.dispatch(flush());
    }
  }, []);
  var isDragging = useCallback(function () {
    var state = getStore(lazyStoreRef).getState();
    return state.isDragging || state.phase === 'DROP_ANIMATING';
  }, []);
  var appCallbacks = useMemo(function () {
    return {
      isDragging: isDragging,
      tryAbort: tryResetStore
    };
  }, [isDragging, tryResetStore]);
  setCallbacks(appCallbacks);
  var getCanLift = useCallback(function (id) {
    return canStartDrag(getStore(lazyStoreRef).getState(), id);
  }, []);
  var getIsMovementAllowed = useCallback(function () {
    return isMovementAllowed(getStore(lazyStoreRef).getState());
  }, []);
  var appContext = useMemo(function () {
    return {
      marshal: dimensionMarshal,
      focus: focusMarshal,
      contextId: contextId,
      canLift: getCanLift,
      isMovementAllowed: getIsMovementAllowed,
      dragHandleUsageInstructionsId: dragHandleUsageInstructionsId,
      registry: registry
    };
  }, [contextId, dimensionMarshal, dragHandleUsageInstructionsId, focusMarshal, getCanLift, getIsMovementAllowed, registry]);
  useSensorMarshal({
    contextId: contextId,
    store: store,
    registry: registry,
    customSensors: sensors,
    enableDefaultSensors: props.enableDefaultSensors !== false
  });
  useEffect(function () {
    return tryResetStore;
  }, [tryResetStore]);
  return React.createElement(AppContext.Provider, {
    value: appContext
  }, React.createElement(Provider, {
    context: StoreContext,
    store: store
  }, props.children));
}

var count$1 = 0;
function useInstanceCount() {
  return useMemo(function () {
    return "" + count$1++;
  }, []);
}
function DragDropContext(props) {
  var contextId = useInstanceCount();
  var dragHandleUsageInstructions = props.dragHandleUsageInstructions || preset.dragHandleUsageInstructions;
  return React.createElement(ErrorBoundary, null, function (setCallbacks) {
    return React.createElement(App, {
      nonce: props.nonce,
      contextId: contextId,
      setCallbacks: setCallbacks,
      dragHandleUsageInstructions: dragHandleUsageInstructions,
      enableDefaultSensors: props.enableDefaultSensors,
      sensors: props.sensors,
      onBeforeCapture: props.onBeforeCapture,
      onBeforeDragStart: props.onBeforeDragStart,
      onDragStart: props.onDragStart,
      onDragUpdate: props.onDragUpdate,
      onDragEnd: props.onDragEnd
    }, props.children);
  });
}

var isEqual$1 = function isEqual(base) {
  return function (value) {
    return base === value;
  };
};

var isScroll = isEqual$1('scroll');
var isAuto = isEqual$1('auto');
var isVisible$1 = isEqual$1('visible');

var isEither = function isEither(overflow, fn) {
  return fn(overflow.overflowX) || fn(overflow.overflowY);
};

var isBoth = function isBoth(overflow, fn) {
  return fn(overflow.overflowX) && fn(overflow.overflowY);
};

var isElementScrollable = function isElementScrollable(el) {
  var style = window.getComputedStyle(el);
  var overflow = {
    overflowX: style.overflowX,
    overflowY: style.overflowY
  };
  return isEither(overflow, isScroll) || isEither(overflow, isAuto);
};

var isBodyScrollable = function isBodyScrollable() {
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  var body = getBodyElement();
  var html = document.documentElement;
  !html ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;

  if (!isElementScrollable(body)) {
    return false;
  }

  var htmlStyle = window.getComputedStyle(html);
  var htmlOverflow = {
    overflowX: htmlStyle.overflowX,
    overflowY: htmlStyle.overflowY
  };

  if (isBoth(htmlOverflow, isVisible$1)) {
    return false;
  }

  process.env.NODE_ENV !== "production" ? warning("\n    We have detected that your <body> element might be a scroll container.\n    We have found no reliable way of detecting whether the <body> element is a scroll container.\n    Under most circumstances a <body> scroll bar will be on the <html> element (document.documentElement)\n\n    Because we cannot determine if the <body> is a scroll container, and generally it is not one,\n    we will be treating the <body> as *not* a scroll container\n\n    More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/how-we-detect-scroll-containers.md\n  ") : void 0;
  return false;
};

var getClosestScrollable = function getClosestScrollable(el) {
  if (el == null) {
    return null;
  }

  if (el === document.body) {
    return isBodyScrollable() ? el : null;
  }

  if (el === document.documentElement) {
    return null;
  }

  if (!isElementScrollable(el)) {
    return getClosestScrollable(el.parentElement);
  }

  return el;
};

var checkForNestedScrollContainers = (function (scrollable) {
  if (!scrollable) {
    return;
  }

  var anotherScrollParent = getClosestScrollable(scrollable.parentElement);

  if (!anotherScrollParent) {
    return;
  }

  process.env.NODE_ENV !== "production" ? warning("\n    Droppable: unsupported nested scroll container detected.\n    A Droppable can only have one scroll parent (which can be itself)\n    Nested scroll containers are currently not supported.\n\n    We hope to support nested scroll containers soon: https://github.com/atlassian/react-beautiful-dnd/issues/131\n  ") : void 0;
});

var getScroll$1 = (function (el) {
  return {
    x: el.scrollLeft,
    y: el.scrollTop
  };
});

var getIsFixed = function getIsFixed(el) {
  if (!el) {
    return false;
  }

  var style = window.getComputedStyle(el);

  if (style.position === 'fixed') {
    return true;
  }

  return getIsFixed(el.parentElement);
};

var getEnv = (function (start) {
  var closestScrollable = getClosestScrollable(start);
  var isFixedOnPage = getIsFixed(start);
  return {
    closestScrollable: closestScrollable,
    isFixedOnPage: isFixedOnPage
  };
});

var getDroppableDimension = (function (_ref) {
  var descriptor = _ref.descriptor,
      isEnabled = _ref.isEnabled,
      isCombineEnabled = _ref.isCombineEnabled,
      isFixedOnPage = _ref.isFixedOnPage,
      direction = _ref.direction,
      client = _ref.client,
      page = _ref.page,
      closest = _ref.closest;

  var frame = function () {
    if (!closest) {
      return null;
    }

    var scrollSize = closest.scrollSize,
        frameClient = closest.client;
    var maxScroll = getMaxScroll({
      scrollHeight: scrollSize.scrollHeight,
      scrollWidth: scrollSize.scrollWidth,
      height: frameClient.paddingBox.height,
      width: frameClient.paddingBox.width
    });
    return {
      pageMarginBox: closest.page.marginBox,
      frameClient: frameClient,
      scrollSize: scrollSize,
      shouldClipSubject: closest.shouldClipSubject,
      scroll: {
        initial: closest.scroll,
        current: closest.scroll,
        max: maxScroll,
        diff: {
          value: origin,
          displacement: origin
        }
      }
    };
  }();

  var axis = direction === 'vertical' ? vertical : horizontal;
  var subject = getSubject({
    page: page,
    withPlaceholder: null,
    axis: axis,
    frame: frame
  });
  var dimension = {
    descriptor: descriptor,
    isCombineEnabled: isCombineEnabled,
    isFixedOnPage: isFixedOnPage,
    axis: axis,
    isEnabled: isEnabled,
    client: client,
    page: page,
    frame: frame,
    subject: subject
  };
  return dimension;
});

var getClient = function getClient(targetRef, closestScrollable) {
  var base = getBox(targetRef);

  if (!closestScrollable) {
    return base;
  }

  if (targetRef !== closestScrollable) {
    return base;
  }

  var top = base.paddingBox.top - closestScrollable.scrollTop;
  var left = base.paddingBox.left - closestScrollable.scrollLeft;
  var bottom = top + closestScrollable.scrollHeight;
  var right = left + closestScrollable.scrollWidth;
  var paddingBox = {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
  var borderBox = expand(paddingBox, base.border);
  var client = createBox({
    borderBox: borderBox,
    margin: base.margin,
    border: base.border,
    padding: base.padding
  });
  return client;
};

var getDimension = (function (_ref) {
  var ref = _ref.ref,
      descriptor = _ref.descriptor,
      env = _ref.env,
      windowScroll = _ref.windowScroll,
      direction = _ref.direction,
      isDropDisabled = _ref.isDropDisabled,
      isCombineEnabled = _ref.isCombineEnabled,
      shouldClipSubject = _ref.shouldClipSubject;
  var closestScrollable = env.closestScrollable;
  var client = getClient(ref, closestScrollable);
  var page = withScroll(client, windowScroll);

  var closest = function () {
    if (!closestScrollable) {
      return null;
    }

    var frameClient = getBox(closestScrollable);
    var scrollSize = {
      scrollHeight: closestScrollable.scrollHeight,
      scrollWidth: closestScrollable.scrollWidth
    };
    return {
      client: frameClient,
      page: withScroll(frameClient, windowScroll),
      scroll: getScroll$1(closestScrollable),
      scrollSize: scrollSize,
      shouldClipSubject: shouldClipSubject
    };
  }();

  var dimension = getDroppableDimension({
    descriptor: descriptor,
    isEnabled: !isDropDisabled,
    isCombineEnabled: isCombineEnabled,
    isFixedOnPage: env.isFixedOnPage,
    direction: direction,
    client: client,
    page: page,
    closest: closest
  });
  return dimension;
});

var immediate = {
  passive: false
};
var delayed = {
  passive: true
};
var getListenerOptions = (function (options) {
  return options.shouldPublishImmediately ? immediate : delayed;
});

function useRequiredContext(Context) {
  var result = useContext(Context);
  !result ? process.env.NODE_ENV !== "production" ? invariant(false, 'Could not find required context') : invariant(false) : void 0;
  return result;
}

var getClosestScrollableFromDrag = function getClosestScrollableFromDrag(dragging) {
  return dragging && dragging.env.closestScrollable || null;
};

function useDroppablePublisher(args) {
  var whileDraggingRef = useRef(null);
  var appContext = useRequiredContext(AppContext);
  var uniqueId = useUniqueId('droppable');
  var registry = appContext.registry,
      marshal = appContext.marshal;
  var previousRef = usePrevious(args);
  var descriptor = useMemo(function () {
    return {
      id: args.droppableId,
      type: args.type,
      mode: args.mode
    };
  }, [args.droppableId, args.mode, args.type]);
  var publishedDescriptorRef = useRef(descriptor);
  var memoizedUpdateScroll = useMemo(function () {
    return memoizeOne(function (x, y) {
      !whileDraggingRef.current ? process.env.NODE_ENV !== "production" ? invariant(false, 'Can only update scroll when dragging') : invariant(false) : void 0;
      var scroll = {
        x: x,
        y: y
      };
      marshal.updateDroppableScroll(descriptor.id, scroll);
    });
  }, [descriptor.id, marshal]);
  var getClosestScroll = useCallback(function () {
    var dragging = whileDraggingRef.current;

    if (!dragging || !dragging.env.closestScrollable) {
      return origin;
    }

    return getScroll$1(dragging.env.closestScrollable);
  }, []);
  var updateScroll = useCallback(function () {
    var scroll = getClosestScroll();
    memoizedUpdateScroll(scroll.x, scroll.y);
  }, [getClosestScroll, memoizedUpdateScroll]);
  var scheduleScrollUpdate = useMemo(function () {
    return rafSchd$1(updateScroll);
  }, [updateScroll]);
  var onClosestScroll = useCallback(function () {
    var dragging = whileDraggingRef.current;
    var closest = getClosestScrollableFromDrag(dragging);
    !(dragging && closest) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Could not find scroll options while scrolling') : invariant(false) : void 0;
    var options = dragging.scrollOptions;

    if (options.shouldPublishImmediately) {
      updateScroll();
      return;
    }

    scheduleScrollUpdate();
  }, [scheduleScrollUpdate, updateScroll]);
  var getDimensionAndWatchScroll = useCallback(function (windowScroll, options) {
    !!whileDraggingRef.current ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot collect a droppable while a drag is occurring') : invariant(false) : void 0;
    var previous = previousRef.current;
    var ref = previous.getDroppableRef();
    !ref ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot collect without a droppable ref') : invariant(false) : void 0;
    var env = getEnv(ref);
    var dragging = {
      ref: ref,
      descriptor: descriptor,
      env: env,
      scrollOptions: options
    };
    whileDraggingRef.current = dragging;
    var dimension = getDimension({
      ref: ref,
      descriptor: descriptor,
      env: env,
      windowScroll: windowScroll,
      direction: previous.direction,
      isDropDisabled: previous.isDropDisabled,
      isCombineEnabled: previous.isCombineEnabled,
      shouldClipSubject: !previous.ignoreContainerClipping
    });
    var scrollable = env.closestScrollable;

    if (scrollable) {
      scrollable.setAttribute(scrollContainer.contextId, appContext.contextId);
      scrollable.addEventListener('scroll', onClosestScroll, getListenerOptions(dragging.scrollOptions));

      if (process.env.NODE_ENV !== 'production') {
        checkForNestedScrollContainers(scrollable);
      }
    }

    return dimension;
  }, [appContext.contextId, descriptor, onClosestScroll, previousRef]);
  var getScrollWhileDragging = useCallback(function () {
    var dragging = whileDraggingRef.current;
    var closest = getClosestScrollableFromDrag(dragging);
    !(dragging && closest) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Can only recollect Droppable client for Droppables that have a scroll container') : invariant(false) : void 0;
    return getScroll$1(closest);
  }, []);
  var dragStopped = useCallback(function () {
    var dragging = whileDraggingRef.current;
    !dragging ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot stop drag when no active drag') : invariant(false) : void 0;
    var closest = getClosestScrollableFromDrag(dragging);
    whileDraggingRef.current = null;

    if (!closest) {
      return;
    }

    scheduleScrollUpdate.cancel();
    closest.removeAttribute(scrollContainer.contextId);
    closest.removeEventListener('scroll', onClosestScroll, getListenerOptions(dragging.scrollOptions));
  }, [onClosestScroll, scheduleScrollUpdate]);
  var scroll = useCallback(function (change) {
    var dragging = whileDraggingRef.current;
    !dragging ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot scroll when there is no drag') : invariant(false) : void 0;
    var closest = getClosestScrollableFromDrag(dragging);
    !closest ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot scroll a droppable with no closest scrollable') : invariant(false) : void 0;
    closest.scrollTop += change.y;
    closest.scrollLeft += change.x;
  }, []);
  var callbacks = useMemo(function () {
    return {
      getDimensionAndWatchScroll: getDimensionAndWatchScroll,
      getScrollWhileDragging: getScrollWhileDragging,
      dragStopped: dragStopped,
      scroll: scroll
    };
  }, [dragStopped, getDimensionAndWatchScroll, getScrollWhileDragging, scroll]);
  var entry = useMemo(function () {
    return {
      uniqueId: uniqueId,
      descriptor: descriptor,
      callbacks: callbacks
    };
  }, [callbacks, descriptor, uniqueId]);
  useIsomorphicLayoutEffect(function () {
    publishedDescriptorRef.current = entry.descriptor;
    registry.droppable.register(entry);
    return function () {
      if (whileDraggingRef.current) {
        process.env.NODE_ENV !== "production" ? warning('Unsupported: changing the droppableId or type of a Droppable during a drag') : void 0;
        dragStopped();
      }

      registry.droppable.unregister(entry);
    };
  }, [callbacks, descriptor, dragStopped, entry, marshal, registry.droppable]);
  useIsomorphicLayoutEffect(function () {
    if (!whileDraggingRef.current) {
      return;
    }

    marshal.updateDroppableIsEnabled(publishedDescriptorRef.current.id, !args.isDropDisabled);
  }, [args.isDropDisabled, marshal]);
  useIsomorphicLayoutEffect(function () {
    if (!whileDraggingRef.current) {
      return;
    }

    marshal.updateDroppableIsCombineEnabled(publishedDescriptorRef.current.id, args.isCombineEnabled);
  }, [args.isCombineEnabled, marshal]);
}

function noop$2() {}

var empty = {
  width: 0,
  height: 0,
  margin: noSpacing
};

var getSize = function getSize(_ref) {
  var isAnimatingOpenOnMount = _ref.isAnimatingOpenOnMount,
      placeholder = _ref.placeholder,
      animate = _ref.animate;

  if (isAnimatingOpenOnMount) {
    return empty;
  }

  if (animate === 'close') {
    return empty;
  }

  return {
    height: placeholder.client.borderBox.height,
    width: placeholder.client.borderBox.width,
    margin: placeholder.client.margin
  };
};

var getStyle = function getStyle(_ref2) {
  var isAnimatingOpenOnMount = _ref2.isAnimatingOpenOnMount,
      placeholder = _ref2.placeholder,
      animate = _ref2.animate;
  var size = getSize({
    isAnimatingOpenOnMount: isAnimatingOpenOnMount,
    placeholder: placeholder,
    animate: animate
  });
  return {
    display: placeholder.display,
    boxSizing: 'border-box',
    width: size.width,
    height: size.height,
    marginTop: size.margin.top,
    marginRight: size.margin.right,
    marginBottom: size.margin.bottom,
    marginLeft: size.margin.left,
    flexShrink: '0',
    flexGrow: '0',
    pointerEvents: 'none',
    transition: animate !== 'none' ? transitions.placeholder : null
  };
};

function Placeholder(props) {
  var animateOpenTimerRef = useRef(null);
  var tryClearAnimateOpenTimer = useCallback(function () {
    if (!animateOpenTimerRef.current) {
      return;
    }

    clearTimeout(animateOpenTimerRef.current);
    animateOpenTimerRef.current = null;
  }, []);
  var animate = props.animate,
      onTransitionEnd = props.onTransitionEnd,
      onClose = props.onClose,
      contextId = props.contextId;

  var _useState = useState(props.animate === 'open'),
      isAnimatingOpenOnMount = _useState[0],
      setIsAnimatingOpenOnMount = _useState[1];

  useEffect(function () {
    if (!isAnimatingOpenOnMount) {
      return noop$2;
    }

    if (animate !== 'open') {
      tryClearAnimateOpenTimer();
      setIsAnimatingOpenOnMount(false);
      return noop$2;
    }

    if (animateOpenTimerRef.current) {
      return noop$2;
    }

    animateOpenTimerRef.current = setTimeout(function () {
      animateOpenTimerRef.current = null;
      setIsAnimatingOpenOnMount(false);
    });
    return tryClearAnimateOpenTimer;
  }, [animate, isAnimatingOpenOnMount, tryClearAnimateOpenTimer]);
  var onSizeChangeEnd = useCallback(function (event) {
    if (event.propertyName !== 'height') {
      return;
    }

    onTransitionEnd();

    if (animate === 'close') {
      onClose();
    }
  }, [animate, onClose, onTransitionEnd]);
  var style = getStyle({
    isAnimatingOpenOnMount: isAnimatingOpenOnMount,
    animate: props.animate,
    placeholder: props.placeholder
  });
  return React.createElement(props.placeholder.tagName, {
    style: style,
    'data-rbd-placeholder-context-id': contextId,
    onTransitionEnd: onSizeChangeEnd,
    ref: props.innerRef
  });
}

var Placeholder$1 = React.memo(Placeholder);

var DroppableContext = React.createContext(null);

function checkIsValidInnerRef(el) {
  !(el && isHtmlElement(el)) ? process.env.NODE_ENV !== "production" ? invariant(false, "\n    provided.innerRef has not been provided with a HTMLElement.\n\n    You can find a guide on using the innerRef callback functions at:\n    https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/using-inner-ref.md\n  ") : invariant(false) : void 0;
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

function runChecks(args, checks) {
  checks.forEach(function (check) {
    return check(args);
  });
}

var shared = [function required(_ref) {
  var props = _ref.props;
  !props.droppableId ? process.env.NODE_ENV !== "production" ? invariant(false, 'A Droppable requires a droppableId prop') : invariant(false) : void 0;
  !(typeof props.droppableId === 'string') ? process.env.NODE_ENV !== "production" ? invariant(false, "A Droppable requires a [string] droppableId. Provided: [" + typeof props.droppableId + "]") : invariant(false) : void 0;
}, function _boolean(_ref2) {
  var props = _ref2.props;
  !isBoolean(props.isDropDisabled) ? process.env.NODE_ENV !== "production" ? invariant(false, 'isDropDisabled must be a boolean') : invariant(false) : void 0;
  !isBoolean(props.isCombineEnabled) ? process.env.NODE_ENV !== "production" ? invariant(false, 'isCombineEnabled must be a boolean') : invariant(false) : void 0;
  !isBoolean(props.ignoreContainerClipping) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ignoreContainerClipping must be a boolean') : invariant(false) : void 0;
}, function ref(_ref3) {
  var getDroppableRef = _ref3.getDroppableRef;
  checkIsValidInnerRef(getDroppableRef());
}];
var standard = [function placeholder(_ref4) {
  var props = _ref4.props,
      getPlaceholderRef = _ref4.getPlaceholderRef;

  if (!props.placeholder) {
    return;
  }

  var ref = getPlaceholderRef();

  if (ref) {
    return;
  }

  process.env.NODE_ENV !== "production" ? warning("\n      Droppable setup issue [droppableId: \"" + props.droppableId + "\"]:\n      DroppableProvided > placeholder could not be found.\n\n      Please be sure to add the {provided.placeholder} React Node as a child of your Droppable.\n      More information: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md\n    ") : void 0;
}];
var virtual = [function hasClone(_ref5) {
  var props = _ref5.props;
  !props.renderClone ? process.env.NODE_ENV !== "production" ? invariant(false, 'Must provide a clone render function (renderClone) for virtual lists') : invariant(false) : void 0;
}, function hasNoPlaceholder(_ref6) {
  var getPlaceholderRef = _ref6.getPlaceholderRef;
  !!getPlaceholderRef() ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected virtual list to not have a placeholder') : invariant(false) : void 0;
}];
function useValidation(args) {
  useDevSetupWarning(function () {
    runChecks(args, shared);

    if (args.props.mode === 'standard') {
      runChecks(args, standard);
    }

    if (args.props.mode === 'virtual') {
      runChecks(args, virtual);
    }
  });
}

var AnimateInOut = function (_React$PureComponent) {
  _inheritsLoose(AnimateInOut, _React$PureComponent);

  function AnimateInOut() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      isVisible: Boolean(_this.props.on),
      data: _this.props.on,
      animate: _this.props.shouldAnimate && _this.props.on ? 'open' : 'none'
    };

    _this.onClose = function () {
      if (_this.state.animate !== 'close') {
        return;
      }

      _this.setState({
        isVisible: false
      });
    };

    return _this;
  }

  AnimateInOut.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (!props.shouldAnimate) {
      return {
        isVisible: Boolean(props.on),
        data: props.on,
        animate: 'none'
      };
    }

    if (props.on) {
      return {
        isVisible: true,
        data: props.on,
        animate: 'open'
      };
    }

    if (state.isVisible) {
      return {
        isVisible: true,
        data: state.data,
        animate: 'close'
      };
    }

    return {
      isVisible: false,
      animate: 'close',
      data: null
    };
  };

  var _proto = AnimateInOut.prototype;

  _proto.render = function render() {
    if (!this.state.isVisible) {
      return null;
    }

    var provided = {
      onClose: this.onClose,
      data: this.state.data,
      animate: this.state.animate
    };
    return this.props.children(provided);
  };

  return AnimateInOut;
}(React.PureComponent);

var zIndexOptions = {
  dragging: 5000,
  dropAnimating: 4500
};

var getDraggingTransition = function getDraggingTransition(shouldAnimateDragMovement, dropping) {
  if (dropping) {
    return transitions.drop(dropping.duration);
  }

  if (shouldAnimateDragMovement) {
    return transitions.snap;
  }

  return transitions.fluid;
};

var getDraggingOpacity = function getDraggingOpacity(isCombining, isDropAnimating) {
  if (!isCombining) {
    return null;
  }

  return isDropAnimating ? combine.opacity.drop : combine.opacity.combining;
};

var getShouldDraggingAnimate = function getShouldDraggingAnimate(dragging) {
  if (dragging.forceShouldAnimate != null) {
    return dragging.forceShouldAnimate;
  }

  return dragging.mode === 'SNAP';
};

function getDraggingStyle(dragging) {
  var dimension = dragging.dimension;
  var box = dimension.client;
  var offset = dragging.offset,
      combineWith = dragging.combineWith,
      dropping = dragging.dropping;
  var isCombining = Boolean(combineWith);
  var shouldAnimate = getShouldDraggingAnimate(dragging);
  var isDropAnimating = Boolean(dropping);
  var transform = isDropAnimating ? transforms.drop(offset, isCombining) : transforms.moveTo(offset);
  var style = {
    position: 'fixed',
    top: box.marginBox.top,
    left: box.marginBox.left,
    boxSizing: 'border-box',
    width: box.borderBox.width,
    height: box.borderBox.height,
    transition: getDraggingTransition(shouldAnimate, dropping),
    transform: transform,
    opacity: getDraggingOpacity(isCombining, isDropAnimating),
    zIndex: isDropAnimating ? zIndexOptions.dropAnimating : zIndexOptions.dragging,
    pointerEvents: 'none'
  };
  return style;
}

function getSecondaryStyle(secondary) {
  return {
    transform: transforms.moveTo(secondary.offset),
    transition: secondary.shouldAnimateDisplacement ? null : 'none'
  };
}

function getStyle$1(mapped) {
  return mapped.type === 'DRAGGING' ? getDraggingStyle(mapped) : getSecondaryStyle(mapped);
}

function getDimension$1(descriptor, el, windowScroll) {
  if (windowScroll === void 0) {
    windowScroll = origin;
  }

  var computedStyles = window.getComputedStyle(el);
  var borderBox = el.getBoundingClientRect();
  var client = calculateBox(borderBox, computedStyles);
  var page = withScroll(client, windowScroll);
  var placeholder = {
    client: client,
    tagName: el.tagName.toLowerCase(),
    display: computedStyles.display
  };
  var displaceBy = {
    x: client.marginBox.width,
    y: client.marginBox.height
  };
  var dimension = {
    descriptor: descriptor,
    placeholder: placeholder,
    displaceBy: displaceBy,
    client: client,
    page: page
  };
  return dimension;
}

function useDraggablePublisher(args) {
  var uniqueId = useUniqueId('draggable');
  var descriptor = args.descriptor,
      registry = args.registry,
      getDraggableRef = args.getDraggableRef,
      canDragInteractiveElements = args.canDragInteractiveElements,
      shouldRespectForcePress = args.shouldRespectForcePress,
      isEnabled = args.isEnabled;
  var options = useMemo(function () {
    return {
      canDragInteractiveElements: canDragInteractiveElements,
      shouldRespectForcePress: shouldRespectForcePress,
      isEnabled: isEnabled
    };
  }, [canDragInteractiveElements, isEnabled, shouldRespectForcePress]);
  var getDimension = useCallback(function (windowScroll) {
    var el = getDraggableRef();
    !el ? process.env.NODE_ENV !== "production" ? invariant(false, 'Cannot get dimension when no ref is set') : invariant(false) : void 0;
    return getDimension$1(descriptor, el, windowScroll);
  }, [descriptor, getDraggableRef]);
  var entry = useMemo(function () {
    return {
      uniqueId: uniqueId,
      descriptor: descriptor,
      options: options,
      getDimension: getDimension
    };
  }, [descriptor, getDimension, options, uniqueId]);
  var publishedRef = useRef(entry);
  var isFirstPublishRef = useRef(true);
  useIsomorphicLayoutEffect(function () {
    registry.draggable.register(publishedRef.current);
    return function () {
      return registry.draggable.unregister(publishedRef.current);
    };
  }, [registry.draggable]);
  useIsomorphicLayoutEffect(function () {
    if (isFirstPublishRef.current) {
      isFirstPublishRef.current = false;
      return;
    }

    var last = publishedRef.current;
    publishedRef.current = entry;
    registry.draggable.update(entry, last);
  }, [entry, registry.draggable]);
}

function useValidation$1(props, contextId, getRef) {
  useDevSetupWarning(function () {
    function prefix(id) {
      return "Draggable[id: " + id + "]: ";
    }

    var id = props.draggableId;
    !id ? process.env.NODE_ENV !== "production" ? invariant(false, 'Draggable requires a draggableId') : invariant(false) : void 0;
    !(typeof id === 'string') ? process.env.NODE_ENV !== "production" ? invariant(false, "Draggable requires a [string] draggableId.\n      Provided: [type: " + typeof id + "] (value: " + id + ")") : invariant(false) : void 0;
    !isInteger(props.index) ? process.env.NODE_ENV !== "production" ? invariant(false, prefix(id) + " requires an integer index prop") : invariant(false) : void 0;

    if (props.mapped.type === 'DRAGGING') {
      return;
    }

    checkIsValidInnerRef(getRef());

    if (props.isEnabled) {
      !findDragHandle(contextId, id) ? process.env.NODE_ENV !== "production" ? invariant(false, prefix(id) + " Unable to find drag handle") : invariant(false) : void 0;
    }
  });
}
function useClonePropValidation(isClone) {
  useDev(function () {
    var initialRef = useRef(isClone);
    useDevSetupWarning(function () {
      !(isClone === initialRef.current) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Draggable isClone prop value changed during component life') : invariant(false) : void 0;
    }, [isClone]);
  });
}

function preventHtml5Dnd(event) {
  event.preventDefault();
}

function Draggable(props) {
  var ref = useRef(null);
  var setRef = useCallback(function (el) {
    ref.current = el;
  }, []);
  var getRef = useCallback(function () {
    return ref.current;
  }, []);

  var _useRequiredContext = useRequiredContext(AppContext),
      contextId = _useRequiredContext.contextId,
      dragHandleUsageInstructionsId = _useRequiredContext.dragHandleUsageInstructionsId,
      registry = _useRequiredContext.registry;

  var _useRequiredContext2 = useRequiredContext(DroppableContext),
      type = _useRequiredContext2.type,
      droppableId = _useRequiredContext2.droppableId;

  var descriptor = useMemo(function () {
    return {
      id: props.draggableId,
      index: props.index,
      type: type,
      droppableId: droppableId
    };
  }, [props.draggableId, props.index, type, droppableId]);
  var children = props.children,
      draggableId = props.draggableId,
      isEnabled = props.isEnabled,
      shouldRespectForcePress = props.shouldRespectForcePress,
      canDragInteractiveElements = props.canDragInteractiveElements,
      isClone = props.isClone,
      mapped = props.mapped,
      dropAnimationFinishedAction = props.dropAnimationFinished;
  useValidation$1(props, contextId, getRef);
  useClonePropValidation(isClone);

  if (!isClone) {
    var forPublisher = useMemo(function () {
      return {
        descriptor: descriptor,
        registry: registry,
        getDraggableRef: getRef,
        canDragInteractiveElements: canDragInteractiveElements,
        shouldRespectForcePress: shouldRespectForcePress,
        isEnabled: isEnabled
      };
    }, [descriptor, registry, getRef, canDragInteractiveElements, shouldRespectForcePress, isEnabled]);
    useDraggablePublisher(forPublisher);
  }

  var dragHandleProps = useMemo(function () {
    return isEnabled ? {
      tabIndex: 0,
      role: 'button',
      'aria-describedby': dragHandleUsageInstructionsId,
      'data-rbd-drag-handle-draggable-id': draggableId,
      'data-rbd-drag-handle-context-id': contextId,
      draggable: false,
      onDragStart: preventHtml5Dnd
    } : null;
  }, [contextId, dragHandleUsageInstructionsId, draggableId, isEnabled]);
  var onMoveEnd = useCallback(function (event) {
    if (mapped.type !== 'DRAGGING') {
      return;
    }

    if (!mapped.dropping) {
      return;
    }

    if (event.propertyName !== 'transform') {
      return;
    }

    dropAnimationFinishedAction();
  }, [dropAnimationFinishedAction, mapped]);
  var provided = useMemo(function () {
    var style = getStyle$1(mapped);
    var onTransitionEnd = mapped.type === 'DRAGGING' && mapped.dropping ? onMoveEnd : null;
    var result = {
      innerRef: setRef,
      draggableProps: {
        'data-rbd-draggable-context-id': contextId,
        'data-rbd-draggable-id': draggableId,
        style: style,
        onTransitionEnd: onTransitionEnd
      },
      dragHandleProps: dragHandleProps
    };
    return result;
  }, [contextId, dragHandleProps, draggableId, mapped, onMoveEnd, setRef]);
  var rubric = useMemo(function () {
    return {
      draggableId: descriptor.id,
      type: descriptor.type,
      source: {
        index: descriptor.index,
        droppableId: descriptor.droppableId
      }
    };
  }, [descriptor.droppableId, descriptor.id, descriptor.index, descriptor.type]);
  return children(provided, mapped.snapshot, rubric);
}

var isStrictEqual = (function (a, b) {
  return a === b;
});

var whatIsDraggedOverFromResult = (function (result) {
  var combine = result.combine,
      destination = result.destination;

  if (destination) {
    return destination.droppableId;
  }

  if (combine) {
    return combine.droppableId;
  }

  return null;
});

var getCombineWithFromResult = function getCombineWithFromResult(result) {
  return result.combine ? result.combine.draggableId : null;
};

var getCombineWithFromImpact = function getCombineWithFromImpact(impact) {
  return impact.at && impact.at.type === 'COMBINE' ? impact.at.combine.draggableId : null;
};

function getDraggableSelector() {
  var memoizedOffset = memoizeOne(function (x, y) {
    return {
      x: x,
      y: y
    };
  });
  var getMemoizedSnapshot = memoizeOne(function (mode, isClone, draggingOver, combineWith, dropping) {
    return {
      isDragging: true,
      isClone: isClone,
      isDropAnimating: Boolean(dropping),
      dropAnimation: dropping,
      mode: mode,
      draggingOver: draggingOver,
      combineWith: combineWith,
      combineTargetFor: null
    };
  });
  var getMemoizedProps = memoizeOne(function (offset, mode, dimension, isClone, draggingOver, combineWith, forceShouldAnimate) {
    return {
      mapped: {
        type: 'DRAGGING',
        dropping: null,
        draggingOver: draggingOver,
        combineWith: combineWith,
        mode: mode,
        offset: offset,
        dimension: dimension,
        forceShouldAnimate: forceShouldAnimate,
        snapshot: getMemoizedSnapshot(mode, isClone, draggingOver, combineWith, null)
      }
    };
  });

  var selector = function selector(state, ownProps) {
    if (state.isDragging) {
      if (state.critical.draggable.id !== ownProps.draggableId) {
        return null;
      }

      var offset = state.current.client.offset;
      var dimension = state.dimensions.draggables[ownProps.draggableId];
      var draggingOver = whatIsDraggedOver(state.impact);
      var combineWith = getCombineWithFromImpact(state.impact);
      var forceShouldAnimate = state.forceShouldAnimate;
      return getMemoizedProps(memoizedOffset(offset.x, offset.y), state.movementMode, dimension, ownProps.isClone, draggingOver, combineWith, forceShouldAnimate);
    }

    if (state.phase === 'DROP_ANIMATING') {
      var completed = state.completed;

      if (completed.result.draggableId !== ownProps.draggableId) {
        return null;
      }

      var isClone = ownProps.isClone;
      var _dimension = state.dimensions.draggables[ownProps.draggableId];
      var result = completed.result;
      var mode = result.mode;

      var _draggingOver = whatIsDraggedOverFromResult(result);

      var _combineWith = getCombineWithFromResult(result);

      var duration = state.dropDuration;
      var dropping = {
        duration: duration,
        curve: curves.drop,
        moveTo: state.newHomeClientOffset,
        opacity: _combineWith ? combine.opacity.drop : null,
        scale: _combineWith ? combine.scale.drop : null
      };
      return {
        mapped: {
          type: 'DRAGGING',
          offset: state.newHomeClientOffset,
          dimension: _dimension,
          dropping: dropping,
          draggingOver: _draggingOver,
          combineWith: _combineWith,
          mode: mode,
          forceShouldAnimate: null,
          snapshot: getMemoizedSnapshot(mode, isClone, _draggingOver, _combineWith, dropping)
        }
      };
    }

    return null;
  };

  return selector;
}

function getSecondarySnapshot(combineTargetFor) {
  return {
    isDragging: false,
    isDropAnimating: false,
    isClone: false,
    dropAnimation: null,
    mode: null,
    draggingOver: null,
    combineTargetFor: combineTargetFor,
    combineWith: null
  };
}

var atRest = {
  mapped: {
    type: 'SECONDARY',
    offset: origin,
    combineTargetFor: null,
    shouldAnimateDisplacement: true,
    snapshot: getSecondarySnapshot(null)
  }
};

function getSecondarySelector() {
  var memoizedOffset = memoizeOne(function (x, y) {
    return {
      x: x,
      y: y
    };
  });
  var getMemoizedSnapshot = memoizeOne(getSecondarySnapshot);
  var getMemoizedProps = memoizeOne(function (offset, combineTargetFor, shouldAnimateDisplacement) {
    if (combineTargetFor === void 0) {
      combineTargetFor = null;
    }

    return {
      mapped: {
        type: 'SECONDARY',
        offset: offset,
        combineTargetFor: combineTargetFor,
        shouldAnimateDisplacement: shouldAnimateDisplacement,
        snapshot: getMemoizedSnapshot(combineTargetFor)
      }
    };
  });

  var getFallback = function getFallback(combineTargetFor) {
    return combineTargetFor ? getMemoizedProps(origin, combineTargetFor, true) : null;
  };

  var getProps = function getProps(ownId, draggingId, impact, afterCritical) {
    var visualDisplacement = impact.displaced.visible[ownId];
    var isAfterCriticalInVirtualList = Boolean(afterCritical.inVirtualList && afterCritical.effected[ownId]);
    var combine = tryGetCombine(impact);
    var combineTargetFor = combine && combine.draggableId === ownId ? draggingId : null;

    if (!visualDisplacement) {
      if (!isAfterCriticalInVirtualList) {
        return getFallback(combineTargetFor);
      }

      if (impact.displaced.invisible[ownId]) {
        return null;
      }

      var change = negate(afterCritical.displacedBy.point);

      var _offset = memoizedOffset(change.x, change.y);

      return getMemoizedProps(_offset, combineTargetFor, true);
    }

    if (isAfterCriticalInVirtualList) {
      return getFallback(combineTargetFor);
    }

    var displaceBy = impact.displacedBy.point;
    var offset = memoizedOffset(displaceBy.x, displaceBy.y);
    return getMemoizedProps(offset, combineTargetFor, visualDisplacement.shouldAnimate);
  };

  var selector = function selector(state, ownProps) {
    if (state.isDragging) {
      if (state.critical.draggable.id === ownProps.draggableId) {
        return null;
      }

      return getProps(ownProps.draggableId, state.critical.draggable.id, state.impact, state.afterCritical);
    }

    if (state.phase === 'DROP_ANIMATING') {
      var completed = state.completed;

      if (completed.result.draggableId === ownProps.draggableId) {
        return null;
      }

      return getProps(ownProps.draggableId, completed.result.draggableId, completed.impact, completed.afterCritical);
    }

    return null;
  };

  return selector;
}

var makeMapStateToProps = function makeMapStateToProps() {
  var draggingSelector = getDraggableSelector();
  var secondarySelector = getSecondarySelector();

  var selector = function selector(state, ownProps) {
    return draggingSelector(state, ownProps) || secondarySelector(state, ownProps) || atRest;
  };

  return selector;
};
var mapDispatchToProps = {
  dropAnimationFinished: dropAnimationFinished
};
var ConnectedDraggable = connect(makeMapStateToProps, mapDispatchToProps, null, {
  context: StoreContext,
  pure: true,
  areStatePropsEqual: isStrictEqual
})(Draggable);

function PrivateDraggable(props) {
  var droppableContext = useRequiredContext(DroppableContext);
  var isUsingCloneFor = droppableContext.isUsingCloneFor;

  if (isUsingCloneFor === props.draggableId && !props.isClone) {
    return null;
  }

  return React.createElement(ConnectedDraggable, props);
}
function PublicDraggable(props) {
  var isEnabled = typeof props.isDragDisabled === 'boolean' ? !props.isDragDisabled : true;
  var canDragInteractiveElements = Boolean(props.disableInteractiveElementBlocking);
  var shouldRespectForcePress = Boolean(props.shouldRespectForcePress);
  return React.createElement(PrivateDraggable, _extends({}, props, {
    isClone: false,
    isEnabled: isEnabled,
    canDragInteractiveElements: canDragInteractiveElements,
    shouldRespectForcePress: shouldRespectForcePress
  }));
}

function Droppable(props) {
  var appContext = useContext(AppContext);
  !appContext ? process.env.NODE_ENV !== "production" ? invariant(false, 'Could not find app context') : invariant(false) : void 0;
  var contextId = appContext.contextId,
      isMovementAllowed = appContext.isMovementAllowed;
  var droppableRef = useRef(null);
  var placeholderRef = useRef(null);
  var children = props.children,
      droppableId = props.droppableId,
      type = props.type,
      mode = props.mode,
      direction = props.direction,
      ignoreContainerClipping = props.ignoreContainerClipping,
      isDropDisabled = props.isDropDisabled,
      isCombineEnabled = props.isCombineEnabled,
      snapshot = props.snapshot,
      useClone = props.useClone,
      updateViewportMaxScroll = props.updateViewportMaxScroll,
      getContainerForClone = props.getContainerForClone;
  var getDroppableRef = useCallback(function () {
    return droppableRef.current;
  }, []);
  var setDroppableRef = useCallback(function (value) {
    droppableRef.current = value;
  }, []);
  var getPlaceholderRef = useCallback(function () {
    return placeholderRef.current;
  }, []);
  var setPlaceholderRef = useCallback(function (value) {
    placeholderRef.current = value;
  }, []);
  useValidation({
    props: props,
    getDroppableRef: getDroppableRef,
    getPlaceholderRef: getPlaceholderRef
  });
  var onPlaceholderTransitionEnd = useCallback(function () {
    if (isMovementAllowed()) {
      updateViewportMaxScroll({
        maxScroll: getMaxWindowScroll()
      });
    }
  }, [isMovementAllowed, updateViewportMaxScroll]);
  useDroppablePublisher({
    droppableId: droppableId,
    type: type,
    mode: mode,
    direction: direction,
    isDropDisabled: isDropDisabled,
    isCombineEnabled: isCombineEnabled,
    ignoreContainerClipping: ignoreContainerClipping,
    getDroppableRef: getDroppableRef
  });
  var placeholder = React.createElement(AnimateInOut, {
    on: props.placeholder,
    shouldAnimate: props.shouldAnimatePlaceholder
  }, function (_ref) {
    var onClose = _ref.onClose,
        data = _ref.data,
        animate = _ref.animate;
    return React.createElement(Placeholder$1, {
      placeholder: data,
      onClose: onClose,
      innerRef: setPlaceholderRef,
      animate: animate,
      contextId: contextId,
      onTransitionEnd: onPlaceholderTransitionEnd
    });
  });
  var provided = useMemo(function () {
    return {
      innerRef: setDroppableRef,
      placeholder: placeholder,
      droppableProps: {
        'data-rbd-droppable-id': droppableId,
        'data-rbd-droppable-context-id': contextId
      }
    };
  }, [contextId, droppableId, placeholder, setDroppableRef]);
  var isUsingCloneFor = useClone ? useClone.dragging.draggableId : null;
  var droppableContext = useMemo(function () {
    return {
      droppableId: droppableId,
      type: type,
      isUsingCloneFor: isUsingCloneFor
    };
  }, [droppableId, isUsingCloneFor, type]);

  function getClone() {
    if (!useClone) {
      return null;
    }

    var dragging = useClone.dragging,
        render = useClone.render;
    var node = React.createElement(PrivateDraggable, {
      draggableId: dragging.draggableId,
      index: dragging.source.index,
      isClone: true,
      isEnabled: true,
      shouldRespectForcePress: false,
      canDragInteractiveElements: true
    }, function (draggableProvided, draggableSnapshot) {
      return render(draggableProvided, draggableSnapshot, dragging);
    });
    return ReactDOM.createPortal(node, getContainerForClone());
  }

  return React.createElement(DroppableContext.Provider, {
    value: droppableContext
  }, children(provided, snapshot), getClone());
}

var isMatchingType = function isMatchingType(type, critical) {
  return type === critical.droppable.type;
};

var getDraggable = function getDraggable(critical, dimensions) {
  return dimensions.draggables[critical.draggable.id];
};

var makeMapStateToProps$1 = function makeMapStateToProps() {
  var idleWithAnimation = {
    placeholder: null,
    shouldAnimatePlaceholder: true,
    snapshot: {
      isDraggingOver: false,
      draggingOverWith: null,
      draggingFromThisWith: null,
      isUsingPlaceholder: false
    },
    useClone: null
  };

  var idleWithoutAnimation = _extends({}, idleWithAnimation, {
    shouldAnimatePlaceholder: false
  });

  var getDraggableRubric = memoizeOne(function (descriptor) {
    return {
      draggableId: descriptor.id,
      type: descriptor.type,
      source: {
        index: descriptor.index,
        droppableId: descriptor.droppableId
      }
    };
  });
  var getMapProps = memoizeOne(function (id, isEnabled, isDraggingOverForConsumer, isDraggingOverForImpact, dragging, renderClone) {
    var draggableId = dragging.descriptor.id;
    var isHome = dragging.descriptor.droppableId === id;

    if (isHome) {
      var useClone = renderClone ? {
        render: renderClone,
        dragging: getDraggableRubric(dragging.descriptor)
      } : null;
      var _snapshot = {
        isDraggingOver: isDraggingOverForConsumer,
        draggingOverWith: isDraggingOverForConsumer ? draggableId : null,
        draggingFromThisWith: draggableId,
        isUsingPlaceholder: true
      };
      return {
        placeholder: dragging.placeholder,
        shouldAnimatePlaceholder: false,
        snapshot: _snapshot,
        useClone: useClone
      };
    }

    if (!isEnabled) {
      return idleWithoutAnimation;
    }

    if (!isDraggingOverForImpact) {
      return idleWithAnimation;
    }

    var snapshot = {
      isDraggingOver: isDraggingOverForConsumer,
      draggingOverWith: draggableId,
      draggingFromThisWith: null,
      isUsingPlaceholder: true
    };
    return {
      placeholder: dragging.placeholder,
      shouldAnimatePlaceholder: true,
      snapshot: snapshot,
      useClone: null
    };
  });

  var selector = function selector(state, ownProps) {
    var id = ownProps.droppableId;
    var type = ownProps.type;
    var isEnabled = !ownProps.isDropDisabled;
    var renderClone = ownProps.renderClone;

    if (state.isDragging) {
      var critical = state.critical;

      if (!isMatchingType(type, critical)) {
        return idleWithoutAnimation;
      }

      var dragging = getDraggable(critical, state.dimensions);
      var isDraggingOver = whatIsDraggedOver(state.impact) === id;
      return getMapProps(id, isEnabled, isDraggingOver, isDraggingOver, dragging, renderClone);
    }

    if (state.phase === 'DROP_ANIMATING') {
      var completed = state.completed;

      if (!isMatchingType(type, completed.critical)) {
        return idleWithoutAnimation;
      }

      var _dragging = getDraggable(completed.critical, state.dimensions);

      return getMapProps(id, isEnabled, whatIsDraggedOverFromResult(completed.result) === id, whatIsDraggedOver(completed.impact) === id, _dragging, renderClone);
    }

    if (state.phase === 'IDLE' && state.completed && !state.shouldFlush) {
      var _completed = state.completed;

      if (!isMatchingType(type, _completed.critical)) {
        return idleWithoutAnimation;
      }

      var wasOver = whatIsDraggedOver(_completed.impact) === id;
      var wasCombining = Boolean(_completed.impact.at && _completed.impact.at.type === 'COMBINE');
      var isHome = _completed.critical.droppable.id === id;

      if (wasOver) {
        return wasCombining ? idleWithAnimation : idleWithoutAnimation;
      }

      if (isHome) {
        return idleWithAnimation;
      }

      return idleWithoutAnimation;
    }

    return idleWithoutAnimation;
  };

  return selector;
};
var mapDispatchToProps$1 = {
  updateViewportMaxScroll: updateViewportMaxScroll
};

function getBody() {
  !document.body ? process.env.NODE_ENV !== "production" ? invariant(false, 'document.body is not ready') : invariant(false) : void 0;
  return document.body;
}

var defaultProps = {
  mode: 'standard',
  type: 'DEFAULT',
  direction: 'vertical',
  isDropDisabled: false,
  isCombineEnabled: false,
  ignoreContainerClipping: false,
  renderClone: null,
  getContainerForClone: getBody
};
var ConnectedDroppable = connect(makeMapStateToProps$1, mapDispatchToProps$1, null, {
  context: StoreContext,
  pure: true,
  areStatePropsEqual: isStrictEqual
})(Droppable);
ConnectedDroppable.defaultProps = defaultProps;

___$insertStyle(".ds-makersun-dozen-task-list-container {\n  display: flex;\n  flex-direction: column;\n}\n.ds-makersun-dozen-task-list-container > div {\n  margin-top: 1rem;\n}\n.ds-makersun-dozen-task-list-container > div.is-dragging {\n  position: absolute;\n}\n\n.order-number-relative {\n  position: absolute;\n}\n.order-number-relative .order-number-absolute {\n  position: absolute;\n  left: -30px;\n}");

const TaskList = ({ className = '', ariaLabel, tasks, state = 'complete-tasks', }) => {
    const [orderedTasks, setOrderedTasks] = useState(tasks);
    const refs = useRef({}).current;
    const [positionPerIndex, setPositionPerIndex] = useState([]);
    useEffect(() => {
        var _a;
        const newPositionPerIndex = (_a = orderedTasks === null || orderedTasks === void 0 ? void 0 : orderedTasks.map((task) => { var _a, _b; return ((_b = (_a = refs[task.id]) === null || _a === void 0 ? void 0 : _a.clientHeight) !== null && _b !== void 0 ? _b : 20) / 2 - 20; })) !== null && _a !== void 0 ? _a : [];
        setPositionPerIndex(newPositionPerIndex);
    }, [refs, orderedTasks]);
    const onDragEnd = (result) => {
        if (!result.destination)
            return;
        const newItems = Array.from(orderedTasks !== null && orderedTasks !== void 0 ? orderedTasks : []);
        const [movedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, movedItem);
        setOrderedTasks(newItems);
    };
    return (jsx(DragDropContext, { onDragEnd: onDragEnd, children: jsx(ConnectedDroppable, { droppableId: "lista-tareas", children: (providedDroppable) => (jsxs("div", Object.assign({ ref: providedDroppable.innerRef, "data-testid": `ds-makersun-dozen-task-list-container`, "aria-label": ariaLabel, tabIndex: 0 }, providedDroppable.droppableProps, { children: [orderedTasks === null || orderedTasks === void 0 ? void 0 : orderedTasks.map((task, index) => (jsx(PublicDraggable, { draggableId: task.id, index: index, isDragDisabled: state !== 'reorder', children: (providedDraggable, snapshotDraggable) => {
                            var _a, _b, _c;
                            const draggableRef = providedDraggable
                                .innerRef;
                            return (jsxs("div", Object.assign({ ref: (element) => {
                                    refs[task.id] = element;
                                    providedDraggable.innerRef(element);
                                } }, providedDraggable.draggableProps, providedDraggable.dragHandleProps, { style: Object.assign(Object.assign({}, providedDraggable.draggableProps.style), { display: 'flex', top: `${((_a = draggableRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) * index + 30}px` }), children: [jsx("div", { className: "order-number-relative", children: jsx(Pill, { className: "order-number-absolute", type: "mini", value: snapshotDraggable.isDragging ? '?' : index + 1, style: {
                                                top: `${(_b = positionPerIndex[index]) !== null && _b !== void 0 ? _b : 0}px`,
                                            } }) }), jsx(TaskHome, { label: task.label, gesturesEnabled: state === 'complete-tasks' }, (_c = task === null || task === void 0 ? void 0 : task.id) !== null && _c !== void 0 ? _c : index)] })));
                        } }, task.id))), providedDroppable.placeholder] }))) }) }));
};

___$insertStyle(".ds-makersun-dozen-move-hand-container {\n  display: flex;\n  width: 40px;\n  cursor: auto;\n  transition: transform 300ms ease-in-out;\n}\n.ds-makersun-dozen-move-hand-container.cursor-pointer {\n  cursor: pointer;\n}\n.ds-makersun-dozen-move-hand-container.is-active {\n  transform: scale(1);\n}\n.ds-makersun-dozen-move-hand-container.not-active {\n  opacity: 0.4;\n  transform: scale(0.9);\n}\n.ds-makersun-dozen-move-hand-container img {\n  width: 100%;\n  height: auto;\n}");

var img$1 = "data:image/png;base64,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";

const MoveHand = ({ className = '', ariaLabel, style = {}, onClick = () => { }, isActive, }) => {
    const getStyles = (isActive) => {
        if (isActive === undefined) {
            return '';
        }
        if (isActive) {
            return 'is-active';
        }
        else {
            return 'not-active';
        }
    };
    return (jsx("div", { className: `ds-makersun-dozen-move-hand-container 
        ${className} 
        ${onClick ? 'cursor-pointer' : ''}
        ${getStyles(isActive)}
      `, "data-testid": `ds-makersun-dozen-move-hand`, "aria-label": ariaLabel, tabIndex: 0, style: style, onClick: onClick, children: jsx("img", { src: img$1, alt: "move hand icon" }) }));
};

___$insertStyle(".ds-makersun-dozen-complete-tasks-container {\n  display: flex;\n  width: 40px;\n  cursor: auto;\n  transition: transform 300ms ease-in-out;\n}\n.ds-makersun-dozen-complete-tasks-container.cursor-pointer {\n  cursor: pointer;\n}\n.ds-makersun-dozen-complete-tasks-container.is-active {\n  transform: scale(1);\n}\n.ds-makersun-dozen-complete-tasks-container.not-active {\n  opacity: 0.4;\n  transform: scale(0.9);\n}\n.ds-makersun-dozen-complete-tasks-container img {\n  width: 100%;\n  height: auto;\n}");

var img = "data:image/png;base64,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";

const CompleteTasks = ({ className = '', ariaLabel, onClick = () => { }, isActive, }) => {
    const getStyles = (isActive) => {
        if (isActive === undefined) {
            return '';
        }
        if (isActive) {
            return 'is-active';
        }
        else {
            return 'not-active';
        }
    };
    return (jsx("div", { className: `ds-makersun-dozen-complete-tasks-container 
        ${className} 
        ${onClick ? 'cursor-pointer' : ''}
        ${getStyles(isActive)}
      `, "data-testid": `ds-makersun-dozen-complete-tasks`, "aria-label": ariaLabel, tabIndex: 0, onClick: onClick, children: jsx("img", { src: img, alt: "Complete task icon" }) }));
};

export { CompleteTasks, Done, Greeting, MoveHand, Pill, SwipeableWrapper, Tab, TabOption, Tabs, Task, TaskHome, TaskList };
