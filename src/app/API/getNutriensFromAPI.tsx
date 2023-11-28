export async function getNutriensFromAPI(
  amountOfNutrien: string,
  nameOfNutrien: void
) {
  const apiKey = "rTU4Ta3bWeja9oPWfA0LhQ==1lRq3dJcu6pA0IT4";
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  const apiURL =
    "https://api.api-ninjas.com/v1/nutrition?query=" +
    amountOfNutrien +
    "g" +
    " " +
    nameOfNutrien;

  const response = await fetch(apiURL, options);
  const data = await response.json();

  const proteinNutrien = data[0].protein_g;
  const carboNutrien = data[0].carbohydrates_total_g;
  const fatNutrien = data[0].fat_total_g;
  const caloriesNutrien = data[0].calories;
  console.log(caloriesNutrien);
  return {
    caloriesNutrien,
    proteinNutrien,
    carboNutrien,
    fatNutrien,
  };
}
console.log("teeest");
