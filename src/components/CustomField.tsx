import { IonIcon, IonInput, IonLabel } from "@ionic/react";
import styles from "./CustomField.module.scss";

const CustomField = ({ field, errors }: any) => {

    const error = errors && errors.filter((e: any) => e.id === field.id)[0];
    const errorMessage = error && errors.filter((e: any) => e.id === field.id)[0].message;
    return (
        <div className={styles.field}>
            {field.label && <IonLabel className={styles.fieldLabel}>
                {field.label}
                {error && <p className="animate__animated animate__bounceIn">{errorMessage}</p>}
            </IonLabel>}
            {!field.label && <IonLabel className={styles.fieldLabel}>
                {error && <p className="animate__animated animate__bounceIn">{errorMessage}</p>}
            </IonLabel>}
            <IonInput {...field.input.props} {...field.input.state} maxlength={50}>
                {field.icon && <IonIcon slot="start" icon={field.icon} aria-hidden="true" ></IonIcon>}
            </IonInput>
        </div>
    );
};

export default CustomField;