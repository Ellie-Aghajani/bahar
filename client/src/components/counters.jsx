import React, {Component} from "react";
import Counter from "./Counter"
class Counters extends Component {
    state = {
     counters: [
        {id: 1, value:0},
        {id: 2, value:0},
        {id: 3, value:0},
        {id: 4, value:0}
    ]
        
    };
    handleDelete = ()=>{

    };

    render() {
        return(
        <div>
           {this.state.counters.map(counter => <Counter key = {counter.id} ondelete={this.handleDelete} />)}
        </div>
        );
    }
}

export default Counters;