import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";

class PlantsTable extends Component {
  columns = [
    { path: "title", label: "Plant Name" },
    { path: "category.name", label: "Category" },
    { path: "numberInStock", label: "Stock" },
    {
      key: "like",
      content: plant => (
        <Like liked={plant.liked} onClick={() => this.props.onLike(plant)} />
      )
    },
    {
      key: "delete",
      content: plant => (
        <button
          onClick={() => this.props.onDelete(plant)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

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
