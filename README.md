
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
![Home](https://lh3.googleusercontent.com/pw/ADCreHc1H4czNgSwnV7UXMoyxho9p9LUkaVXDYnR8Dv45JW0Duir93G2tvony3zT6T96bUFF_5l_kkD0hr6DbgBZjT2D-oQM_tkWIfGgcC1YIfTD0h2eyOpcIKPjAyVZPaybOV-MJdDrhA1UKEWHT7ap4Fo=w1916-h855-s-no-gm)
![Api call](https://lh3.googleusercontent.com/pw/ADCreHc5Hbi31A4j6UEOQEmdeUCtCdoQnnukhPEl8SbNSavhfcp5y1qo_hMtdES5P9o9aKJX0rwsYMcRms0rAXlGBLroDEzmc9MQZCp7OrNiJvqrjZHwVuJXSkWnbteB-AyCsP0B9TDALyBXJyLsQ81XD8s=w672-h193-s-no-gm)
![Recipe Page](https://lh3.googleusercontent.com/pw/ADCreHcHwZl0IsnFEgNN5MS-wULTqY1j6TjiU1Zjimj1Na5yf_AIUYPyV-vt3l90d282s8COka0KSVSuHjAeJlB5yzG7K_o4sgjT5KmPWJKgFMRPPSAAYvjLiMlYa_0sverBpe93DK31laXczNhcv_jK1is=w1912-h857-s-no-gm)
![Inventory](https://lh3.googleusercontent.com/pw/ADCreHcrMpdJ4rK3-Rp0SYhz7bW7ZMEXjoB_JfLCAv0kJb-vO0cEZpTUJwMut1J-2uXl-LLgTQEqa8uavqsy6S-Qrcfj7ZO1Y6x6pKUH6Pch2bve-5YfIYNksiShTnwpiXUY7f9yDby75k3GRsPgEF99dsw=w1898-h855-s-no-gm)
![Specify Ingredient Amount](https://lh3.googleusercontent.com/pw/ADCreHeH-CyGG71E1VUChBNLdUeWyuzNZcSWe1J_b5cPTjRqXeH1n0Ud6wfI-1NmChcpIzPN0w6APlNcfg1hQi_Y4UfD2cZHhIE-0d8MJ_8cZjfjV0lkWF2oNAWbnaFy7elmf--COL8Fv1FmGDevFCheyGo=w748-h242-s-no-gm)
![Register](https://lh3.googleusercontent.com/pw/ADCreHe6CEJOna4zLpTgKlkGbt-iAW5HyqLCv9E84WwKwIWdmIQQsRUmtPPVqDFns0GmkEq9FK0-79pljUHv02EqnH2gMH9jJDm0kpY3AFGw_HrrwE91LyezE5ubASL3KRrYrXt4U-uRbuPxeeDJVzxgggQ=w1915-h857-s-no-gm)
![Bookmark](https://lh3.googleusercontent.com/pw/ADCreHfw61hV1Tj9HO-zrFjDUhdoTA7nJXHGdeH-GIFvpppIF_AGANwi1v_IZwURKk8W8yoSihTVoNrCdaho__FfS3uEuEM8x7njtnT4o6YSZUmFYnNSp1Ilbf3lYclUs4tP2o2nvr80hrv5dkLNPxwNsts=w1912-h853-s-no-gm)


## Authors

- [@Julio Ortega](https://www.github.com/PPicklee)
- [@Chris Veilleux](https://www.github.com/chris-veilleux)
- [@John Farrell](https://www.github.com/Superintendent-Vergil)

