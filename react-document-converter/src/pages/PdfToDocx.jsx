import { useState } from "react";
import api from "../api/api";

export default function PdfToDocx() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const convertFile = async () => {

        if (!file) {
            alert("Please select a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            setLoading(true);
            setMessage("");

            const response = await api.post(
                "/convert-to-docx",
                formData,
                {
                    responseType: "blob",

                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const blob = new Blob([
                response.data
            ], {
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            const filename =
                file.name.replace(".pdf", "") + ".docx";

            link.setAttribute("download", filename);

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            setMessage("PDF converted successfully!");

        } catch (error) {

            console.error(error);

            setMessage("Conversion Failed!");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="converter-container">

            <h1>📄 PDF → DOCX</h1>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br />
            <br />

            <button
                onClick={convertFile}
                disabled={loading}
            >
                {loading ? "Converting..." : "Convert to DOCX"}
            </button>

            <br />
            <br />

            {message && (
                <p>{message}</p>
            )}

        </div>
    );
}