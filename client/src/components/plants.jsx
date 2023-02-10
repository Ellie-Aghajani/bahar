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
        this.setState({plants: getPlants(),categories: getCategories()});
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
    handleCategorySelect= category => {
        this.setState({ selectedCategory: category, currentPage: 1 });
    }
    render() {
        const {length:count} = this.state.plants;
        const {pageSize, currentPage, plants:allPlants} = this.state;
        if(count === 0) 
             return <p>There are no plants</p>;
        const plants = paginate(pageSize, currentPage, allPlants)   
        return (
            <div classname="row">
                <div className="col-2">
                <ListGroup 
                    items={this.state.categories} 
                    textProperty ="name"
                    valueProperty="_id"

                    onItemSelect={this.handleCategorySelect}/>

                </div>
                <div className="col">
                    
                 <p>Showing {count} plants in the database </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Plant</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {this.state.plants.map(plant =>(
                        <tr key={plant._id}>
                            <td>{plant.title}</td>
                            <td>{plant.category.name}</td>
                            <td>{plant.numberInStock}</td>
                            <td>{plant.dailySalesRate}</td>
                            <td>
                                <Like liked={plant.liked} onClick={() => this.handleLike(plant) }/>
                            </td>
                            <td>
                                <button 
                                onClick={()=> this.handleDelete(plant)} 
                                className= "btn btn-danger btn-sm">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                
                </tbody>
                
            </table>
            <Pagination 
                itemsCount= {count} 
                pageSize={pageSize} 
                onPageChange={this.handlePageChange}
                currentPage= {currentPage} />

                </div>
 
            </div>
            

     );
     
    }
   
}

export default Plants;