describe('Protractor Demo App', function () {
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var operator = element(by.model('operator'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));
  var history = element.all(by.repeater('result in memory'));
  var EC = protractor.ExpectedConditions;

  function add(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    goButton.click();
  }

  function subtract(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    operator.sendKeys('-');
    goButton.click();
  }

  function multiply(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    operator.sendKeys('*');
    goButton.click();
  }

  function divide(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    operator.sendKeys('/');
    goButton.click();
  }

  function modulo(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    operator.sendKeys('%');
    goButton.click();
  }

  beforeEach(function () {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });

  it('should have the title "Super Calculator"', function () {
    browser.wait(EC.titleContains('Super Calculator'));
    // fail("did not find title");
  });

  it('should add one and two', function () {
    add(1, 2);
    expect(latestResult.getText()).toEqual('3');
  });

  it('should add four and six', function () {
    add(4, 6)
    expect(latestResult.getText()).toEqual('10');
  });

  it('should divide six by three', function () {
    divide(6, 3)
    expect(latestResult.getText()).toEqual('2');
  })

  it('should calculate remainder of 10 and 3', function () {
    modulo(10, 3)
    expect(latestResult.getText()).toEqual('1');
  });

  it('should multiply 5 and 3', function () {
    multiply(5, 3)
    expect(latestResult.getText()).toEqual('15');
  });

  it('should subtract 8 and 15', function () {
    subtract(8, 15)
    expect(latestResult.getText()).toEqual('-7');
  })

  it('should read the value from an input', function () {
    firstNumber.sendKeys('1')
    expect(firstNumber.getAttribute('value')).toEqual('1');
  });

  it('should have a history', function () {
    add(1, 2);
    add(3, 4);

    expect(history.count()).toEqual(2);

    add(5, 6);

    expect(history.count()).toEqual(3);
  });
});
