import React, {useState} from 'react';
import {
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Modal,
    Animated, KeyboardAvoidingView, Platform
} from "react-native";
import backgrounds from "@/constants/backgrounds";
import {createEmailPasswordSession, getCurrentUser, createNewAccount, deleteSession} from "@/services/appWrite";
import {useRouter} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";
import {InputComponent,SuccessModal} from "@/interfaces/interfaces"
import icons from "@/constants/icons";
import {styles} from "@/styles";
import {BlurView} from "expo-blur";
import {LinearGradient} from "expo-linear-gradient";
import images from "@/constants/images";
import ScrollView = Animated.ScrollView;
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const {setUser} = useGlobalContext();
    const[userNameFocused, setUserNameFocused] = useState(false);
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

    const SuccessModal = ({ visible, onClose }:SuccessModal) => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                {/* טשטוש הרקע כדי להבליט את המודאל */}
                <BlurView intensity={30} tint="dark" className="flex-1 justify-center items-center px-6">

                    <View className="bg-[#1e1e1e] w-full rounded-[25px] p-8 items-center border border-white/10 shadow-2xl">

                        {/* אייקון בסגנון הלוגו */}
                        <View className="w-24 h-24 bg-[#f2a93b]/20 rounded-full justify-center items-center mb-6 border border-[#f2a93b]/50">
                            <Text className="text-5xl">🔥</Text>
                        </View>

                        {/* כותרת בפונט בולט כמו הלוגו */}
                        <Text className="text-[#f2a93b] text-3xl font-black italic uppercase tracking-tighter mb-2">
                            WELCOME!
                        </Text>

                        <Text className="text-white text-xl font-bold mb-2 text-center">
                            Account Created Successfully
                        </Text>

                        <Text className="text-gray-400 text-center mb-8 text-base">
                            Stop scrolling and start watching. {"\n"} Let us find the perfect movies for you!
                        </Text>


                        <TouchableOpacity
                            onPress={onClose}
                            activeOpacity={0.8}
                            className="bg-[#f2a93b] w-full py-4 rounded-xl shadow-lg"
                        >
                            <Text className="text-[#1e1e1e] text-center font-black text-lg uppercase">
                                Let&#39;s Get Started
                            </Text>
                        </TouchableOpacity>

                    </View>
                </BlurView>
            </Modal>
        );
    };


    const signIn = async () => {
        try {
            // מנקים כל זכר לסשן קודם (אורח או משתמש אחר)
            try {
                await deleteSession('current');
            } catch (e) {

            }

            // עכשיו יוצרים סשן חדש לגמרי
            await createEmailPasswordSession(email, userPassword);
            const user = await getCurrentUser();

            setUser(user);
            console.log("Successfully logged in. UserId: " + user.$id + " UserName: " + user.username)
            router.replace("/(tabs)");
        } catch (e: any) {
            console.log("Sign in error:", e.message);
        }
    }

    const checkInputs = async () => {
        if(!email || !userName || !userPassword || !gender) {
            if(!email){
                setErrorEmail("Please enter a valid email");
            }
            else{
                setErrorEmail(null)
            }
            if(!userName){
                setErrorUserName("Please enter a valid username");
            } else{
                setErrorUserName(null)
            }
            if(!userPassword){
                setErrorPassword("Please enter a valid password");
            }
            else{
                setErrorPassword(null);
            }
            if(!gender){
                setErrorGender("Please choose your gender");
            }
            else{
                setErrorEmail(null);
            }
        }
        else{
            try {
                await createNewAccount(email,userPassword,userName,gender);
                setShowSuccess(true);
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const goBack = async () => {
        setCreateAccountFlag(false);
        setErrorEmail("");
        setErrorUserName("");
        setErrorPassword("");
        setErrorGender(null);

        setEmail("")
        setUserName("")
        setUserPassword("")
        setGender(null)
    }

    const createAccount = async () => {
        setCreateAccountFlag(true);
        setErrorEmail("");
        setErrorPassword("");
        setErrorGender(null);

        setEmail("")
        setUserPassword("")
    }

    const InputComponent =  ({label, value, onChange, isFocused, onFocus, onBlur, placeholder,error ,secureTextEntry} :InputComponent) =>(
        <View>
            <Text className="text-gray-600 ml-2 mb-2 font-bold text-[16px]">{label}</Text>
            <View
                className="w-full h-14 border rounded-2xl px-5 bg-white/5 flex-row items-center"
                style={{
                    borderColor: isFocused ? '#1d4ed8' : '#374151',
                }}
            >
                <TextInput
                    className="flex-1 h-full text-black" // flex-1 גורם לו לקחת את כל המקום שנשאר משמאל לעין
                    placeholder={placeholder}
                    placeholderTextColor="#555"
                    value={value}
                    onChangeText={onChange}
                    onFocus={() => onFocus(true)}
                    onBlur={() => onBlur(false)}
                    secureTextEntry={label === 'Password' && !showPassword} // משתנה לפי מצב העין
                />

                {/* כפתור העין בתוך ה-View בצד ימין */}
                {label === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={icons.eye} // אופציונלי: החלפת אייקון לעין עם קו
                            className="size-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

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
                >


                        <View className="flex-1">

                            {!createAccountFlag && (<View className="items-center" style={{ marginTop: 80 }}>
                                <Text className="text-[#1a3d2f] font-black tracking-tighter" style={{ fontSize: 50 }}>
                                    MIND<Text className="text-green-600">WEALTH</Text>
                                </Text>
                                <Text className="text-gray-500 font-medium text-lg mt-1">
                                    Your Private Financial Advisor
                                </Text>
                            </View>)}

                            {!createAccountFlag && ( <View className="items-center" style={{ marginTop: 20 }}>
                                <Image
                                    source={images.brain2}
                                    style={{ width: 150, height: 150, borderRadius: 50 }}
                                />
                            </View>)}

                            {!createAccountFlag ? (
                                <View className="flex-1 w-full items-center" style={{ marginTop: 20 }}>
                                    <View className="w-[85%]" style={{ rowGap: 20 }}>
                                        <InputComponent
                                            label={"Email"}
                                            value={email}
                                            onChange={setEmail}
                                            isFocused={emailFocused}
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => setEmailFocused(false)}
                                            placeholder="example@gmail.com"
                                            error={errorEmail}
                                            secureTextEntry={false}
                                        />

                                        <InputComponent
                                            label={"Password"}
                                            value={userPassword}
                                            onChange={setUserPassword}
                                            isFocused={passFocused}
                                            onFocus={() => setPassFocused(true)}
                                            onBlur={() => setPassFocused(false)}
                                            placeholder="••••••••"
                                            error={errorPassword}
                                            secureTextEntry={!showPassword}
                                        />

                                        <TouchableOpacity activeOpacity={0.8} onPress={() => signIn()}>
                                            <LinearGradient
                                                colors={['#8ad519','#0bba4c' ,'#10853a','#0c1e0c']} // green-300 → black
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                style={{
                                                    height: 56,
                                                    borderRadius: 16,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginTop: 16,
                                                }}
                                            >
                                                <Text className="text-white font-bold text-3xl">
                                                    LOGIN
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>



                                    <TouchableOpacity className="mt-8 mb-10" onPress={() => createAccount()}>
                                        <Text className="text-gray-500">
                                            New here? <Text className="text-green-600 font-bold" style={{fontSize:14}}>Create Account</Text>
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) :
                                 (
                                <View className="h-full w-full items-center z-20 mt-28"  style={{backgroundColor:'transparent'}}>
                                    <View className="w-[85%]" style={{ rowGap: 15 }}>
                                        <Text className="text-[#1a3d2f] font-bold  mb-2" style={{fontSize:30}}>Get Your New Account</Text>

                                        <InputComponent
                                            label={"User Name"}
                                            value={userName}
                                            onChange={setUserName}
                                            isFocused={userNameFocused}
                                            onFocus={() => setUserNameFocused(true)}
                                            onBlur={() => setUserNameFocused(false)}
                                            placeholder="enter your username"
                                            error={errorUserName}
                                            secureTextEntry={false}
                                        />

                                        <InputComponent
                                            label={"Email"}
                                            value={email}
                                            onChange={setEmail}
                                            isFocused={emailFocused}
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => setEmailFocused(false)}
                                            placeholder="example@gmail.com"
                                            error={errorEmail}
                                            secureTextEntry={false}
                                        />

                                        <InputComponent
                                            label={"Password"}
                                            value={userPassword}
                                            onChange={setUserPassword}
                                            isFocused={passFocused}
                                            onFocus={() => setPassFocused(true)}
                                            onBlur={() => setPassFocused(false)}
                                            placeholder="••••••••"
                                            error={errorPassword}
                                            secureTextEntry={false}
                                        />
                                        <View className="flex-row w-full justify-between" style={{columnGap:20}}>
                                            <View className="flex-1">
                                        <InputComponent
                                            label={"First Name"}
                                            value={firstName}
                                            onChange={setFirstName}
                                            isFocused={emailFocused}
                                            onFocus={() => setFirstNameFocused(true)}
                                            onBlur={() => setFirstNameFocused(false)}
                                            placeholder="First Name"
                                            error={errorFirstName}
                                            secureTextEntry={false}
                                        />
                                            </View>
                                            <View className="flex-1">
                                        <InputComponent
                                            label={"Last Name"}
                                            value={lastName}
                                            onChange={setLastName}
                                            isFocused={lastNameFocused}
                                            onFocus={() => setLastNameFocused(true)}
                                            onBlur={() => setLastNameFocused(false)}
                                            placeholder="Last Name"
                                            error={errorLastName}
                                            secureTextEntry={false}
                                        />
                                            </View>
</View>
                                        <View>
                                            <Text className="text-[#1a3d2f] ml-4 mb-3 font-semibold text-[16px]">Gender</Text>
                                            <View className="flex-row justify-between">
                                                <TouchableOpacity
                                                    onPress={() => setGender('male')}
                                                    activeOpacity={0.7}
                                                    className={`flex-1 flex-row items-center justify-center h-14 rounded-2xl border mr-2 ${
                                                        gender === 'male' ? 'border-[#f2a93b] bg-[#f2a93a]/20' : 'border-gray-300 bg-white/40'
                                                    }`}
                                                >
                                                    <Image source={icons.manIcon} style={{ width: 24, height: 24, marginRight: 8 }} />
                                                    <Text className={gender === 'male' ? 'text-[#f2a93b] font-bold' : 'text-gray-600'}>Male</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() => setGender('female')}
                                                    activeOpacity={0.7}
                                                    className={`flex-1 flex-row items-center justify-center h-14 rounded-2xl border ml-2 ${
                                                        gender === 'female' ? 'border-[#f2a93b] bg-[#f2a93b]/20' : 'border-gray-300 bg-white/40'
                                                    }`}
                                                >
                                                    <Image source={icons.womanIcon} style={{ width: 24, height: 24, marginRight: 8 }} />
                                                    <Text className={gender === 'female' ? 'text-[#f2a93b] font-bold' : 'text-gray-600'}>Female</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {errorGender && <Text className="text-red-600 mt-1 ml-2">{errorGender}</Text>}
                                        </View>
                                    </View>

                                    <View className="w-[85%] mt-6 mb-10">

                                            <TouchableOpacity activeOpacity={0.8}  onPress={() => checkInputs()}>
                                                <LinearGradient
                                                    colors={['#8ad519','#0bba4c' ,'#10853a','#0c1e0c']} // green-300 → black
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                    style={{
                                                        height: 56,
                                                        borderRadius: 16,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: 16,
                                                    }}
                                                >
                                            <Text className="text-white font-bold text-2xl">Create Account</Text>
                                        </LinearGradient>
                                                </TouchableOpacity>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => goBack()}
                                            className="bg-gray-200 h-14 rounded-2xl items-center justify-center mt-4"
                                        >
                                            <Text className="text-black font-bold text-lg">Go Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>

                </KeyboardAwareScrollView>

                <SuccessModal
                    visible={showSuccess}
                    onClose={async () => {
                        setShowSuccess(false);
                        await goBack();
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Login;