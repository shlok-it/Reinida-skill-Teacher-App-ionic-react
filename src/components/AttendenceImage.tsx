import {
  IonCol,
  IonGrid,
  IonImg,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";

export const AttendenceImage = (props: any) => {
  const isValidJSON = (str: any) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };
  return (
    <IonGrid>
      <IonRow className="ion-home-container">
        {props.images.map((item: any, index: number) => {
          if (isValidJSON(item.location)) {
            item.location = JSON.parse(item.location);
          }
          return (
            <IonCol size="6" key={index}>
              <div className="attendence_image ">
                <IonImg src={props.baseUrl + "/" + item.image_link} />
                {item.location ? (
                  <div className="attendence-footer">
                    <IonLabel className="location_info">
                      <IonText>
                        {item.location["longitude"]
                          ? item.location["longitude"]
                          : ""}
                        {item.location["longitude"]
                          ? ", " + item.location["longitude"]
                          : ""}
                        {item.location["subLocality"]
                          ? ", " + item.location["subLocality"]
                          : ""}
                        {item.location["locality"]
                          ? ", " + item.location["locality"]
                          : ""}
                        {item.location["countryName"]
                          ? ", " + item.location["countryName"]
                          : ""}
                        {item.location["postalCode"]
                          ? ", " + item.location["postalCode"]
                          : ""}
                          <br />
                          {item.created_at}
                      </IonText>
                    </IonLabel>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </IonCol>
          );
        })}
      </IonRow>
    </IonGrid>
  );
};
