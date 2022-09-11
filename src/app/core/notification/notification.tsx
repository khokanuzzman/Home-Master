import Toast from 'react-native-simple-toast';

export const notificationFn = (message: string) => {
    Toast.show(message);
}