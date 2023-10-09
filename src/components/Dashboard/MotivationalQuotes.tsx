import React, { useState, useEffect } from "react";

const MotivationalQuotes = () => {
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");

  useEffect(() => {
    const fetchRandomQuote = () => {
      const quotes = [
        {
          text: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
        },
        {
          text: "Don't watch the clock; do what it does. Keep going.",
          author: "Sam Levenson",
        },
        {
          text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
          author: "Winston Churchill",
        },
        {
          text: "Believe you can and you're halfway there.",
          author: "Theodore Roosevelt",
        },
        {
          text: "The Man who says he can, and the man who says he can not. Are both correct.",
          author: "Confusius",
        },
      ];

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuoteText(randomQuote.text);
      setQuoteAuthor(randomQuote.author);
    };

    fetchRandomQuote(); // Wywołaj funkcję przy montowaniu komponentu
  }, []); // Pusta zależność oznacza, że useEffect będzie uruchamiany tylko raz, po zamontowaniu komponentu

  return (
    <>
      <h2 className="absolute top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        {quoteText}
      </h2>
      <p className="absolute top-[50%] left-[70%] translate-x-[-50%] translate-y-[-50%] z-50">
        ~ {quoteAuthor}
      </p>
    </>
  );
};

export default MotivationalQuotes;
