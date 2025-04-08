import { Ride } from "@/types/type";
import { View , Text, Image} from "react-native"

const RideCard = ({ride:{
    origin_address,
    destination_address,
    origin_latitude,
    origin_longitude,
    destination_latitude,
    destination_longitude,
    ride_time,
    fare_price,
    payment_status,
    driver_id,
    created_at,
    driver


}}:{ride:Ride})=>{
    return(
        <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3 ">
            <View className="flex flex-row items-center justify-between p-3">
                <View className="flex flex-row items-center justify-between">
                    <Image 
                    source={{
                        // uri:`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=da9af24dbf24414f95fc5c7e6f594106`

                        uri:`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`
                      
                    }}
                    className="w-[80px] h-[90px] rounded-lg"
                    
                    />
                </View>
            </View>
            <Text className="text-3xl">{driver.first_name}</Text>
        </View>
    )
}

export default RideCard;