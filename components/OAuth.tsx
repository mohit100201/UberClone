import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";

import CustomButton from "@/components/customButtons";
import { icons } from "@/constants";
import { useSSO } from '@clerk/clerk-expo'
import React, { useCallback, useEffect } from 'react'
import { googleOAuth } from "@/lib/auth";


const OAuth = () => {

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO()

  const handelGoogleSignIn = useCallback(async () => {
    try {
      const result= await googleOAuth(startSSOFlow);
      if(result.code==='session_exists'){
        if (result.code === "session_exists") {
          Alert.alert("Success", "Session exists. Redirecting to home screen.");
          router.replace("/(root)/(tabs)/home");
        }
    
        Alert.alert(result.success ? "Success" : "Error", result.message);
      }
    
    } catch (err) {
      
      console.error(err)
    }
  }, [])
 

  

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
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
  );
};

export default OAuth;