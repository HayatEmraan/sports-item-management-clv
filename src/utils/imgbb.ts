/* eslint-disable @typescript-eslint/no-explicit-any */
const ImgBBKey = "bf0dafd4e153b1ac1b50417940e2b251";

export const uploadImg = async (file: any) => {
  const formData = new FormData();
  formData.append("image", file);

  const upload = await fetch(
    `https://api.imgbb.com/1/upload?expiration=600&key=${ImgBBKey}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const res = await upload.json();
  return res.data.url;
};
