import { useEffect } from 'react';
import { useState, } from 'react';
import { isPlatform } from '@ionic/react';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { toast } from "react-toastify";

export function usePhoto() {
  const [photos, setPhotos] = useState('');
  const takePhoto = async () => {

    if (!isPlatform('hybrid')) {
      toast.error("device not supported");
      return
    }
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 20,
      saveToGallery: false,
    });
    const fileExtension = photo.format;
    const imageName = new Date().getTime() + "." + fileExtension;
    const file_Path = imageName;
    const imgdata = `data:image/${fileExtension};base64,` + photo.base64String;
    setPhotos(imgdata);
  };

  const deletePhoto = async () => {
    setPhotos('');
  };
  return {
    photos,
    takePhoto,
    deletePhoto
  };
}
