// Recipe.js
const apiService = require('../services/recipeGeniusAPIService');

class Recipe {
    constructor(
        _id,
        recipeName,
        videoLink,
        servings,
        estimatedCost,
        dietaryRestrictionsMet,
        equipmentRequired,
        ingredientsList,
        steps,
        ingredientQuantities
    ) {
        this._id = _id;
        this.name = recipeName;
        this.videoLink = videoLink;
        this.servings = servings;
        this.estimatedCost = estimatedCost;
        this.dietaryRestrictionsMet = dietaryRestrictionsMet;
        this.equipmentRequired = equipmentRequired;
        this.ingredientsList = ingredientsList;
        this.steps = steps;
        this.ingredientQuantities = ingredientQuantities;
    }

    static createRecipeFromData(recipeData) {
        return new Recipe(
          recipeData._id || '',
          recipeData.recipeName || 'Unnamed Recipe',
          recipeData.videoLink || '',
          recipeData.servings || 1,
          recipeData.estimatedCost || 0,
          recipeData.dietaryRestrictionsSatisfied || [],
          recipeData.appliancesUsed || [],
          recipeData.ingredients || [],
          recipeData.instructions || [],
          recipeData.ingredientQuantities || []
        );
    }
      
  
    static async search(filterNames, filterValues) {
      try {
        // Ensure filterNames and filterValues have the same length
        if (filterNames.length !== filterValues.length) {
          throw new Error('Filter names and values must have the same length');
        }

        let results = [];
        for (let i = 0; i < filterNames.length; i++) {
          const filterName = filterNames[i];
          const filterValue = filterValues[i];

          // Skip this iteration if filterValue is not provided
          if (!filterValue) continue;

          const apiResponse = await apiService.invokeApi(filterName, filterValue);
          const newRecipes = Array.isArray(apiResponse.recipes)
            ? apiResponse.recipes.map(recipeData => Recipe.createRecipeFromData(recipeData))
            : [];

          results.push(newRecipes);
        }

        // Find the intersection of all result sets
        const intersection = results[0].filter(a => results.every(b => b.some(c => c.name === a.name)));

        return intersection;
      } catch (error) {
        console.error(`Failed to search for recipes: ${error}`);
        return [];
      }
    }
    
    getCosts() {
    }

    schedule() {
    }
  
    ingredientCheck() {
    }
  
    notification() {
    }
  
    getTotalNutritionInfo() {
    }

    static areRecipesEqual(recipe1, recipe2) {
        return recipe1.name === recipe2.name;
    }
  }
  
  module.exports = Recipe;
  