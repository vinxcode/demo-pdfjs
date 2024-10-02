import React, { useState } from 'react';

const ImageUploader = () => {
    // Estado para guardar la imagen
    const [image, setImage] = useState(null);

    // Manejar la subida de imagen
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {image && (
                <div>
                    <h3>Imagen seleccionada:</h3>
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Imagen seleccionada"
                        width="200"
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
