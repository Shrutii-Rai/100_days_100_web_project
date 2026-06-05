import { useEffect, useState } from "react";
import { Link } from "wouter";

function page() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMeals = () => {
    setLoading(true);
    setError(false);
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200')",
        }}
      >
        <div className="bg-black/50 p-10 rounded-3xl flex flex-col items-center gap-6">
          <span className="text-white text-3xl font-bold">Loading Recipe...</span>
          <span className="loading loading-spinner loading-lg text-orange-400"></span>
          <button
            onClick={fetchMeals}
            className="mt-4 bg-white text-orange-500 font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300 border-none"
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-2xl text-red-500">Failed to load recipes.</p>
        <button
          onClick={fetchMeals}
          className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition"
        >
          Restart
        </button>
        <Link href="/">
          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full">
            ← Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-5 md:p-10 bg-base-200 min-h-screen">
      <Link href="/">
        <button className="btn btn-circle bg-base-content self-start mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
            <path d="M20 11H7.41l2.29-2.29A1 1 0 1 0 8.29 7.29L3.71 12l4.59 4.59a1 1 0 0 0 1.42-1.42L7.41 13H20a1 1 0 0 0 0-2z" />
          </svg>
        </button>
      </Link>
      <h1 className="text-3xl md:text-5xl font-bold text-orange-500 mb-10 text-center">
        🍽️ All Recipes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                {meal.strMeal}
              </h2>
              <Link href={`/meal/${meal.idMeal}`}>
                <button className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition border-none">
                  View Recipe
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default page;