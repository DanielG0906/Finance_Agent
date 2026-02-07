import React, {useState} from 'react';
import {TextInput, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal,} from "react-native";
import {createEmailPasswordSession, getCurrentUser, createNewAccount, deleteSession} from "@/services/appWrite";
import {useRouter} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";
import InputComponent from "@/components/InputComponent";
import icons from "@/constants/icons";
import {LinearGradient} from "expo-linear-gradient";
import images from "@/constants/images";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import GlobalFloatingButton from "@/app/GlobalFloatingButton";
import SuccessCreateAccountComponent from "@/components/SuccessCreateAccountComponent";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const {setUser, toggleLanguage} = useGlobalContext();
    const { t } = useTranslation();
    const isRTL = i18n.language === 'he';
    const [userNameFocused, setUserNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passFocused, setPassFocused] = useState(false);
    const [firstNameFocused, setFirstNameFocused] = useState(false);
    const [lastNameFocused, setLastNameFocused] = useState(false);
    const [createAccountFlag, setCreateAccountFlag] = useState(false);
    const [gender, setGender] = useState<'male' | 'female' | null>(null);

    const [showSuccess, setShowSuccess] = useState(false);

    const [errorUserName, setErrorUserName] = useState<string | null>(null);
    const [errorEmail, setErrorEmail] = useState<string | null>(null);
    const [errorPassword, setErrorPassword] = useState<string | null>(null);
    const [errorFirstName, setErrorFirstName] = useState<string | null>(null);
    const [errorLastName, setErrorLastName] = useState<string | null>(null);
    const [errorGender, setErrorGender] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState(false);


    const signIn = async () => {
        try {
            try { await deleteSession('current'); } catch (e) { }
            await createEmailPasswordSession(email, userPassword);
            const user = await getCurrentUser();
            setUser(user);
            router.replace("/(tabs)");
        } catch (e: any) {
            console.log("Sign in error:", e.message);
        }
    }

    const checkInputs = async () => {
        if(!email || !userName || !userPassword || !gender || !firstName || !lastName) {
            setErrorEmail(!email ? 'error_email' : null);
            setErrorUserName(!userName ? 'error_username' : null);
            setErrorPassword(!userPassword ? 'error_password' : null);
            setErrorGender(!gender ? 'error_gender' : null);
            setErrorFirstName(!firstName ? 'error_first' : null);
            setErrorLastName(!lastName ? 'error_last' : null);
        } else {
            try {
                await createNewAccount(email,userPassword,userName,gender);
                setShowSuccess(true);
            } catch (e) { console.log(e); }
        }
    }

    const goBack = async () => {
        setCreateAccountFlag(false);
        setErrorEmail(""); setErrorUserName(""); setErrorPassword(""); setErrorGender(null);
        setEmail(""); setUserName(""); setUserPassword(""); setGender(null);setFirstName(""); setLastName("");
    }

    const createAccount = async () => {
        setCreateAccountFlag(true);
        setErrorEmail(""); setErrorPassword(""); setErrorGender(null);
        setEmail(""); setUserPassword("");
    }



    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="flex-1">
                {/* רקע גרדיאנט קבוע לכל המסך */}
                <LinearGradient
                    colors={['#f0f9f4', '#bbd8c0', '#8ac6a0']}
                    locations={[0, 0.7, 1]} // הירוק יתחיל רק ב-70% מהגובה, ככה הוא לא יקפוץ למעלה מדי
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    }}
                />

                <KeyboardAwareScrollView
                    enableOnAndroid
                    extraScrollHeight={80}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    keyboardOpeningTime={0}
                    showsVerticalScrollIndicator={false}
                >

                    <View className="flex-1">
                        <GlobalFloatingButton/>
                        {!createAccountFlag && (
                            <View className="items-center" style={{ marginTop: 40 }}>
                                <Text className="text-[#1a3d2f] font-black tracking-tighter" style={{ fontSize: 50 }}>
                                    MIND<Text className="text-green-600">WEALTH</Text>
                                </Text>
                                <Text className="text-gray-500 font-medium text-lg mt-1">
                                    {t('welcome_sub')}
                                </Text>
                            </View>
                        )}

                        {!createAccountFlag && (
                            <View className="items-center" style={{ marginTop: 20 }}>
                                <Image source={images.brain2} style={{ width: 150, height: 150, borderRadius: 50 }} />
                            </View>
                        )}

                        {!createAccountFlag ? (
                            <View className="flex-1 w-full items-center" style={{ marginTop: 20 }}>
                                <View className="w-[85%]" style={{ rowGap: 20 }}>
                                    <InputComponent
                                        label={t('email')}
                                        value={email}
                                        onChange={setEmail}
                                        isFocused={emailFocused}
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={() => setEmailFocused(false)}
                                        placeholder={t('email_placeholder')}
                                        error={errorEmail}
                                        secureTextEntry={false}
                                    />
                                    <InputComponent
                                        label={t('password_label')}
                                        value={userPassword}
                                        onChange={setUserPassword}
                                        isFocused={passFocused}
                                        onFocus={() => setPassFocused(true)}
                                        onBlur={() => setPassFocused(false)}
                                        placeholder="••••••••"
                                        error={errorPassword}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity activeOpacity={0.8} onPress={signIn}>
                                        <LinearGradient
                                            colors={['#8ad519','#0bba4c' ,'#10853a','#0c1e0c']}
                                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                            style={{ height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 16 }}
                                        >
                                            <Text className="text-white font-bold text-3xl">{t('login')}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity className="mt-8 mb-10" onPress={createAccount}>
                                    <Text className="text-gray-500">
                                        {t('new_here')} <Text className="text-green-600 font-bold">{t('to_create_account')}</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View className="h-full w-full items-center z-20 mt-10" style={{backgroundColor:'transparent'}}>
                                <View className="w-[85%]" style={{ rowGap: 10 }}>
                                    <Text className="text-[#1a3d2f] font-bold mb-2" style={{fontSize:30, textAlign: isRTL ? 'right' : 'left' }}>{t('create_account')}</Text>
                                    <InputComponent label={t('user_name')} value={userName} onChange={setUserName} isFocused={userNameFocused} onFocus={setUserNameFocused} onBlur={setUserNameFocused} placeholder={t('enter_username')} error={errorUserName} />
                                    <InputComponent label={t('email')} value={email} onChange={setEmail} isFocused={emailFocused} onFocus={setEmailFocused} onBlur={setEmailFocused} placeholder="example@gmail.com" error={errorEmail} />
                                    <InputComponent label={t('password_label')} value={userPassword} onChange={setUserPassword} isFocused={passFocused} onFocus={setPassFocused} onBlur={setPassFocused} placeholder="••••••••" error={errorPassword} secureTextEntry={!showPassword} />

                                    <View className="flex-row w-full justify-between" style={{columnGap:20}}>
                                        <View className="flex-1">
                                            <InputComponent label={t('first_name')} value={firstName} onChange={setFirstName} isFocused={firstNameFocused} onFocus={setFirstNameFocused} onBlur={setFirstNameFocused} placeholder={t('first_name')} error={errorFirstName} />
                                        </View>
                                        <View className="flex-1">
                                            <InputComponent label={t('last_name')} value={lastName} onChange={setLastName} isFocused={lastNameFocused} onFocus={setLastNameFocused} onBlur={setLastNameFocused} placeholder={t('last_name')} error={errorLastName} />
                                        </View>
                                    </View>

                                    <View>
                                        <Text className="text-[#1a3d2f] ml-4 mb-3 font-semibold text-[16px]" style={{ textAlign: isRTL ? 'right' : 'left' }}>{t('gender')}</Text>
                                        <View className="flex-row justify-between">
                                            <TouchableOpacity onPress={() => setGender('male')} className={`flex-1 flex-row items-center justify-center h-14 rounded-2xl border mr-2 ${gender === 'male' ? 'border-[#f2a93b] bg-[#f2a93a]/20' : 'border-gray-300 bg-white/40'}`}>
                                                <Image source={icons.manIcon} style={{ width: 24, height: 24, marginRight: 8 }} />
                                                <Text className={gender === 'male' ? 'text-[#f2a93b] font-bold' : 'text-gray-600'}>{t('gender_male')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setGender('female')} className={`flex-1 flex-row items-center justify-center h-14 rounded-2xl border ml-2 ${gender === 'female' ? 'border-[#f2a93b] bg-[#f2a93b]/20' : 'border-gray-300 bg-white/40'}`}>
                                                <Image source={icons.womanIcon} style={{ width: 24, height: 24, marginRight: 8 }} />
                                                <Text className={gender === 'female' ? 'text-[#f2a93b] font-bold' : 'text-gray-600'}>{t('gender_female')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {errorGender && <Text className="text-red-500 text-s mt-1 ml-2" style={{ textAlign: isRTL ? 'right' : 'left' }}>{t(errorGender)}</Text>}
                                    </View>
                                </View>

                                <View className="w-[85%] mt-6 mb-10">
                                    <TouchableOpacity activeOpacity={0.8} onPress={checkInputs}>
                                        <LinearGradient colors={['#8ad519','#0bba4c' ,'#10853a','#0c1e0c']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
                                            <Text className="text-white font-bold text-2xl">{t('create_account')}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={goBack} className="bg-gray-200 h-14 rounded-2xl items-center justify-center mt-4">
                                        <Text className="text-black font-bold text-lg">{t('go_back')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>

                </KeyboardAwareScrollView>
                <SuccessCreateAccountComponent visible={showSuccess} onClose={async () => { setShowSuccess(false); await goBack(); }} />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Login;