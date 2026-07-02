import { useState } from "react";
import api from "../api/api";

export default function MultipleImagesToPdf() {

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {

        setFiles(Array.from(e.target.files));

    };

    const convertImages = async () => {

        if (files.length === 0) {

            alert("Please select images.");

            return;
        }

        const formData = new FormData();

        files.forEach((file) => {

            formData.append("files", file);

        });

        try {

            setLoading(true);

            setMessage("");

            const response = await api.post(

                "/convert-multiple-images-to-pdf",

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

            link.download = "merged_images.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            setMessage("PDF Generated Successfully!");

        }

        catch (err) {

            console.log(err);

            setMessage("Conversion Failed");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="converter-container">

            <h1>🖼 Multiple Images → PDF</h1>

            <input

                type="file"

                multiple

                accept=".jpg,.jpeg,.png"

                onChange={handleFileChange}

            />

            <br /><br />

            {

                files.length > 0 &&

                <div>

                    <h3>

                        Selected Images ({files.length})

                    </h3>

                    {

                        files.map((file, index) => (

                            <div key={index}>

                                {file.name}

                            </div>

                        ))

                    }

                </div>

            }

            <br />

            <button

                onClick={convertImages}

                disabled={loading}

            >

                {

                    loading

                        ? "Converting..."

                        : "Convert"

                }

            </button>

            <br /><br />

            {message}

        </div>

    );

}