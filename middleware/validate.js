const validator = require("../helpers/validate");


const Validator = require('validatorjs');

Validator.register('object', value => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}, 'The :attribute must be an object.');
const saveDevice = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    type: "required|string",
    brand: "required|string",
    model: "required|string",
    specifications: "object",
    price: "required|numeric",
    releaseDate: "required|date|date_format:YYYY-MM-DD",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      // Validation of 'specifications' being a object
      const specifications = req.body.specifications;

      // Validation is object and ( typeof null === 'object')
      if (typeof specifications !== "object" || specifications === null) {
        return res.status(412).send({
          success: false,
          message: "Validation failed",
          data: {
            specifications: ["The specifications field must be an object."],
          },
        });
      }

      next();
    }
  });
};

module.exports = {
  saveDevice,
};
