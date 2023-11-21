const { default: axios } = require("axios");


const uploadImage = async (newImage) => {
    let image = newImage;
    const formData = new FormData();
    try {
        formData.append("file", image);
        formData.append("upload_preset", "lhdtso3x");
        const res = await axios
            .post(
                `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`,
                formData
            )
        image = res.data.secure_url;
    } catch {
        throw new Error('Image upload is unsuccessfully!');
    }
    return image;
}

export default uploadImage;