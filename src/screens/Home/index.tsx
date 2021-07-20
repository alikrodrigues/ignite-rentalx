import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import Logo from "../../assets/logo.svg";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDto";

export function Home() {
  const [cars, setCars] = useState();
  const navigation = useNavigation();
  const [load, setLoad] = useState(true);

  function handleCar(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  async function fetchCars() {
    const response = await api.get("/cars");
    setCars(response.data);
    setLoad(false);
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
    </Container>
  );
}
