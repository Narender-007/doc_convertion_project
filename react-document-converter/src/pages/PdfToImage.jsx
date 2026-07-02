import { useState } from "react";
import api from "../api/api";

export default function PdfToImage() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const convertFile = async () => {

        if (!file) {
            alert("Please select a PDF file");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            setLoading(true);

            setMessage("");

            const response = await api.post(
                "/convert-pdf-to-image",
                formData,
                {
                    responseType: "blob",

                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            const blob = new Blob([response.data], {
                type: "application/zip"
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download = "images.zip";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            setMessage("Conversion Successful");

        } catch (err) {

            console.log(err);

            setMessage("Conversion Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="converter-container">

            <h1>📄 PDF → Images</h1>

            <input
                type="file"
                accept=".pdf"
                onChange={(e)=>setFile(e.target.files[0])}
            />

            <br/><br/>

            <button
                onClick={convertFile}
                disabled={loading}
            >

                {loading
                    ? "Converting..."
                    : "Convert"}

            </button>

            <br/><br/>

            {message}

        </div>

    );

}