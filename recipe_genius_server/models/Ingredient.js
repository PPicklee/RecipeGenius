class Ingredient {
    constructor(id, name, quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.calories = null;
        this.protein = null;
        this.carbohydrates = null;
        this.fat = null;
        this.foodType = null;
        this.barcode = null;
        this.price = null;
    }

    updateNutritionInfo(calories, protein, carbohydrates, fat, foodType, barcode, price) {
        this.calories = calories;
        this.protein = protein;
        this.carbohydrates = carbohydrates;
        this.fat = fat;
        this.foodType = foodType;
        this.barcode = barcode;
        this.price = price;
    }
}

module.exports = Ingredient;
