import { Redirect } from "expo-router";
import { useState } from "react"

const Index = () => {
    const [isLoggedIn] = useState<boolean>(true);
  return (
    <Redirect href={!isLoggedIn ? "/(auth)/welcome" : "/(root)/(tabs)"} />
  )
}

export default Index