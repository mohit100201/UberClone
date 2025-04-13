import RideCard from "@/components/RideCard";
import * as Location from "expo-location";
import { icons, images } from "@/constants";
import { View ,Text, FlatList,Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/clerk-expo";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps"
import { router } from "expo-router";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";
 



const Home=()=>{
    const {setUserLocation,setDestinationLocation,userLatitude,userLongitude}=useLocationStore();
    const {signOut}=useAuth();
    
    const [hasPermission,setHasPermission]=useState(false);
    const { user } = useUser();
    const {data:recentRides = [], loading}=useFetch<Array<Ride>>(`/(api)/ride/${user?.id}`)

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setHasPermission(false);
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
    
          const address = await Location.reverseGeocodeAsync({
            latitude: location.coords?.latitude!,
            longitude: location.coords?.longitude!,
          });
    
          setUserLocation({
            latitude: location.coords?.latitude,
            longitude: location.coords?.longitude,
            address: `${address[0].district}, ${address[0].region}`,
          });
        })();
      }, []);
    


    const handleSignOut=()=>{
      signOut();
      router.replace('/(auth)/sign-in')
      

    }

    const handleDestinationPress=(location:{latitude:number,longitude:number,address:string})=>{
        setDestinationLocation(location);
        router.push("/(root)/find-ride")

    }
    return(
        <SafeAreaView>
            
            <FlatList 
             data={recentRides?.slice(0, 5)}
            renderItem={({item})=><RideCard ride={item}/>}
            contentContainerStyle={{ paddingBottom: 100, flexGrow:1}}
            className="px-5"
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={()=>(
                <View className="flex flex-col items-center justify-center">
                  {
                    !loading?(
                        <>
                        <Image 
                        source={images.noResult}
                        className="w-40 h-40"
                        alt="No recent rides found."
                        resizeMode="contain"
                        
                        />
                        <Text className="text-xl">No recent rides found.</Text>
                        
                        </>
                    ):(
                        <ActivityIndicator size={"large"} color={"#000"}/>
                    )

                  }
                </View>
            )}

            ListHeaderComponent={
                <>
                  <View className="flex flex-row items-center justify-between my-5">
                    <Text className="text-2xl font-JakartaExtraBold">
                      Welcome {user?.firstName}👋
                    </Text>
                    <TouchableOpacity
                      onPress={handleSignOut}
                      className="justify-center items-center w-10 h-10 rounded-full bg-white"
                    >
                      <Image source={icons.out} className="w-4 h-4" />
                    </TouchableOpacity>
                  </View>
      
                  <GoogleTextInput
                    icon={icons.search}
                    containerStyle="bg-white shadow-md shadow-neutral-300"
                    handlePress={handleDestinationPress}
                  />
      
                  <>
                    <Text className="text-xl font-JakartaBold mt-5 mb-3">
                      Your current location
                    </Text>
                    <View className="flex flex-row items-center bg-transparent h-[300px]">
                    {userLatitude && userLongitude ? (
                                    <Map />
                                ) : (
                                    <ActivityIndicator className="flex-1 items-center justify-center" size={"large"} color={"#000"} />
                                )}
                    </View>
                  </>
      
                  <Text className="text-xl font-JakartaBold mt-5 mb-3">
                    Recent Rides
                  </Text>
                </>
              }
            />
            
        </SafeAreaView>
    )

}

export default Home;