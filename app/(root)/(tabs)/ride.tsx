import { Text , View } from "react-native"
import MapView, { PROVIDER_DEFAULT } from "react-native-maps"

const Ride=()=>{
    return(
        <MapView provider={PROVIDER_DEFAULT} className="h-full w-full">
            <Text className="h-full w-full">hello</Text>
            
        </MapView>
    )

}

export default Ride;