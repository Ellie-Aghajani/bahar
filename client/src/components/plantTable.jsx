import React from 'react';
const PlantsTable = props => {
    return (
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
    )
}
