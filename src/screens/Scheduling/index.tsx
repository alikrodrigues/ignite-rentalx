import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

import ArrowSvg from "../../assets/arrow.svg";
import { Button } from "../../components/Button";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [lastSelectedDate, setLasSelectedDate] = useState<DayProps>(
    {} as DayProps
  );

  function handleConfirmRental() {
    navigation.navigate("SchedulingDetails");
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleDateChange(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLasSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma{"\n"}data de início e{"\n"}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={true}>18/06/2021</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleDateChange} />
      </Content>

      <Footer>
        <Button title="confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
