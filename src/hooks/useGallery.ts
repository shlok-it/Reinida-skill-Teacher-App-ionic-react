import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { toast } from "react-toastify";
export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
    location?: string;
    device?: string;
}

export function useGallery() {
const [photos, setPhotos] = useState('');
  const takePhoto = async () => {

    if (!isPlatform('hybrid')) {
      toast.error("device not supported");
      return
    }
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
    //   source: CameraSource.Camera,
      quality: 30,
      saveToGallery: false,
    });
    const fileExtension = photo.format;
    const imageName = new Date().getTime() + "." + fileExtension;
    const file_Path = imageName;
    if (fileExtension == 'jpeg' || fileExtension == 'JPEG') {
        const imgdata = `data:image/${fileExtension};base64,` + photo.base64String;
        setPhotos(imgdata);
      } else {
        toast.error('Only JPEG file type is Allowed')
      }
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

export async function base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('method did not return a string');
            }
        };
        reader.readAsDataURL(blob);
    });

    
}