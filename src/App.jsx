import React, { useEffect, useState, useContext } from "react";
import "./popup.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="w-64 h-64  rounded-xl justify-center flex items-center p-6 border-red-500 text-red-500">
      <h1 className=" text-center text-xl italic">
        Hello, This is just A Rect Chrome Extention BoilerPlate
      </h1>
    </div>
  );
};

export default App;
