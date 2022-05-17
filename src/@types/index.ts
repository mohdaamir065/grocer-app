import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  ROOT: undefined;
  HOME: undefined;
  LISTS_STACK: undefined;
  ALL_LIST: undefined;
  LIST: { id: string | number; title: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export interface GrocerryList {
  id?: number;
  title: string;
  status: number;
}
export interface GrocerryListItem {
  id?: string | number;
  list_id: number | string;
  isDone: number;
  itemName: string;
  quantity: number;
}
