import React from "react";
import {Routes, Route} from "react-router-dom";

import FileUpload from "./components/FileUpload";
import FetchUploadedFiles from "./components/FetchUploadedFiles";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import FilesWithAccess from "./components/FilesWithAccess";

const App = () => {
  return (
    <div className="mx-auto">
      <div className="h-[12vh]">
        <Navbar />
      </div>

      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/upload-file" element={<FileUpload />}></Route>
          <Route path="/my-files" element={<FetchUploadedFiles />}></Route>
          <Route path="/access-files" element={<FilesWithAccess />}></Route>
        </Routes>{" "}
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default App;
