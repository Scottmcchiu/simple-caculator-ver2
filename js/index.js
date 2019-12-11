(function() {
  $(function() {

    /*** power on/ off ***/
    let btns = $('.btn');

    btns.on('mouseenter', function() {
      if (!$(this).hasClass('off')) {
        $(this).css({
          'backgroundColor': '#d6dcdf',
          'color': '#413d3a'
        });
      } // end if

      if ($(this).hasClass('on')) {
        $(this).css({
          'backgroundColor': '',
          'color': ''
        });
      } // end if
    }); // end mouseenter

    let display = $('#left-digits');
    let dispNum = '';

    btns.on('click', function() {
      if ($(this).text() === 'ON') {
        $(this)
          .toggleClass('on')
          .siblings()
          .animate({
            opacity: 1
          }, 500, function() {
            if ($(this).hasClass('off')) {
              $(this).removeClass('off');
              displayDigit(display, '0', 500);
            } else {
              dispNum = '';
              disableDigit(display, dispNum, 500);
              disableFuns(dispOpr, '', 500);
              disableFuns(dispFun, '', 500);
              $(this).animate({
                opacity: 0.1
              }, 500, function() {
                $(this).addClass('off')
              });
            } // end if-else
          });
      } // end if
    }); // end click

    btns.on('mouseleave', function() {
      $(this).css({
        'backgroundColor': '',
        'color': ''
      });
    }); // end mouseleave
    /*** end power ***/


    /*** digits ***/
    let nums = $('.num');

    nums.on('click', function() {
      if (btns.hasClass('on')) {
        dispNum += $(this).text();
        if (dispNum.length < 10) {
          display.text(dispNum);
        } else {
          displayUdate(display, 'error', 100, display, '0', 100);
        } // end if-else
      } // end if

      if (dispNum.startsWith('0')) {
        displayUdate(display, '0', 100, display, '0', 100);
      } // end if

      if (operator === '=' && value2 === null && value3 === null) {
        disableFuns(dispOpr, '', 100);
        disableFuns(dispFun, '', 100);
        tmp = null;
        if (operator === '=')
          value1 = null;
      } // end if
    }); // end click
    /*** end digits ***/


    /*** clear ***/
    let clear = $('.clr');

    clear.on('click', function() {
      if (btns.hasClass('on')) {
        displayUdate(display, 'clear', 100, display, '0', 100);
        disableFuns(dispOpr, '', 100);
        disableFuns(dispFun, '', 100);
        dispNum = '';
        operator = '';
        count1 = '';
        count2 = '';
        value1 = null;
        value2 = null;
        value3 = null;
        tmp = null;
        memCount = '';
        memNums = [];
        fristMemNums = null;
        secondMemNums = null;
        memResult = null;
      } // end if
    }); // end click
    /*** end clear ***/


    /*** operations ***/
    let opr = $('.opr');
    let dispOpr = $('#operator');
    let operator = '';
    let count1 = '';
    let count2 = '';
    let value1 = null;
    let value2 = null;
    let value3 = null;
    let tmp = null;

    opr.on('click', function() {
      if (btns.hasClass('on')) {
        operator = $(this).text();
        displayFuns(dispOpr, operator, 100);
      } // end if

      // values
      if (operator.match(/[\+\-\*\/\=]/)) {
        if (value1 === null) {
          if (tmp === null) {
            count1 = operator;
            value1 = getValue(count1, dispNum);
            dispNum = '';
          } else {
            dispNum = tmp;
            count1 = operator;
            value1 = getValue(count1, dispNum);
            dispNum = '';
          } // end if-else
        } else {
          count2 = operator;
          value2 = getValue(count2, dispNum);
          dispNum = '';
          value3 = operation(count1, value1, value2);
          dispNum = '';
          displayDigit(display, displayResult(value3), 100);
        } // end if-else
      } // end if

      if (value3 !== null && count2 !== '=') {
        count1 = count2;
        value1 = value3;
        value2 = null;
        value3 = null;
      } // end if

      if (count2 === '=') {
        displayDigit(display, displayResult(value3), 100);
        tmp = value3;
        count1 = '';
        count2 = '';
        value1 = null;
        value2 = null;
        value3 = null;
      } // end if
    }); // end click
    /*** end operations ***/


    /*** functions ***/
    let functions = $('.fun');
    let dispFun = $('#function');
    let memBtn = '';
    let memCount = '';
    let memNums = [];
    let fristMemNums = null;
    let secondMemNums = null;
    let memResult = null;

    functions.on('click', function() {
      if (btns.hasClass('on')) {
        if ($(this).text() !== 'ON') {
          memBtn = $(this).text();
          displayFuns(dispFun, memBtn, 100);
        } // end if
      } // end if

      if (memBtn === 'M+') {
        operator = '+';
        memCount = operator;
        disableFuns(dispOpr, '', 100);
        if (value1 === null) {
          count1 = operator;
          value1 = getValue(count1, dispNum);
          dispNum = '';
        } else {
          count2 = operator;
          value2 = getValue(count2, dispNum);
          dispNum = '';
          value3 = operation(count1, value1, value2);
          dispNum = '';
          displayDigit(display, displayResult(value3), 100);
        } // end if-else
        memNums.push(value3);
        count1 = '';
        count2 = '';
        value1 = null;
        value2 = null;
        value3 = null;
      } // end if

      if (memBtn === 'M-') {
        operator = '-';
        memCount = operator;
        disableFuns(dispOpr, '', 100);
        if (value1 === null) {
          count1 = operator;
          value1 = getValue(count1, dispNum);
          dispNum = '';
        } else {
          count2 = operator;
          value2 = getValue(count2, dispNum);
          dispNum = '';
          value3 = operation(count1, value1, value2);
          dispNum = '';
          displayDigit(display, displayResult(value3), 100);
        } // end if-else
        fristMemNums = memNums.pop();
        memNums.push(value3);
        secondMemNums = memNums.pop();
        memNums.push(fristMemNums - secondMemNums);
        count1 = '';
        count2 = '';
        value1 = null;
        value2 = null;
        value3 = null;
      } // end if

      if (memBtn === 'MRC') {
        if (memCount === '+') {
          for (let i = 0; i < memNums.length; i++) {
            memResult += memNums[i];
          } // end for
        } else if (memCount === '-') {
          memResult = memNums;
        } // end if-else-if
        operator = "=";
        displayFuns(dispOpr, operator, 100);
        displayDigit(display, displayResult(memResult), 100);
        memCount = '';
        memNums = [];
        fristMemNums = null;
        secondMemNums = null;
        memResult = null;
      } // end if
    }); // end click
    /*** end functions ***/

  }); // end jQuery
}()); // end IIFE
