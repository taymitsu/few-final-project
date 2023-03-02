import { useState } from 'react';
import './Recipe.css'

function Recipe() {
  const[ingredients, setIngredients] = useState(' ')
  const [recipes, setRecipes] = useState([])
  const[data, setData] = useState(null)
  

  async function fetchRecipe() {
    const apikey = "1018f2a014dc4a8d9e8ccf5656e9dea3"
    const path = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&query=${ingredients}`
    const res = await fetch(path)
    const data = await res.json()

    console.log(data);
    
    setRecipes(data.results)

    setData({
      ingredients,
      recipes
    })
  }

  return(
    <div className="Ingredients">
      <form onSubmit={e => {
        e.preventDefault()
        fetchRecipe()
      }}>
        <div>
          <input
            placeholder="Search Recipes by ingredient"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
          />
          <button type="submit">Search</button>
        </div>
      </form>

      <div>
        {recipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default Recipe;