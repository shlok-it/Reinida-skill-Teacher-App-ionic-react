import { IonAvatar, IonImg, IonSpinner } from "@ionic/react";
import { deviceInfo } from "../hooks/deviceInfo";
import { useCameraService } from "../hooks/useCameraService";
import { useStateContext } from "../contexts/ContextProvider";
import BaseUrl from "../connect/Config";
import { userplaceholder } from "../connect/Images";
import { apiCall } from "../connect/api";
import { useEffect, useState } from "react";
import PreviewPhotoModal from "./ProfileImageConform_modal";
export const ProfileImage = () => {
  const { currentUser, setCurrentUser, showToast }: any = useStateContext();
  const { upload, imagelink, deleteImageLink } = useCameraService();
  const { devideInfo } = deviceInfo();
  const { call_secure_api } = apiCall();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  useEffect(() => {
    setIsLoader(false);
    if (imagelink) {
      setIsOpen(true);
    }
  }, [imagelink]);
  const uploadPhoto = () => {
    const dataparam = {
      profile_pic: imagelink,
      device_info: devideInfo,
    };
    setIsLoader(true);
    modalHandler();
    call_secure_api("profile/pic-upload", dataparam).then(
      async (resolve: any) => {
        if (resolve.status === true) {
          showToast("successfully updated",'top','success');
          setCurrentUser((oldPrev: any) => ({
            ...oldPrev,
            image_link: resolve.data,
          }));
          // modalHandler();
        } else {
          showToast(resolve.data,'top','danger');
        }
        setIsLoader(false);
      },
      (reject: any) => {
        showToast("Server Error");
      }
    );
  };
  const uploadfun = async (e: any) => {
    const image = await upload();
  };
  const modalHandler = () => {
    setIsOpen(false);
    deleteImageLink();
  };
  return (
    <div>
      <PreviewPhotoModal
        isOpen={isOpen}
        photos={imagelink}
        uploadPhoto={uploadPhoto}
        modalHandler={modalHandler}
      />
      {isLoader ? (
        <IonSpinner></IonSpinner>
      ) : (
        <IonAvatar onClick={(e) => uploadfun(e)}>
          <IonImg
            src={
              currentUser.image_link
                ? BaseUrl.resource_url + "/" + currentUser?.image_link
                : userplaceholder
            }
          />
        </IonAvatar>
      )}
    </div>
  );
};
