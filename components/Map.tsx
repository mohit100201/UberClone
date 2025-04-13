// import { calculateRegion } from "@/lib/map";
import { useMemo } from "react";
import { icons } from "@/constants";
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store"
import { Driver, MarkerData } from "@/types/type";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text , View , } from "react-native"
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps"
import { useFetch } from "@/lib/fetch";
import MapViewDirections from "react-native-maps-directions";



const Map=()=>{

    const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");

    console.log(drivers)
    

    const [markers,setMakers]=useState<MarkerData[]>([])
    const {
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude
        
    } = useLocationStore();

    const {
        selectedDriver,
        setDrivers

    }=useDriverStore();

   


     // Memoize the region calculation
     const region = useMemo(() => {
        return calculateRegion({
            userLatitude,
            userLongitude,
            destinationLatitude,
            destinationLongitude
        });
    }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

    console.log("region=",region)

    useEffect(()=>{
        if(Array.isArray(drivers)){
            if(!userLatitude || !userLongitude) return;

            const newMakers=generateMarkersFromData({
                data:drivers,
                userLatitude,
                userLongitude
            });
            setMakers(newMakers);

        }

    },[drivers,userLatitude,userLongitude]);

    useEffect(() => {
      console.log("hello");
        if (
          markers.length > 0 &&
          destinationLatitude !== undefined &&
          destinationLongitude !== undefined
        ) {
          calculateDriverTimes({
            markers,
            userLatitude,
            userLongitude,
            destinationLatitude,
            destinationLongitude,
          }).then((drivers) => {
           
            setDrivers(drivers as MarkerData[]);
          });
        }
      }, [markers, destinationLatitude, destinationLongitude]);




    if (loading || (!userLatitude && !userLongitude))
        return (
          <View className="flex justify-between items-center w-full">
            <ActivityIndicator size="small" color="#000" />
          </View>
        );
    
      if (error)
        return (
          <View className="flex justify-between items-center w-full">
            <Text>Error: {error}</Text>
          </View>
        );
    
   
    return(
        <MapView
        provider={PROVIDER_GOOGLE}
        style={{width:'100%', height:'100%'}}
        initialRegion={region}
        showsUserLocation={true}
        
        
        
         >

            {
                markers.map((marker)=>(
                    <Marker 
                    key={marker.id}
                    coordinate={{
                        latitude:marker.latitude,
                        longitude:marker.longitude
                    }}
                    title={marker.title}
                    image={
                        selectedDriver===marker.id ? icons.selectedMarker:icons.marker
                    }

                     />
                ))
            }

            {destinationLatitude &&
            destinationLongitude &&
            (
              <>
              <Marker 
              key="destination"
              coordinate={{

                latitude:destinationLatitude,
                longitude:destinationLongitude
              }

              }

              title="Destination"
              image={icons.pin}
              
              >

              </Marker>

              <MapViewDirections 
                   origin={{
                    latitude:userLatitude!,
                    longitude:userLongitude!,
                   }} 
                   destination={{
                    latitude:destinationLatitude!,
                    longitude:destinationLongitude!
                   }}

                   apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
                   strokeColor="#0286ff"
                   strokeWidth={3}
              
              />
              
              </>
            )

            }
            
            

        </MapView>
    )
}

export default Map;