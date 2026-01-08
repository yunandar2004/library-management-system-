"use client";
import React, { useState } from "react";

function ProfileUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }


  };

  return (
    <div>
      <h2>Upload Profile Picture</h2>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      )}

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ProfileUpload;
