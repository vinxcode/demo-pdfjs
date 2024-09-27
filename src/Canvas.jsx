import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = () => {
    const sigCanvas = useRef({});

    const clear = () => {
        sigCanvas.current.clear();
    };

    const save = () => {
        const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        console.log(signature);
    };

    return (
        <section className='flex flex-col gap-2 mx-auto'>
            <h3>Draw your signature</h3>
            <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ width: 600, height: 200, className: 'border-2 border-gray-600 rounded-lg'}}
            />
            <div className='flex gap-3 justify-end'>
                <button className='bg-gray-600 px-10 py-2 rounded-lg text-white font-light hover:bg-gray-500' onClick={clear}>Clear</button>
                <button className='bg-gray-600 px-10 py-2 rounded-lg text-white font-light hover:bg-gray-500' onClick={save}>Save</button>
            </div>
        </section>
    );
};

export default SignaturePad;
