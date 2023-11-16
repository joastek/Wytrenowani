import translate from "google-translate-api-x";

const getTranslate = async () => {
  try {
    const res = await translate("Ik spreek Engels", { to: "en" });
    console.log(res);
    return <><div className="text-2xl">{res.text}</div></>
  } catch (error) {
    console.error("Translation error:", error);
    throw error; // Rzuć błąd, aby później móc go obsłużyć
  }
  
};

export default getTranslate;
