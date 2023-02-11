import React, {Component} from "react";
import {getPlants} from "../services/fakePlantService";
import Like from "./common/like"
import Pagination from "./common/pagination"
import _ from 'lodash';
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import {getCategories} from "../services/fakeCategoryService";
class Plants extends Component {
    state = {
        plants:[],
        currentPage:1,
        categories:[],
        pageSize:4
    };
    componentDidMount() {
        this.setState({_id: "" , name:"all Categories"}, {plants: getPlants(),categories: getCategories()});
    }
    handleDelete = plant => {
        const plants = this.state.plants.filter(m => m._id !== plant._id);
        this.setState({plants});
    };
    handleLike = plant=>{
        const plants = [...this.state.plants];
        const index = plants.indexOf(plant);
        plants[index]= {...plants[index]};
        plants[index].liked = !plants[index].liked;
        this.setState({plants});

    };
    handlePageChange= page => {
        this.setState({currentPage:page});

    };
    handleSort= path => {

    }

    handleCategorySelect= category => {
        this.setState({ selectedCategory: category, currentPage: 1 });
    }
    render() {
        const {length:count} = this.state.plants;
        const {pageSize, currentPage,selectedCategory plants:allPlants} = this.state;
        if(count === 0) 
             return <p>There are no plants</p>;
             const filtered = selectedCategory
              ? allPlants.filter(m=>m.category._id ===selectedCategory._) : allPlants
        const plants = paginate(pageSize, currentPage, filtered)   
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