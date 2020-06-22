
import { Alert } from "react-native";


export const twoButtonConfirmAlert = (title, message, pressOK, pressCancel) =>
    Alert.alert(
    title,
    message,
    [
        {
        text: "Cancel",
        onPress: () => pressCancel ? pressCancel() : null ,
        style: "cancel"
        },
        { text: "Yes", onPress: () => pressOK ? pressOK() : null }
    ],
    { cancelable: false }
);
