export const categories = [
    { _id: "5b21ca3eeb7f6fbccd471818", name: "Low Light Tolerant" },
    { _id: "5b21ca3eeb7f6fbccd471814", name: "Pet friendly" },
    { _id: "5b21ca3eeb7f6fbccd471820", name: "Hard to kill" }
  ];
  
  export function getCategories() {
    return categories.filter(g => g);
  }
  