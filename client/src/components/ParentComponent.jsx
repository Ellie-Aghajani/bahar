import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  const [likedItems, setLikedItems] = useState([]);

  const handleLike = (item) => {
    setLikedItems((prevLikedItems) => [...prevLikedItems, item]);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildComponent likedItems={likedItems} setLikedItems={setLikedItems} handleLike={handleLike} />
    </div>
  );
}

export default ParentComponent;