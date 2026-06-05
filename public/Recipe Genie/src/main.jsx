import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Switch } from "wouter";
import "./index.css";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Meal from "./pages/Meal";
import Recipes from "./pages/Recipes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:name" component={({ params }) => <Category category={params.name} />} />
      <Route path="/meal/:id" component={({ params }) => <Meal id={params.id} />} />
      <Route path="/recipes" component={Recipes} />
    </Switch>
  </StrictMode>
);