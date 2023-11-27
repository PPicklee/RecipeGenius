// Recipe.js
const apiService = require('../services/recipeGeniusAPIService');

class Recipe {
    constructor(
        name,
        videoLink,
        servings,
        estimatedCost,
        dietaryRestrictionsMet,
        equipmentRequired,
        ingredientsList,
        steps,
        ingredientQuantities
    ) {
        this.name = name;
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
          const recipesList = [];
    
          // Ensure filterNames and filterValues have the same length
          if (filterNames.length !== filterValues.length) {
            throw new Error('Filter names and values must have the same length');
          }
    
          for (let i = 0; i < filterNames.length; i++) {
            const filterName = filterNames[i];
            const filterValue = filterValues[i];
    
            // Query the API using filterName and filterValue
            const apiResponse = await apiService.invokeApi(filterName, filterValue);
    
            const recipesFromApi = Array.isArray(apiResponse.recipes)
                ? apiResponse.recipes.map(recipeData => Recipe.createRecipeFromData(recipeData))
                : [];

            // Add recipes to the list
            recipesList.push(...recipesFromApi);
          }


        // After the loop, remove duplicates based on the 'name' property
        const uniqueRecipesList = recipesList.filter((recipe, index, self) => {
            return self.findIndex((r) => Recipe.areRecipesEqual(recipe, r)) === index;
        });
    
          return uniqueRecipesList;
        } catch (error) {
          console.error('Error in search:', error.message);
          throw error;
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
        return recipe1.name === recipe2.name; // Adjust based on your equality criteria
    }
  }
  
  module.exports = Recipe;
  