import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import TextInput from '../../components/TextInput';
import { notificationFn } from '../../core/notification/notification';
import { theme } from '../../core/theme';
import { emailValidator, passwordValidator } from '../../core/utils';

const LoginScreen = (props: any) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [savedEmail, setSavedEmail] = useState("");
    const [savedPassword, setSavedPassword] = useState("");

    const _onLoginPressed = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        signInpWithEmailPass(email.value, password.value);

    };

    const signInpWithEmailPass = (email: string, password: string) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                props.navigation.replace('dashboard');
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    notificationFn("The password is invalid or the user does not have a password");
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }


    return (
        <Background>
            {/* <BackButton goBack={() => props.navigation.goBack()} /> */}

            <Logo />

            <Header>Welcome back.</Header>

            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('forgot')}
                >
                    <Text style={styles.label}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>

            <Button mode="contained" onPress={_onLoginPressed}>
                Login
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('register')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default LoginScreen;
