import React, { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    if (!search) return;
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const data = await res.json();
    setRecipes(data.meals || []);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🍳 Recipe Finder</h1>
        <p>Find your favorite recipes easily!</p>
      </header>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={getRecipes}>Search</button>
      </div>

      <div className="recipe-grid">
        {recipes.map((meal) => (
          <div key={meal.idMeal} className="recipe-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>
            <p>{meal.strArea} | {meal.strCategory}</p>
            <a href={meal.strSource || "#"} target="_blank" rel="noreferrer">
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
