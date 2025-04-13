import { Text , View } from "react-native"
import { useLocationStore } from "@/store";
import RideLayout from "@/components/rideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import CustomButton from "@/components/customButtons";
import { router } from "expo-router";

const FindRide=()=>{

    const {
        userAddress,
        destinationAddress,
        setUserLocation,
        setDestinationLocation
        

    } = useLocationStore();


    return(
        <RideLayout title="Ride" snapPoints={["85%"]}>
           <View className="my-3">
            <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
            <GoogleTextInput icon={icons.target} initialLocation={userAddress!} containerStyle="bg-neutral-100" textInputBackgroundColor="#f5f5f5"
            handlePress={(location)=>setUserLocation(location)}
            
            />

           </View>
           <View className="my-3">
            <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
            <GoogleTextInput 
            icon={icons.map} 
            initialLocation={destinationAddress!} 
            containerStyle="bg-neutral-100 flex-wrap " 
            textInputBackgroundColor="#transparent"
            handlePress={(location)=>setDestinationLocation(location)}

            
            />

           </View>

           <CustomButton className="mt-5" title="Find now" onPress={()=>router.push("/(root)/confirm-ride")}/>
        </RideLayout>
    )
}

export default FindRide;