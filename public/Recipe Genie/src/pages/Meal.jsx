import { useEffect, useState } from "react";
import { Link } from "wouter";

function page({ id }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMeal = () => {
    setLoading(true);
    setError(false);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.meals ? data.meals[0] : null);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => { fetchMeal(); }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200')" }}>
        <div className="bg-black/50 p-10 rounded-3xl flex flex-col items-center gap-6">
          <span className="text-white text-3xl font-bold">Loading Recipe...</span>
          <span className="loading loading-spinner loading-lg text-orange-400"></span>
          <button onClick={fetchMeal}
            className="mt-4 bg-white text-orange-500 font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300 border-none">
            Restart
          </button>
        </div>
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-2xl text-red-500">Failed to load recipe.</p>
        <button onClick={fetchMeal}
          className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition">
          Restart
        </button>
        <Link href="/"><button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full">← Back to Home</button></Link>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push(`${meas?.trim()} ${ing.trim()}`);
  }

  return (
    <div className="flex flex-col items-center p-5 md:p-10 bg-base-200 min-h-screen">
      <Link href="/"><button className="btn btn-circle bg-base-content self-start mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
          <path d="M20 11H7.41l2.29-2.29A1 1 0 1 0 8.29 7.29L3.71 12l4.59 4.59a1 1 0 0 0 1.42-1.42L7.41 13H20a1 1 0 0 0 0-2z"/>
        </svg>
      </button></Link>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full max-w-xl rounded-3xl shadow-2xl mb-8"/>
      <h1 className="text-3xl md:text-5xl font-bold text-orange-500 mb-2 text-center">{meal.strMeal}</h1>
      <p className="text-gray-500 mb-8">{meal.strCategory} · {meal.strArea}</p>
      <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-2xl mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🧂 Ingredients</h2>
        <ul className="grid grid-cols-2 gap-2">
          {ingredients.map((ing, i) => (
            <li key={i} className="text-gray-600 text-sm bg-orange-50 rounded-lg px-3 py-2">{ing}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Instructions</h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{meal.strInstructions}</p>
      </div>
    </div>
  );
}
export default page;