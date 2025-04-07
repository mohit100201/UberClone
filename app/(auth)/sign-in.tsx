import InputFields from "@/components/inputField";
import { icons, images } from "@/constants";
import { useState } from "react";
import { View ,Text, ScrollView,Image, Alert} from "react-native";
import CustomButton from "@/components/customButtons";
import { Link , useRouter} from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from '@clerk/clerk-expo'
import { SignedOut } from '@clerk/clerk-expo'

const Sign_In=()=>{
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()
    const [form , setForm]=useState({
       
        email:"",
        password:"",
        
    })

     // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
        const signInAttempt = await signIn.create({
          identifier: form.email,
          password: form.password,
        });
  
        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.replace("/(root)/(tabs)/home");
        } else {
          // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
          console.log(JSON.stringify(signInAttempt, null, 2));
          Alert.alert("Error", "Log in failed. Please try again.");
        }
      } catch (err: any) {
        console.log(JSON.stringify(err, null, 2));
        Alert.alert("Error", err.errors[0].longMessage);
      }
    }
    return(
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white ">
                <View className="relative w-full h-[250px]">
                    <Image 
                        source={images.signUpCar}
                        className="z-0 w-full h-[200px]"
                    />
                    <Text className="text-2xl  text-black font-JakartaSemiBold absolute bottom-5 left-5">Welcome 👋</Text>
                </View>
                <View className="p-5">
                    
               
                    

                   

                    <InputFields 
                    label="Email"
                    placeholder="Enter email"
                    icon={icons.email}
                    iconStyle="w-6 h-6 ml-4"
                    textContentType="emailAddress"
                    value={form.email}
                    onChangeText={(value) => setForm({ ...form, email: value })}

                    
                    />

                    <InputFields 
                    label="Password"
                    placeholder="Enter password"
                    icon={icons.lock}
                    iconStyle="w-6 h-6 ml-4"
                    secureTextEntry={true}
                    textContentType="password"
                    value={form.password}
                    onChangeText={(value) => setForm({ ...form, password: value })}

                    
                    />

                    
                    <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6"/>
                   

                   <OAuth/>
                    <Link  href="/sign-up" className="text-lg text-center text-general-200 mt-2">
                    <Text>Don't have an account? </Text>
                    <Text className="text-primary-500">Sign Up</Text>
                    
                    </Link>

                </View>

                {/* Verification modal */}

            </View>

        </ScrollView>
    )

}

export default Sign_In;