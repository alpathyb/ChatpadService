module.exports = (fn) => (req, res, next) => {
  // it is also return handler controller function or middleware function
  //   fn(req, res, next).catch((err) => {
  //     next(err);
  //   });
  fn(req, res, next).catch(next); //next akan men-trigger errorController handler yang di deklarasikan di app.js
  //function di parameter nantinya adalah await function yang akan return promise, makanya diatas bisa pakai catch
};
