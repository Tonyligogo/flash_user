import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Driver {
  id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
}

declare interface MarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  first_name: string;
  last_name: string;
  time?: number;
  price?: string;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
  selectedDriver?: number | null;
  onMapReady?: () => void;
}

declare interface Ride {
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  fare_price: number;
  payment_status: string;
  driver_id: number;
  user_id: string;
  created_at: string;
  driver: {
    first_name: string;
    last_name: string;
    car_seats: number;
  };
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface DriverStore {
  drivers: MarkerData[];
  selectedDriver: number | null;
  setSelectedDriver: (driverId: number) => void;
  setDrivers: (drivers: MarkerData[]) => void;
  clearSelectedDriver: () => void;
}

declare interface DriverCardProps {
  item: MarkerData;
  selected: number;
  setSelected: () => void;
}

export interface ColorPalette {
  background: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  accent: string;
  ratingStar: string;
  uberGold: string;
  buttonBackground: string;
  buttonText: string;
  editButtonBg: string;
  primary: string;
  warning: string;
  warningBackground: string;
  tripCardSmall: string;
  tripCardBig: string;
  success: string;
}

/**
 * Interface for the Theme Context value.
 */
export interface ThemeContextType {
  isDark: boolean;
  colors: ColorPalette;
}

/**
 * Interface for the user's profile data.
 */
export interface UserProfile {
  name: string;
  profilePic: string;
}

/**
 * Interface for a single menu item in the profile list.
 */
export interface MenuItem {
  icon: string;
  label: string;
  action: string;
}

/**
 * Interface for a group of menu items.
 */
export interface MenuSection {
  title: string;
  items: MenuItem[];
}

/**
 * Interface for the props of the custom Icon component.
 */
export interface IconProps {
  name: string;
  size?: number;
  color: string;
}

export type RegistrationStep = 
  | "OTP_SUBMISSION"
  | "PROFILE_DETAILS"
  | "EMAIL_OTP"
  | "COMPLETED";

export type RegistrationProgress = {
  step: RegistrationStep;
  phone?: string;
  activation_token?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;
};
