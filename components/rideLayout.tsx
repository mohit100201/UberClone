import { icons } from "@/constants";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native"
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Map from "@/components/Map";
import BottomSheetfrom, { BottomSheetScrollView , BottomSheetView} from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";

const RideLayout=(
    {title,
    children,
    snapPoints=["35%","85%"]
}:{
    title:string, 
    children:React.ReactNode,
    snapPoints:string[]
})=>{

    const bottomSheetRef=useRef<BottomSheet>(null);

    return(
        <GestureHandlerRootView >
            <View className="flex-1 bg-white">
                <View className="flex flex-col h-screen bg-blue-500">
                    <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
                        <TouchableOpacity onPress={()=>router.back()}>
                            <View className="w-10 h-10 items-center justify-center bg-white rounded-full">
                                <Image source={icons.backArrow} resizeMode="contain" className="w-6 h-6"/>
                            </View>

                        </TouchableOpacity>
                        <Text className="font-JakartaSemiBold text-xl ml-5">{title || "Go Back"}

                        </Text>

                        

                    </View>

                    <Map/>

                </View>

                <BottomSheet keyboardBehavior="extend" ref={bottomSheetRef} snapPoints={snapPoints||  ["35%","85%"]} index={0}>
                    <BottomSheetView style={{flex:1 , padding:20}}>
                        {children}

                    </BottomSheetView>
                </BottomSheet>

            </View>
        </GestureHandlerRootView>
        
    )
}

export default RideLayout;