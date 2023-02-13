import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class PlantsTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: plant => <Link to={`/plants/${plant._id}`}>{plant.title}</Link>
    },
    { path: "category.name", label: "Category" },
    { path: "numberInStock", label: "Stock" },
    { path: "price", label: "Price" },

    {
      key: "like",
      content: plant => (
        <Like liked={plant.liked} onClick={() => this.props.onLike(plant)} />
      )
    }
  ];
  deleteColumn = {
    key: "delete",
    content: plant => (
      <button
        onClick={() => this.props.onDelete(plant)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { plants, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={plants}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PlantsTable;
