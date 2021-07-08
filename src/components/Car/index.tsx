import React from 'react';

import {
 Container,
 Details,
 Brand,
 About,
 Name,
 Rent,
 Period,
 Price,
 Type,
 CarImage,
} from './styles';

import GasolineSvg from '../../assets/gasoline.svg';
import { RectButtonProps } from 'react-native-gesture-handler';

interface Car {
    brand: string;
    name: string;
    urlImage: string;
    rent: {
        period: string;
        price: number;
    }
}

interface Props extends RectButtonProps{
    data: Car;
}


export function Car({data, ...rest}: Props){
 return (
    <Container {...rest}>
        <Details>
            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>
            <About>
                <Rent>
                    <Period>{data.rent.period}</Period>
                    <Price>{`R$ ${data.rent.price}`}</Price>
                </Rent>

                <Type>
                    <GasolineSvg />
                </Type>
            </About>
        </Details>

        <CarImage source={{uri: data.urlImage}} resizeMode='contain' />

    </Container>
 );
}