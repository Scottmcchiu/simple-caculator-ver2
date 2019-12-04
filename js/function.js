/*** functions used for simple caculator***/

/**
 * displayDigit - display the digit
 *
 * @param  {HTMLElement} ele  input the variable name of defined
 * @param  {string} str       input any string
 * @param  {number} num       speed for the event
 * @returns {undefined}       undefined
 */
const displayDigit = (ele, str, num) => ele.text(str).fadeIn(num);

/**
 * disableDigit - hide all digits
 *
 * @param  {HTMLElement} ele  input the variable name of defined
 * @param  {string} str       input any string
 * @param  {number} num       speed for the event
 * @returns {undefined}       undefined
 */
let disableDigit = (ele, str, num) => ele.text(str).fadeOut(num);

/**
 * displayFuns - display the function been choosen
 *
 * @param  {HTMLElement} ele  input the variable name of defined
 * @param  {string} str       input any string
 * @param  {number} num       speed for the event
 * @returns {undefined}       undefined
 */
let displayFuns = (ele, str, num) =>
  ele.css('display', 'block').text(str).fadeIn(num);

/**
 * disableFuns - hide the function
 *
 * @param  {HTMLElement} ele  input the variable name of defined
 * @param  {string} str       input any string
 * @param  {number} num       speed for the event
 * @returns {undefined}       undefined
 */
let disableFuns = (ele, str, num) =>
  ele.css('display', 'none').text(str).fadeOut(num);

/**
 * displayUdate - update for the display area
 *
 * @param  {HTMLElement} ele1  input the variable name of defined
 * @param  {string} str1       input any string
 * @param  {number} num1       speed for the event
 * @param  {HTMLElement} ele2  input the variable name of defined
 * @param  {string} str2       input any string
 * @param  {number} num2       speed for the event
 * @returns {undefined}        undefined
 */
const displayUdate = (ele1, str1, num1, ele2, str2, num2) => {
  ele1.text(str1).fadeToggle(num1, function() {
    dispNum = '';
    displayDigit(ele2, str2, num2);
  });
}

/**
 * getValue - return values for operation used
 *
 * @param  {string} op  selected from '+' '-' '*' '/'
 * @param  {string} str input a string contains digits
 * @returns {number}    values converted form string
 */
const getValue = (op, str) => {
  let val;
  const results = {
    '+': val = Number(str),
    '-': val = Number(str),
    '*': val = Number(str),
    '/': val = Number(str),
    '=': val = Number(str)
  };
  return results[op];
}

/**
 * operation - caculation
 *
 * @param  {string} op   selected from '+' '-' '*' '/'
 * @param  {number} val1 first input number
 * @param  {number} val2 second input number
 * @returns {number}     final result after caculated
 */
const operation = (op, val1, val2) => {
  const operations = {
    '+': val1 + val2,
    '-': val1 - val2,
    '*': val1 * val2,
    '/': val1 / val2,
    '=': val1 || val2
  };
  return operations[op];
}

/**
 * displayResult - limit the length of result
 *
 * @param  {number} num the value of number after caculated
 * @returns {string}    the value of string for display used
 */
const displayResult = num => {
  let finalResult = num.toString();
  if (finalResult.length > 10)
    return finalResult.substring(0, 10);
  else
    return finalResult;
}
