/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
// import { useState, useEffect } from "react";

import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/Navbar";
// import fireBase from "./components/FireBase";

function App() {
  return (
    <div>
      <Navbar />
      <MainRoutes />
    </div>
  );
}

export default App;
