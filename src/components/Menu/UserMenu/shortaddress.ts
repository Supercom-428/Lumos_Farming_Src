import React from 'react';

export default function getAddress(account){
    const acc1 = account.substr(0,3);
    const acc2 = account.substr(account.length-5, account.length);
    const arreglo = [acc1,"...",acc2];
    return arreglo;
}