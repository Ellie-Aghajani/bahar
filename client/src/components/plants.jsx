import React, {Component} from "react";
import {getPlants} from "../services/fakePlantService";
import Like from "./common/like"
import Pagination from "./common/pagination"

class Plants extends Component {
    state = {
        plants:getPlants(),
        pageSize:4
    };
    handleDelete = (plant) => {
        const plants = this.state.plants.filter(m =>m._id !== plant._id);
        this.setState({plants});
    }
    handleLike = (plant)=>{
        const plants = [...this.state.plants];
        const index = plants.indexOf(plant);
        plants[index]= {...plants[index]};
        plants[index].liked = !plants[index].liked;
        this.setState({plants});

    };
    handlePageChange= page => {

    }
    render() {
        const {length:count} = this.state.plants;
        if(count === 0) 
             return <p>There are no plants</p>;
        return (
            <React.Fragment>
                 <p>Showing {this.state.plants.length} plants in the database </p>
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
                pageSize={this.state.pageSize} 
                onPage={this.handlePageChange}/> 
            </React.Fragment>
            

     )
     
    }
   
}

export default Plants;