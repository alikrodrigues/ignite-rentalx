import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import Ionicons from "@expo/vector-icons/Ionicons";

import Logo from "../../assets/logo.svg";

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  CarsButton,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDto";
import { useTheme } from "styled-components";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const [cars, setCars] = useState();
  const navigation = useNavigation();
  const [load, setLoad] = useState(true);
  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionY = positionY.value;
      ctx.positionX = positionX.value;
    },
    onActive(event, ctx: any) {
      positionY.value = ctx.positionY + event.translationY;
      positionX.value = ctx.positionX + event.translationX;
    },
    onEnd() {
      positionY.value = withSpring(0);
      positionX.value = withSpring(0);
    },
  });

  function handleCar(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  async function fetchCars() {
    const response = await api.get("/cars");
    setCars(response.data);
    setLoad(false);
  }

  function handleMyCar() {
    navigation.navigate("MyCars");
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      {load ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCar(item)} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: "absolute", bottom: 13, right: 22 },
          ]}
        >
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleMyCar}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
