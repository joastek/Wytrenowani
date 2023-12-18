import translate from "google-translate-api-x";

export function getTranslate(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    translate(text, { to: "en" })
      .then((res) => resolve(res.text))
      .catch((error) => reject(error));
  });
}
