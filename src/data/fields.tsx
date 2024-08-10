import { lockClosedOutline, mailOutline, personOutline } from "ionicons/icons";
import { useFormInput } from "./utils";

export const useSignupFields = () => {
    return [
        {
            id: "name",
            icon: personOutline,
            required: true,
            input: {
                props: {
                    type: "text",
                    placeholder: "Enter your name"
                },
                state: useFormInput("")
            }
        },
        {
            id: "email",
            required: true,
            icon: mailOutline,
            input: {
                props: {
                    type: "email",
                    placeholder: "enter your email"
                },
                state: useFormInput("")
            }
        }
    ];
}

export const useLoginFields = () => {

    return [

        {
            id: "email",
            icon: personOutline,
            required: true,
            input: {

                props: {
                    type: "text",
                    placeholder: "Username"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            icon: lockClosedOutline,
            required: true,
            input: {

                props: {
                    type: "password",
                    placeholder: "Password"
                },
                state: useFormInput("")
            }
        }
    ];
}

export const usePasswordFields = () => {

    return [

        {
            id: "old_password",
            icon: lockClosedOutline,
            required: true,
            input: {

                props: {
                    type: "password",
                    placeholder: "Old Password"
                },
                state: useFormInput("")
            }
        },
        {
            id: "new_password",
            icon: lockClosedOutline,
            required: true,
            input: {

                props: {
                    type: "password",
                    placeholder: "New Password"
                },
                state: useFormInput("")
            }
        },
        {
            id: "confirm_password",
            icon: lockClosedOutline,
            required: true,
            input: {

                props: {
                    type: "password",
                    placeholder: "Confirm Password"
                },
                state: useFormInput("")
            }
        }
    ];
}