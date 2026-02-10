import React from 'react'
import {Image,Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {t} from "i18next";
import icons from "@/constants/icons";
import {BlurView} from "expo-blur";

type status = 'successUserCreation' | 'errorUserExist' | 'errorService'

interface StatusModalComponentProps {
    status: status,
    onClose: () => void,
    visible: boolean
}

const StatusModalComponent = ({status,onClose,visible}:StatusModalComponentProps) => {

    const config =
        {
        successUserCreation :{
            icon: icons.greenComplete,
            title: t('account_created'),
            desc1: t('success_description1'),
            desc2: t('success_description2'),
            btnColor: 'bg-green-500',
            titleColor: 'text-green-600',
        },
        errorUserExist:{
            icon: icons.redError,
            title: t('user_exist'),
            desc1: "",
            desc2: t('user_exit_description'),
            btnColor: 'bg-red-500',
            titleColor: 'text-red-600',
        },
        errorService :{
            icon: icons.systemError,
            title: t('error_service'),
            desc1: "",
            desc2: t('error_service_description'),
            btnColor: 'bg-red-500',
            titleColor: 'text-red-600',
        }
    }[status]

    if (!config) return null;

    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <BlurView intensity={30} tint="dark" className="flex-1 justify-center items-center px-6">
                <View className="bg-white w-full rounded-[25px] p-8 items-center border border-gray-100 shadow-2xl">

                    <Image source={config.icon} style={{ height: 90, width: 90 }} resizeMode="contain" />

                    <Text className={`${config.titleColor} text-2xl font-black uppercase mt-6 text-center`}>
                        {config.title}
                    </Text>

                    <View className="mt-4 mb-8">
                        <Text className="text-gray-400 text-center text-base mb-2">
                            {config.desc1}
                        </Text>
                        <Text className="text-gray-500 text-center text-base font-semibold">
                            {config.desc2}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={onClose}
                        activeOpacity={0.8}
                        className={`${config.btnColor} w-full py-4 rounded-2xl shadow-lg`}
                    >
                        <Text className="text-white text-center font-black text-lg uppercase">
                            {status === 'successUserCreation' ? t('get_started') : t('close')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </Modal>
    );
};


export default StatusModalComponent;

