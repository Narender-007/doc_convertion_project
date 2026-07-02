import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>

            <Link to="/docx-pdf">DOCX → PDF</Link>

            <Link to="/pdf-docx">PDF → DOCX</Link>

            <Link to="/image-pdf">Image → PDF</Link>

            <Link to="/pdf-image">PDF → Image</Link>

            <Link to="/images-pdf">Images → PDF</Link>
        </nav>
    );
}