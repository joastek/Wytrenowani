import axios from "axios";

export const translateText = async (text: string) => {
  try {
    const { data } = await axios.post(
      "https://text-translator2.p.rapidapi.com/translate",
      new URLSearchParams({
        source_language: "pl",
        target_language: "en",
        text: text,
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_TRANSLATE_KEY,
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
      }
    );

    return data.data.translatedText;
  } catch (error) {
    console.error(error);
    return "Translation failed";
  }
};
