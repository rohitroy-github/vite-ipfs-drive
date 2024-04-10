import React from "react";
import {Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import FileUpload from "./components/FileUpload";
import FetchUploadedFiles from "./components/FetchUploadedFiles";
import FilesWithAccess from "./components/FilesWithAccess";

const App = () => {
  return (
    <div className="h-screen">
      <div className="h-[10vh]">
        <Navbar />
      </div>

      <div className="h-[84vh]">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/upload-file" element={<FileUpload />}></Route>
          <Route path="/my-files" element={<FetchUploadedFiles />}></Route>
          <Route path="/access-files" element={<FilesWithAccess />}></Route>
        </Routes>{" "}
      </div>

      <div className="h-[6vh]">
        <Footer />
      </div>
    </div>
  );
};

export default App;
