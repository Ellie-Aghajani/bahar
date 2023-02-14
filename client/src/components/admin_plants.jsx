import React, { Component } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import PlantsTable from "./plantsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getPlants, deletePlant } from "../services/plantService";
import { getCategories } from "../services/categoryService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";




class Plants extends Component {
    state = {
      plants: [],
      categories: [],
      currentPage: 1,
      pageSize: 4,
      searchQuery: "",
      selectedCategory: null,
      sortColumn: { path: "title", order: "asc" }
    };

    async componentDidMount() {
      const { data } = await getCategories();
      const categories = [{ _id: "", name: "All Categories" }, ...data];
      const{data: plants} = await getPlants();
      this.setState({ plants, categories });
    }
    
    handleDelete = async plant => {
      const originalPlants = this.state.plants;
      const plants= originalPlants.filter(m => m._id !== plant._id);
      this.setState({ plants });
      try{
      await deletePlant(plant._id);
      }
      catch (ex) {
        if (ex.response && ex.response.status ===404)
        toast.error('This plant has already been deleted.');
        this.setState({ plants: originalPlants });
      }
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
        this.setState({ selectedCategory: category, searchQuery: "", currentPage: 1 });
      };

      handleSearch = query => {
        this.setState({ searchQuery: query, selectedCategory: null, currentPage: 1 });
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
          searchQuery,
          plants: allPlants
        } = this.state;
    
        let filtered = allPlants;
        if (searchQuery)
          filtered = allPlants.filter(m =>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
        else if (selectedCategory && selectedCategory._id)
          filtered = allPlants.filter(m => m.category._id === selectedCategory._id);
    
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    
        const plants = paginate(sorted, currentPage, pageSize);
    
        return { totalCount: filtered.length, data: plants };
      };
    


      render() {
        const { length: count } = this.state.plants;
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
        const { user } = this.props;

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
            {user && (
              <Link
                  to="/plants/new"
                  className="btn btn-primary"
                  style={{ marginBottom: 20 }}>
                  New Plant
              </Link>
            )}
              

              <p>Showing {totalCount} plants in the greenhouse.</p>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <PlantsTable
                plants={plants}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}/>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}/>
              </div>
          </div>
        );
      }
    }
    
    export default Plants;