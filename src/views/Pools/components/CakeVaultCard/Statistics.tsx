import React from 'react';
import styled from 'styled-components';


const Img10 = styled.img`
   width: 30rem;
   margin-bottom: -60px!important;

`
const Img15 = styled.img`
    width: 30rem;
    margin-bottom: -60px!important;

`
const Img25 = styled.img`
   width: 30rem;
   margin-bottom: -60px!important;
 
`
const Img50 = styled.img`
   width: 30rem;
   margin-bottom: -60px!important;
 
`
const Img100 = styled.img`
   width: 30rem;
   margin-bottom: -60px!important;
 
`
const Container = styled.div`
`
const Statistics = () => {
    return (
        <Container>
            <Img10 src="/images/10.svg"  alt="" />
            <Img15 src="/images/15.svg"  alt="" />
            <Img25 src="/images/25.svg"  alt="" />
            <Img50 src="/images/50.svg"  alt="" />
            <Img100 src="/images/100.svg"  alt="" />
        </Container>

    )


};


export default Statistics;
