import { View , Text ,Image } from "react-native";
import CustomButton from "./customButtons";
import { icons } from "@/constants";

const handelGoogleSignIn=async()=>{
}

const OAuth = () =>{
    return(
        <View>
            <View className="flex flex-row justify-center items-center mt-5 gap-x-3">
                <View  className="flex-1 h-[1px] bg-general-100"/>
                <Text className="text-lg">Or</Text>
                <View  className="flex-1 h-[1px] bg-general-100"/>

            </View>
            <View className="mt-5">
                <CustomButton title=" Login with Google" className="w-full shadow-none" IconLeft={()=>(
                    <Image 
                    source={icons.google}
                    resizeMode="contain"
                    className="w-5 h-5 mx-2"
                    
                    />
                    
                )}

                bgVariant="outline"
                textVariant="primary"
                onPress={handelGoogleSignIn}
                
                />
            </View>
        </View>
    )

}

export default OAuth;