import { useState } from "react";
import api from "../api/api";

export default function DocxToPdf() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const convertFile = async () => {

        if (!file) {
            alert("Please select a DOCX file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);

            const response = await api.post(
                "/convert-to-pdf",
                formData,
                {
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;
            link.download = "converted.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (err) {
            console.error(err);
            alert("Conversion Failed");
        }

        setLoading(false);
    };

    return (
        <div style={{ padding: "40px" }}>

            <h2>DOCX → PDF</h2>

            <input
                type="file"
                accept=".docx"
                onChange={(e)=>setFile(e.target.files[0])}
            />

            <br/><br/>

            <button onClick={convertFile}>
                {loading ? "Converting..." : "Convert"}
            </button>

        </div>
    );
}