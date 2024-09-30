import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { PDFDocument, rgb } from 'pdf-lib';

const SignaturePad = () => {
    const sigCanvas = useRef({});
    const [pdfFile, setPdfFile] = useState(null);


    const clear = () => {
        sigCanvas.current.clear();
    };

    const saveSignature = () => {
        const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        return signature;
    };

    // STARTING CODE FOR PDF MANAGEMENT
    // ***************************************************************

    const handlePdfUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const pdfData = e.target.result;
            setPdfFile(pdfData); // Guardamos el PDF en base64
        };

        reader.readAsArrayBuffer(file); // Leer el archivo PDF
    };

    const insertSignatureInPdf = async () => {
        
        if (!pdfFile) {
            alert('Please upload a PDF first.');
            return;
        }

        // Cargar el PDF usando pdf-lib
        const pdfDoc = await PDFDocument.load(pdfFile);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Obtener la firma en base64
        const signatureImageBase64 = saveSignature();

        // Convertir la imagen base64 a un formato compatible con pdf-lib
        const signatureImageBytes = await fetch(signatureImageBase64).then(res => res.arrayBuffer());
        const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

        // Establecer el tamaño y la posición donde se colocará la firma
        const signatureDims = signatureImage.scale(0.5); // Ajusta el tamaño de la firma aquí
        firstPage.drawImage(signatureImage, {
            x: 200, // Coordenada X (ajustar según necesidad)
            y: 260, // Coordenada Y (ajustar según necesidad)
            width: signatureDims.width,
            height: signatureDims.height,
        });

        // Descargar el PDF modificado
        const pdfBytes = await pdfDoc.save();
        download(pdfBytes, "signed_document.pdf", "application/pdf");
    };

    // Función para descargar el archivo PDF
    const download = (data, filename, mime) => {
        const blob = new Blob([data], { type: mime });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };

    return (
        <section className='flex flex-col gap-2 mx-auto w-full'>
            <h3>Draw your signature</h3>
            <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ width: 600, height: 200, className: 'border-2 border-gray-600 rounded-lg' }}
            />
            <div className='flex gap-3 justify-end'>
                <button className='bg-gray-600 px-10 py-2 rounded-lg text-white font-light hover:bg-gray-500' onClick={clear}>Clear</button>
                {/* <button className='bg-gray-600 px-10 py-2 rounded-lg text-white font-light hover:bg-gray-500' onClick={save}>Save</button> */}
            </div>
            <h3>Upload a PDF</h3>
            <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
            <button onClick={insertSignatureInPdf}
            className='bg-gray-600 px-10 py-2 rounded-lg text-white font-light hover:bg-gray-500'>Sign and Download</button>
        </section>
    );
};

export default SignaturePad;
