/**
 * @typedef {'A'|'B'|'C'|'D'|'E'} Score
 */

/**
 * @typedef {[string, string, string, string, string ]} Colors
 */

const xmlns = 'http://www.w3.org/2000/svg';
const svgId = 'PI-score';

/**
 * @param {string} tagName
 * @param {[name: string, value: any][]} attributes
 */
function createElement(tagName, attributes = []) {
  const el = document.createElementNS(xmlns, tagName);
  attributes.forEach((attr) => el.setAttribute(...attr));

  return el;
}

const bgRect = [60, 90];
const bgCircleR = 43;
const bgCircleStrokeWidth = 4;
const textSize = 30;

const letters = ['A', 'B', 'C', 'D', 'E'];

/**
 * @type {Colors}
 */
const defaultColors = ['#038141', '#85bb2f', '#fecb02', '#ee8100', '#e63e11'];

/**
 * @param {{ colors: Colors }} options
 * @returns {SVGElement[]}
 */
function createSvgContent({ colors }) {
  const elements = [];

  // apply style to elements
  const style = createElement('style');
  style.append(`text {
    font-family: Sans;
    font-weight: 800;
    font-size: ${textSize}px;
  }`);
  elements.push(style);

  // BG
  letters.forEach((letter, i) => {
    const bg = createElement('rect', [
      ['x', i * bgRect[0]],
      ['y', 0],
      ['width', bgRect[0]],
      ['height', bgRect[1]],
      ['fill', colors[i]],
    ]);
    elements.push(bg);
  });

  // Selected BG
  const circle = createElement('circle', [
    ['cx', bgRect[0] / 2],
    ['cy', bgRect[1] / 2],
    ['r', bgCircleR],
    ['stroke', '#FFFFFF'],
    ['stroke-width', bgCircleStrokeWidth],
    ['fill', '#FFFFFF'],
    ['opacity', 0],
  ]);

  elements.push(circle);

  // letters
  letters.forEach((letter, i) => {
    const rectWidth = bgRect[0];
    const el = createElement('text', [
      ['x', i * rectWidth + rectWidth / 2],
      // 8 is the vertical space leave by the font (30+8)
      ['y', bgRect[1] / 2 + 8],
      ['text-anchor', 'middle'],
      ['fill', '#FFFFFF'],
      ['opacity', 0.5],
    ]);
    el.append(letter[0]);

    elements.push(el);
  });

  return elements;
}

const circleIdx = 5;

/**
 * @param {string} letter
 * @param {Colors} colors
 */
function select(letter, colors) {
  const letterIndex = letters.findIndex((item) => item[0] === letter);
  const bgEl = document.getElementsByTagNameNS(xmlns, 'rect')[letterIndex];
  const circleEl = document.getElementsByTagNameNS(xmlns, 'circle')[0];
  const letterEl = document.getElementsByTagNameNS(xmlns, 'text')[letterIndex];

  const cx = bgRect[0] * letterIndex + bgRect[0] / 2;
  circleEl.setAttribute('cx', cx);
  circleEl.setAttribute('opacity', 1);
  circleEl.setAttribute('fill', colors[letterIndex]);

  bgEl.setAttribute('opacity', 0);

  letterEl.setAttribute('opacity', 1);
}

/**
 * @param {Score} score
 * @param {{ colors: }} options
 * @returns {SVGElement}
 */
export function createSvg(score, { colors }) {
  const svgEl = document.createElement('svg');
  svgEl.setAttribute('viewBox', '-15 0 330 90');
  svgEl.setAttribute('width', '330');
  svgEl.setAttribute('height', '90');

  return svgEl;
}

export function main() {
  const params = new URLSearchParams(document.location.search);
  const letter = params.get('score');
  let colors = params.get('colors')?.split(',');

  if (colors?.length === 5) {
    colors = colors.map((color) => `#${color}`);
  } else {
    colors = defaultColors;
  }

  const elements = createSvgContent({ colors });
  const content = document.getElementById(svgId);
  content.append(...elements);

  if (letter) {
    select(letter, colors);
  }
}

main();
