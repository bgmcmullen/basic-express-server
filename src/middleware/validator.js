'use strict '

function validate(req, res, next){
  error = new Error("Please provide a name");
  error.status = 500
  if(!req.query.name)
  {
    next(error);
  } else {
    next();
  }


  
}

module.exports = validate;