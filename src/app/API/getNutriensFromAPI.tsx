export async function getNutriensFromAPI(
  amountOfNutrien: string,
  nameOfNutrien: void
) {
  const apiKey = process.env.NEXT_PUBLIC_NUTRIENS_KEY || "";
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

  return {
    caloriesNutrien,
    proteinNutrien,
    carboNutrien,
    fatNutrien,
  };
}
