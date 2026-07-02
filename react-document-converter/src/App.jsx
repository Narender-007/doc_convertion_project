import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";

import DocxToPdf from "./pages/DocxToPdf";
import PdfToDocx from "./pages/PdfToDocx";
import ImageToPdf from "./pages/ImageToPdf";
import PdfToImage from "./pages/PdfToImage";
import MultipleImagesToPdf from "./pages/MultipleImagesToPdf";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="container">

            <h1>📄 Document Converter</h1>

            <div className="card-container">

                <div className="card">
                    <h3>DOCX → PDF</h3>
                    <button onClick={() => navigate("/docx-pdf")}>
                        Open
                    </button>
                </div>

                <div className="card">
                    <h3>PDF → DOCX</h3>
                    <button onClick={() => navigate("/pdf-docx")}>
                        Open
                    </button>
                </div>

                <div className="card">
                    <h3>IMAGE → PDF</h3>
                    <button onClick={() => navigate("/image-pdf")}>
                        Open
                    </button>
                </div>

                <div className="card">
                    <h3>PDF → IMAGE</h3>
                    <button onClick={() => navigate("/pdf-image")}>
                        Open
                    </button>
                </div>

                <div className="card">
                    <h3>Multiple Images → PDF</h3>
                    <button onClick={() => navigate("/multiple-images-pdf")}>
                        Open
                    </button>
                </div>

            </div>

        </div>

    );
}

function App() {

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/docx-pdf" element={<DocxToPdf />} />

            <Route path="/pdf-docx" element={<PdfToDocx />} />

            <Route path="/image-pdf" element={<ImageToPdf />} />

            <Route path="/pdf-image" element={<PdfToImage />} />

            <Route path="/multiple-images-pdf" element={<MultipleImagesToPdf />} />

        </Routes>

    );
}

export default App;