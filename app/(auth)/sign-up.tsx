import InputFields from "@/components/inputField";
import { icons, images } from "@/constants";
import { useState } from "react";
import { View ,Text, ScrollView,Image, Alert} from "react-native";
import CustomButton from "@/components/customButtons";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from '@clerk/clerk-expo'
import ReactNativeModal from "react-native-modal";



const Sign_Up=()=>{
    const { isLoaded, signUp, setActive } = useSignUp()
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [form , setForm]=useState({
        name:"",
        email:"",
        password:"",
        
    })

    const [verification, setVerification] = useState({
        state:"default",
        error:"",
        code:"",
    });

     // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
     setVerification({
        ...verification,
        state:"pending"
     })
    } catch (err:any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
     Alert.alert("Error",err.errors[0].longMessage)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code:verification.code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        /// TODO:create a database user 
        await setActive({ session: signUpAttempt.createdSessionId })
       setVerification({
        ...verification,
        state:"success"
       })
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
            ...verification,
            error:"Verification failed. Please try again.",
            state:"failed"
           })
       
      }
    } catch (err:any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error:err.errors[0].longMessage,
        state:"failed"
       })
     
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
                    <Text className="text-2xl  text-black font-JakartaSemiBold absolute bottom-5 left-5">Create Your Account</Text>
                </View>
                <View className="p-5">
                    
                    
              

                    <InputFields 
                    label="Name"
                    placeholder="Enter name"
                    icon={icons.person}
                    iconStyle="w-6 h-6 ml-4"
                    value={form.name}
                    onChangeText={(text)=>setForm({...form,name:text})}
                    
                    
                    

                    
                    />

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
                    iconStyle="w-6 h-6 ml-4 "
                    secureTextEntry={true}
                    textContentType="password"
                    value={form.password}
                    onChangeText={(value) => setForm({ ...form, password: value })}
                    className="mr-5"

                    
                    />

                    
                    <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6 p-3 "/>

                   <OAuth/>
                    <Link  href="/sign-in" className="text-lg text-center text-general-200 mt-2">
                    <Text>Already have an account? </Text>
                    <Text className="text-primary-500">Log In</Text>
                    
                    </Link>

                </View>
                <ReactNativeModal 
                isVisible={verification.state==="pending"} 
                onModalHide={()=>{
                    if(verification.state==="success") setShowSuccessModal(true)
                    
                    }}
                >
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] ">
                        <Text className="text-2xl font-JakartaExtraBold mb-2">Verification</Text>
                        <Text className="font-jakrta mb-5">we've sent a verification code to {form.email}</Text>
                        <InputFields  
                        label="Code"
                        icon={icons.lock}
                        placeholder="12345"
                        value={verification.code}
                        onChangeText={(text)=>setVerification({...verification,code:text})}
                        keyboardType="number-pad"


                        
                        />

                        {
                            verification.error && (
                                <Text className="text-red-500 text-sm font-jakarta mt-1">
                                    {verification.error}
                                </Text>
                            )
                        }

                        <CustomButton 
                        title="Verify E-mail"
                        onPress={onVerifyPress}
                        className="mt-5 bg-success-500"
                        
                        />

                    </View>

                </ReactNativeModal>

                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] ">
                        <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5 "/>
                        <Text className="text-3xl font-JakartaBold text-center  ">
                        Verified

                    </Text>
                    <Text className="text-base text-gray-400 font-jakarta text-center mt-2">
                        you have successfully verified your account.

                    </Text>
                    <CustomButton 
                    title="Browse Home" 
                    onPress={()=>{
                        setShowSuccessModal(false);
                        router.replace("/(root)/(tabs)/home");
                    }}
                        

                    

                        className="mt-5"

                        
                        />

                    </View>
                    

                </ReactNativeModal>

            </View>

        </ScrollView>
    )

}

export default Sign_Up;