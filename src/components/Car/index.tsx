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

interface Car {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    }
}

interface Props {
    data: Car;
}


export function Car({data}: Props){
 return (
    <Container>
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

        <CarImage source={{uri: ''}} resizeMode='contain' />

    </Container>
 );
}