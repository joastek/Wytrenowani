"use client";
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
      <div className="flex flex-col  justify-center text-center my-auto mx-12 h-full">
        <h2 className="">{quoteText}</h2>
        <p className="justify-end text-end">~ {quoteAuthor}</p>
      </div>
    </>
  );
};

export default MotivationalQuotes;
