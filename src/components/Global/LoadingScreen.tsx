"use client";

import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const LoadingScreen = () => (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={50} color="#ed770b" />
    </div>
);

export default LoadingScreen;
