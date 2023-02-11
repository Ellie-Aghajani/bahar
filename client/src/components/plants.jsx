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
        const categories = [{ _id: "", name: "All Genres" }, ...getCategories()];
    
        this.setState({ movies: getPlants(), categories });
      }
    
      handleDelete = plant => {
        const plants = this.state.plants.filter(m => m._id !== plant._id);
        this.setState({ plants });
      };

    
    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };




    };
    handlePageChange= page => {
        this.setState({currentPage:page});

    };
    handleSort= path => {
        const sortColumn = {...this.state.sortColumn};
        if(sortColumn.path===path)
        sortColumn.order = (sortColum.order ==="asc") ? 'desc': 'asc';
        else {
            sortColumn.path=path;
            sortColumn = 'asc'
        }
        this.setState({sortColumn:})

    }

    handleCategorySelect= category => {
       
        this.setState({ selectedCategory: category, currentPage: 1 });
    }

    render() {
        const {length:count} = this.state.plants;
        const {pageSize, currentPage,selectedCategory, sortColumn, plants:allPlants} = this.state;
        if(count === 0) 
             return <p>There are no plants</p>;

             const filtered = selectedCategory
              ? allPlants.filter(m=>m.category._id ===selectedCategory._) : allPlants

              const sorted= _orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const plants = paginate(sorted, pageSize, currentPage, filtered)   
        return (
            <div classname="row">
                <div className="col-3">
                <ListGroup 
                    items={this.state.categories} 
                    onItemSelect={this.handleCategorySelect}
                    selectedItem={this.state.selectedCategory}/>

                </div>
                <div className="col">
                    
                 <p>Showing {filtered} plants in the database </p>
                 <PlantsTable plants = {plants} onLike={this,handleLike} onDelete={this.handleDelete}/>

            <Pagination 
                itemsCount= {filtered.length} 
                pageSize={pageSize} 
                onPageChange={this.handlePageChange}
                currentPage= {currentPage} />

                </div>
 
            </div>
            

     );
     
    }
   
}

export default Plants;