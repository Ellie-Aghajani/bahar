import React from "react";

class Form extends Form {
  state = {
    data: {
      title: "",
      categoryId: "",
      numberInStock: "",
     
    },
    category: [],
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

};

export default Form;
