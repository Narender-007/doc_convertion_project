import { useState } from "react";
import api from "../api/api";

export default function ImageToPdf() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const convertFile = async () => {

        if (!file) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            setLoading(true);
            setMessage("");

            const response = await api.post(
                "/convert-image-to-pdf",
                formData,
                {
                    responseType: "blob",

                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            const blob = new Blob([response.data], {
                type: "application/pdf"
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            const filename =
                file.name.split(".")[0] + ".pdf";

            link.setAttribute("download", filename);

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            setMessage("Image converted successfully!");

        } catch (error) {

            console.error(error);

            setMessage("Conversion Failed!");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="converter-container">

            <h1>🖼️ Image → PDF</h1>

            <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br /><br />

            {file && (

                <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    width="250"
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px"
                    }}
                />

            )}

            <br /><br />

            <button
                onClick={convertFile}
                disabled={loading}
            >

                {loading
                    ? "Converting..."
                    : "Convert to PDF"}

            </button>

            <br /><br />

            {message && (
                <h3>{message}</h3>
            )}

        </div>

    );

}