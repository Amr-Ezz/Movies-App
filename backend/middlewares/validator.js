const { z } = require('zod');


const validate = (schemas = {}) => {
  return (req, res, next) => {
    const errors = [];
    
    try {
      if (schemas.body) {
        try {
          req.body = schemas.body.parse(req.body);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.push({
              location: 'body',
              errors: error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
                code: err.code
              }))
            });
          }
        }
      }
      
      if (schemas.query) {
        try {
          req.query = schemas.query.parse(req.query);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.push({
              location: 'query',
              errors: error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
                code: err.code
              }))
            });
          }
        }
      }
      
      if (schemas.params) {
        try {
          req.params = schemas.params.parse(req.params);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.push({
              location: 'params',
              errors: error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
                code: err.code
              }))
            });
          }
        }
      }
      
      if (errors.length > 0) {
        return res.status(422).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
      }
      
      next();
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal validation error',
        error: error.message
      });
    }
  };
};


const validateSingle = (schema, location = 'body') => {
  const schemas = {};
  schemas[location] = schema;
  return validate(schemas);
};

const validateBody = (schema) => {
  return validate({ body: schema });
};

const validateQuery = (schema) => {
  return validate({ query: schema });
};

const validateParams = (schema) => {
  return validate({ params: schema });
};

module.exports = {
  validate,
  validateSingle,
  validateBody,
  validateQuery,
  validateParams
};
