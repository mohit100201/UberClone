
import {View,Text, Image} from "react-native";
import CustomButton from "./customButtons";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";
import { useAuth } from "@clerk/clerk-expo";
import { useState } from "react";
import ReactNativeModal from "react-native-modal";
import { images } from "@/constants";
import { router } from "expo-router";
const Payment=({
    fullName,
  email,
  amount,
  driverId,
  rideTime,
}:PaymentProps)=>{

    const [success, setSuccess] = useState<boolean>(false);

    const {
        userAddress,
        userLongitude,
        userLatitude,
        destinationLatitude,
        destinationAddress,
        destinationLongitude,
      } = useLocationStore();
      const { userId } = useAuth();

    const OpenPaymentSheet=async()=>{

        await fetchAPI("/(api)/ride/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              origin_address: userAddress,
              destination_address: destinationAddress,
              origin_latitude: userLatitude,
              origin_longitude: userLongitude,
              destination_latitude: destinationLatitude,
              destination_longitude: destinationLongitude,
              ride_time: rideTime.toFixed(0),
              fare_price: parseInt(amount) * 100,
              payment_status: "paid",
              driver_id: driverId,
              user_id: userId,
            }),
          });
          setSuccess(true);


    };


    return(
        <>
        <CustomButton 
        title="Confirm Ride"
        className="my-10"
        onPress={OpenPaymentSheet}
        
        />

<ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
            
        </>
    )
}
export default Payment;