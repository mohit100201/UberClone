import InputFields from "@/components/inputField";
import { icons, images } from "@/constants";
import { useState } from "react";
import { View ,Text, ScrollView,Image} from "react-native";
import CustomButton from "@/components/customButtons";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const Sign_Up=()=>{
    const [form , setForm]=useState({
        name:"",
        email:"",
        password:"",
        
    })

    const onSignUpPress=async()=>{

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

                {/* Verification modal */}

            </View>

        </ScrollView>
    )

}

export default Sign_Up;