import React from "react";

const Form = ({ match, history }) => {
  return (
    <div>
      <h1>Form {match.params.id} </h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/plants")}
      >
        Save
      </button>
    </div>
  );
};

export default Form;
