import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';





const Layout= () =>{
  
 

  return (
   
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
       
       
        
      </Stack>
      
    
  );
}

export default Layout;
