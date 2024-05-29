const validator = require('../helpers/validate');

const saveMovie = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    director: 'required|string',
    musicComposer: 'required|string',
    distributionCompany: 'required|string',
    USreleaseDate: 'required|string',
    runningTime: 'required|string',
    audienceRating: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMovie
};