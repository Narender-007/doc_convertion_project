#  write the fast api code to convert docx to pdf using libreoffice in mac os
from pydoc import doc
import subprocess

from fastapi import FastAPI
from pymupdf import Document

app = FastAPI()
import pdfplumber
from docx import Document

from fastapi import UploadFile, File
import shutil
import tempfile
import os
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
#  add the cors code


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/convert-to-pdf")
async def convert_to_pdf(file: UploadFile = File(...)):
    temp_dir = tempfile.mkdtemp()

    input_path = os.path.join(temp_dir, file.filename)

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    subprocess.run([
        "/Applications/LibreOffice.app/Contents/MacOS/soffice",
        "--headless",
        "--convert-to", "pdf",
        input_path,
        "--outdir", temp_dir
    ], check=True)

    pdf_path = os.path.join(
        temp_dir,
        file.filename.replace(".docx", ".pdf")
    )

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="converted.pdf"
    )

# @app.post("/convert-to-pdf")
# def convert_to_pdf(input_file: str, output_dir: str = "."):
#     subprocess.run([
#         "/Applications/LibreOffice.app/Contents/MacOS/soffice",
#         "--headless",
#     "--convert-to",
#     "pdf",
#     input_file,
#     "--outdir",
#     output_dir
# ], check=True)
#     # return status code and status message 
#     return {"message": "PDF generated successfully!"}

#  now i am here writing to the document to pdf using libreoffice in mac os
#  need to add the fast api code to convert pdf to docx using pdfplumber and docx library in mac os

from fastapi import UploadFile, File
from fastapi.responses import FileResponse

import tempfile
import shutil
import os

from docx import Document
import pdfplumber

@app.post("/convert-to-docx")
async def convert_to_docx(file: UploadFile = File(...)):

    temp_dir = tempfile.mkdtemp()

    pdf_path = os.path.join(temp_dir, file.filename)

    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    output_file = os.path.splitext(pdf_path)[0] + ".docx"

    doc = Document()

    with pdfplumber.open(pdf_path) as pdf:

        for page in pdf.pages:

            text = page.extract_text()

            if text:
                doc.add_paragraph(text)

    doc.save(output_file)

    return FileResponse(
        output_file,
        filename=os.path.basename(output_file),
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )

#  here need to write the fast api code image to pdf using pillow library in mac os
from fastapi import UploadFile, File
from fastapi.responses import FileResponse

import tempfile
import shutil
import os

from PIL import Image


@app.post("/convert-image-to-pdf")
async def convert_image_to_pdf(
    file: UploadFile = File(...)
):

    temp_dir = tempfile.mkdtemp()

    image_path = os.path.join(
        temp_dir,
        file.filename
    )

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image = Image.open(image_path)

    if image.mode != "RGB":
        image = image.convert("RGB")

    output_pdf = os.path.join(
        temp_dir,
        os.path.splitext(file.filename)[0] + ".pdf"
    )

    image.save(output_pdf)

    return FileResponse(
        output_pdf,
        filename=os.path.basename(output_pdf),
        media_type="application/pdf"
    )

# here need to write the fast api code to convert pdf to image using pdf2image library in mac os
from pdf2image import convert_from_path

from fastapi import UploadFile, File
from fastapi.responses import FileResponse

import tempfile
import shutil
import os
import zipfile

from pdf2image import convert_from_path


@app.post("/convert-pdf-to-image")
async def convert_pdf_to_image(
        file: UploadFile = File(...)
):

    temp_dir = tempfile.mkdtemp()

    pdf_path = os.path.join(
        temp_dir,
        file.filename
    )

    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    images = convert_from_path(pdf_path)

    image_folder = os.path.join(
        temp_dir,
        "images"
    )

    os.makedirs(image_folder)

    for i, image in enumerate(images):

        image.save(

            os.path.join(
                image_folder,
                f"page_{i+1}.png"
            ),

            "PNG"

        )

    zip_path = os.path.join(
        temp_dir,
        "images.zip"
    )

    with zipfile.ZipFile(
        zip_path,
        "w",
        zipfile.ZIP_DEFLATED
    ) as zipf:

        for image in os.listdir(image_folder):

            zipf.write(

                os.path.join(
                    image_folder,
                    image
                ),

                arcname=image

            )

    return FileResponse(

        zip_path,

        filename="images.zip",

        media_type="application/zip"

    )
    
# multiple images to pdf using pillow library in mac os
from fastapi import UploadFile, File
from fastapi.responses import FileResponse

from typing import List

import tempfile
import shutil
import os

from PIL import Image


@app.post("/convert-multiple-images-to-pdf")
async def convert_multiple_images_to_pdf(

        files: List[UploadFile] = File(...)

):

    temp_dir = tempfile.mkdtemp()

    images = []

    for file in files:

        path = os.path.join(

            temp_dir,

            file.filename

        )

        with open(path, "wb") as buffer:

            shutil.copyfileobj(

                file.file,

                buffer

            )

        image = Image.open(path)

        if image.mode != "RGB":

            image = image.convert("RGB")

        images.append(image)

    output_pdf = os.path.join(

        temp_dir,

        "merged_images.pdf"

    )

    images[0].save(

        output_pdf,

        save_all=True,

        append_images=images[1:]

    )

    return FileResponse(

        output_pdf,

        filename="merged_images.pdf",

        media_type="application/pdf"

    )