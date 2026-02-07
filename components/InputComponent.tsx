import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Image,Text,TextInput, TouchableOpacity, View} from "react-native";
import icons from "@/constants/icons";

const InputComponent = ({ label, value, onChange, isFocused, onFocus, onBlur, placeholder, error, secureTextEntry }: any) => {
    const [showPassword, setShowPassword] = useState(false);

    // שימוש ב-i18n מתוך ה-Hook מבטיח רינדור מחדש בשינוי שפה
    const { t, i18n } = useTranslation();

    // חישוב ה-RTL ישירות מהשפה הנוכחית
    const isHebrew = i18n.language === 'he';

    return (
        <View style={{ marginBottom: 10 }}>
            <Text
                className="text-gray-600 ml-2 mr-2 mb-2 font-bold text-[16px]"
                style={{ textAlign: isHebrew ? 'right' : 'left' }} // שימוש ב-isHebrew
            >
                {label}
            </Text>

            <View
                className="w-full h-14 border rounded-2xl px-5 bg-white/5 flex-row-reverse items-center" // הוספת flex-row-reverse
                style={{
                    flexDirection: isHebrew ? 'row-reverse' : 'row', // משנה את כיוון ה-Input והעין
                    borderColor: isFocused ? '#1d4ed8' : '#374151'
                }}
            >
                <TextInput
                    className="flex-1 h-full text-black"
                    style={{ textAlign: isHebrew ? 'right' : 'left' }}
                    placeholder={placeholder}
                    placeholderTextColor="#555"
                    value={value}
                    onChangeText={onChange}
                    onFocus={() => onFocus(true)}
                    onBlur={() => onBlur(false)}
                    secureTextEntry={label === t('password_label') ? !showPassword : secureTextEntry}
                />

                {label === t('password_label') && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={icons.eye}
                            className="size-6"
                            style={{ marginHorizontal: 5 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error ? (
                <Text
                    className="text-red-500 text-xs mt-1 ml-2"
                    style={{ textAlign: isHebrew ? 'right' : 'left' }}
                >
                    {t(error)}
                </Text>
            ) : null}
        </View>
    );
};
export default InputComponent;