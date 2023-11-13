
# RecipeGenius🚀

This is a student project for COMP 3415 Software Engineering course

RecipeGenius is an intuitive web platform revolutionizing meal planning, designed to cut food waste and simplify cooking. By allowing users to manage their kitchen inventory and offering tailored recipe suggestions based on available ingredients, it promotes efficient and creative meal preparation. With diverse features such as barcode scanning, scheduling recipes, and budget tracking, RecipeGenius aims to empower users of all cooking proficiencies to make the most of their resources while saving time and money.


## API Reference

### Recipe API made by Chris
The RecipeGenius API is hosted on Azure, running as a power automate flow that receives a filter query in the request body, queries our MongoDB collection of recipes, and returns matching recipes to the caller.

#### Endpoint

```http
  POST https://prod-101.westus.logic.azure.com:443/workflows/4be074d72cb4412c94f622bd0d8ca302/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tJPeTl7qDvhrhSLKeszzK37Vt9Vs7wHmZx5VwyJhGVQ
```

#### Request Headers
| Key | Value     |
| :-------- | :------- |
| `content-type` | `application/json` |

#### Request Body (JSON)
| Parameter | Value     | Description                |
| :-------- | :------- | :------------------------- |
| `filterName` | One of: `recipeName` `ingredients` `dietaryRestrictionsSatisfied` `appliancesUsed` `estimatedCost` |  |
| `filterValue` | `<value as a string - case insensitive>`| To pass multiple values in for ingredients, dietaryRestrictionsSatisfied, or appliancesUsed, separate values with a pipe ( \| ) character. Ex. salt\|pepper |
#### Example request body:
{"filterName": "dietaryRestrictionsSatisfied","filterValue": "vegan|halal|dairy-free"}

## Documentation

[Documentation](https://docs.google.com/document/d/1Onm9WxiYZ-ArgfTSevsx-IL5rtM2CjQF/edit?usp=sharing&ouid=111835156540357364687&rtpof=true&sd=true)


## Screenshots
future Screenshots
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Authors

- [@Julio Ortega](https://www.github.com/PPicklee)
- [@Chris Veilleux](https://www.github.com/chris-veilleux)
- [@John Farrell](https://www.github.com/Superintendent-Vergil)

