import React, { Component } from "react";
import PlantTable from "./plantTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getPlants } from "../services/fakePlantService";
import { getCategories } from "../services/fakeCategoryService";
import { paginate } from "../utils/paginate";
import _ from "lodash";



class Plants extends Component {
    state = {
      plants: [],
      categories: [],
      currentPage: 1,
      pageSize: 4,
      sortColumn: { path: "title", order: "asc" }
    };

    componentDidMount() {
        const categories = [{ _id: "", name: "All Categories" }, ...getCategories()];
    
        this.setState({ plants: getPlants(), categories });
      }
    
      handleDelete = plant => {
        const plants = this.state.plants.filter(m => m._id !== plant._id);
        this.setState({ plants });
      };

    
    handleLike = plant => {
        const plants = [...this.state.plants];
        const index = plants.indexOf(plant);
        plants[index] = { ...plants[index] };
        plants[index].liked = !plants[index].liked;
        this.setState({ plants });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleCategorySelect = category => {
        this.setState({ selectedCategory: category, currentPage: 1 });
      };
    
      handleSort = sortColumn => {
        this.setState({ sortColumn });
      };
    
      getPagedData = () => {
        const {
          pageSize,
          currentPage,
          sortColumn,
          selectedCategory,
          plants: allPlants
        } = this.state;
    
        const filtered =
          selectedCategory && selectedCategory._id
            ? allPlants.filter(m => m.category._id === selectedCategory._id)
            : allPlants;
    
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    
        const plants = paginate(sorted, currentPage, pageSize);
    
        return { totalCount: filtered.length, data: plants };
      };
    


      render() {
        const { length: count } = this.state.plants;
        const { pageSize, currentPage, sortColumn } = this.state;
    
        if (count === 0) return <p>There are no plants in the database.</p>;
    
        const { totalCount, data: plants } = this.getPagedData();
    
        return (
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={this.state.categories}
                selectedItem={this.state.selectedCategory}
                onItemSelect={this.handleCategorySelect}
              />
            </div>
            <div className="col">
              <p>Showing {totalCount} plants in our GreenHouse.</p>
              <PlantsTable
                plants={plants}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        );
      }
    }
    
    export default Plants;