import { BrowserRouter,Routes,Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import DocxToPdf from "./pages/DocxToPdf";

import PdfToDocx from "./pages/PdfToDocx";


import ImageToPdf from "./pages/ImageToPdf";
import PdfToImage from "./pages/PdfToImage";

import MultipleImagesToPdf from "./pages/MultipleImagesToPdf";

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/docx-pdf" element={<DocxToPdf/>}/>

<Route path="/pdf-docx" element={<PdfToDocx/>}/>

<Route path="/image-pdf" element={<ImageToPdf />}/>

<Route path="/pdf-image" element={<PdfToImage/>}/>

<Route path="/images-pdf" element={<MultipleImagesToPdf/>}/>

</Routes>

</BrowserRouter>

)

}

export default App;