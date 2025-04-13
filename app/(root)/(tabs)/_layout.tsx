import { icons } from "@/constants";
import { Tabs } from "expo-router"
import { View , Image, ImageSourcePropType} from "react-native";
const TabIcon =({source , focused}:{source:ImageSourcePropType , focused:Boolean})=>{
    return(
        <View className={`flex flex-row h-11 w-11 justify-center items-center rounded-full ${focused?"bg-general-300":""}`}>
            <View className={` rounded-full h-11 w-11 items-center justify-center ${focused?"bg-general-400":""}`}>
                <Image source={source} tintColor="white" resizeMode="contain" className="w-8 h-8 " />
            </View>

        </View>
    )
}

const Layout = ()=>{
    return(
        <Tabs screenOptions={{

            tabBarActiveTintColor:"white",
            tabBarInactiveTintColor:"white",
            tabBarShowLabel:false,
            tabBarStyle:{
                backgroundColor:"#333333",
                borderRadius: 50,
                position:"absolute",
                marginBottom:20,
                marginHorizontal:20,
                
                justifyContent:"space-evenly",
                height:70,
                alignContent:"center",
                alignItems:"center",
                paddingTop:15
                
                
                
                
                

            }

        }}>
            <Tabs.Screen 
            name="home"
            options={{
                title:"Home",
                headerShown:false,
                tabBarIcon: ({focused})=><TabIcon focused={focused} source={icons.home} />

            }}

            />

            <Tabs.Screen 
            name="ride"
            options={{
                title:"Ride",
                headerShown:false,
                tabBarIcon: ({focused})=><TabIcon focused={focused} source={icons.list} />

            }}

            />


            <Tabs.Screen 
            name="chat"
            options={{
                title:"Chat",
                headerShown:false,
                tabBarIcon: ({focused})=><TabIcon focused={focused} source={icons.chat} />

            }}

            />
            <Tabs.Screen 
            name="profile"
            options={{
                title:"Profile",
                headerShown:false,
                tabBarIcon: ({focused})=><TabIcon focused={focused} source={icons.profile} />

            }}

            />

        </Tabs>
    )
}

export default Layout;