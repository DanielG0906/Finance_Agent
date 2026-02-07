import {Image, Modal, Text, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import icons from "@/constants/icons";
import React from "react";
import {useTranslation} from "react-i18next";

const SuccessCreateAccountComponent = ({ visible, onClose }: any) => {
    const { t} = useTranslation();
    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <BlurView intensity={30} tint="dark" className="flex-1 justify-center items-center px-6">
                <View className="bg-white rounded-[25px] p-8 items-center border border-white/10 shadow-2xl">
                    <Image source={icons.greenComplete} style={{height:100,width:100}} />
                    <Text className="text-green-600 text-3xl font-black italic uppercase tracking-tighter mb-10 mt-4 text-center">
                        {t('account_created')}
                    </Text>
                    <Text className="text-gray-400 text-center mb-8 text-base ">
                        {t('success_description1')}
                    </Text>
                    <Text className="text-gray-500 text-center mb-8 text-base font-semibold">
                        {t('success_description2')}
                    </Text>
                    <TouchableOpacity
                        onPress={onClose}
                        activeOpacity={0.8}
                        className="bg-green-500 w-full py-4 rounded-xl shadow-lg p-2"
                    >
                        <Text className="text-white text-center font-black text-lg uppercase">
                            {t('get_started')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </Modal>
    );
};
export default SuccessCreateAccountComponent;