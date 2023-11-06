"use client";
import React, { useState, useEffect } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <div>Modalsss</div>;
};

export default ModalProvider;
