import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheet } from '@capacitor/action-sheet';
import { useState } from 'react';
export function useCameraService() {
    const [imagelink ,setImageLink]=useState('');
  const upload = async()=> {
    const actionSheet = await ActionSheet.showActions({
      options: [
        {
          title: 'Take Photo',
        },
        {
          title: 'Choose From Gallery',
        },
        {
          title: 'Cancel',
        },
      ],
    });

    if (actionSheet.index == 0) {
       await addImage(CameraSource.Camera);
    } else if (actionSheet.index == 1) {
       await addImage(CameraSource.Photos);
    }else{
    }
  }

  const addImage=async(source: CameraSource)=> {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      saveToGallery: false,
      source,
    });
    const data = `data:image/${image.format};base64,` + image.base64String;
    setImageLink(data);
  }
  const deleteImageLink= async () => {
    setImageLink('');
  };
  const  uploadFile=async()=> {
    let data:any={
      'error':false,
      'message':'No message',
       'ext':'',
       'fileName':'',
       'file_Path':'',
       'bs64':ArrayBuffer,
     }
    try {
      let input = document.createElement('input');
      input.type = 'file';
      input.accept="application/pdf"
      input.onchange=($event:any)=>{
    var ext = $event.target.files[0]['name'].split('.').pop();
    if ($event.target.files[0].size < 5000000) {
      const file = $event.target.files[0];
      const fileExtension = file.type;
      const fileName = file.name;
      if (fileExtension === 'application/pdf') {
        const file_Path =URL.createObjectURL(file);
        const newInstance = getFileReader();
        newInstance.readAsDataURL(file);
        newInstance.onload = (imgsrc:any) => {
          const bs64 = (imgsrc.target as FileReader).result;
        console.log(bs64,'bs64');
       return data={
          'error':false,
          'message':'No message',
          'ext':ext,
          'fileName':fileName,
          'file_Path':file_Path,
          'bs64':bs64,
        }
        };
      } else{
        return data={
          'error':true,
          'message':'Only PDF files are allowed',
          'ext':ext,
          'fileName':'',
          'file_Path':'',
          'bs64':'',
         }
      }
    }  else{
      return data={
        'error':true,
        'message':'file should be less than 5 mb',
        'ext':ext,
        'fileName':'',
        'file_Path':'',
        'bs64':'',
       }
    }
    console.log(data,'data');
    return data;
    }
    input.click();
  } catch (error) {
  //  console.log(error);
  }
  }

  const getFileReader=(): FileReader =>{
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)[
      '__zone_symbol__originalInstance'
    ];
    return zoneOriginalInstance || fileReader;
  }
  return {
    uploadFile,
    upload,
    imagelink,
    deleteImageLink
  };
}
