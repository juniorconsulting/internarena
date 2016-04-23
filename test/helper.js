before(() => {
  global.localStorage = {};
  global.localStorage.getItem = () => {};
  global.localStorage.setItem = () => {};
  global.localStorage.removeItem = () => {};
});
