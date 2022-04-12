import React from "react";
import { useWeb3React } from '@web3-react/core'
import useTokenBalance, { useGetBnbBalance } from 'hooks/useTokenBalance'
import { formatBigNumber, getFullDisplayBalance } from 'utils/formatBalance'
import TransactionsSwap from '../../../components/Menu/UserMenu/TransactionsSwap'
import CopyAddr from "../../../components/Menu/UserMenu/CopyAddr"

export default function ViewBalance(){
    const { account } = useWeb3React()
    const { balance, fetchStatus } = useGetBnbBalance()
    return(
        <>
        <div className="aside">
                <div className="header__aside">
                    <p className="titulo__header">My Balance</p>
                </div>
                {/* <div className="gle" /> */}

                <div className="glass">
                    <div className="color" />
                    <div className="color" />


                    <div className="pool_box">
                        <div className="box__flex d-flex align-items-center">
                            <span className="box__text">TORG</span>
                            {/* <span className="box__icon fas fa-exclamation" /> */}
                        </div>
                        <div className="box__flex d-flex align-items-center">
                            <span className="box__boton boton glass">TORG 700</span>
                            
                            <div>
                                                <CopyAddr account={account} />
                                            </div>
                        </div>
                    </div>

                </div>

                <div className="header__aside">
                    <p className="titulo__header">Transaction List</p>
                </div>

                <div className="glass ipunts__box">
                    <div className="inputs__flex d-flex align-items-center">
                        <div className="datos right">
                            <div className="hora">9:30</div>
                            <div className="fecha">26/01</div>
                        </div>

                        <div className="glass input__check">

                            <p>0x000k4654654654</p>
                            {/* <label htmlFor="radio">0x000k4654654654
                                <input type="radio" id="radio" name="" value="Bike" /></label> */}
                            {/* <span className="vs">vs</span>
                            <label htmlFor="radio1">0x000k46
                                <input type="radio" id="radio1" name="" value="Bike" /></label> */}

                        </div>

                        <div className="icon__input">
                        <span className="fas fa-globe" />
                        </div>
                    </div>
                </div>

                <div className="glass ipunts__box">
                    <div className="inputs__flex d-flex align-items-center">
                        <div className="datos right2">
                            <div className="hora">9:30</div>
                            <div className="fecha">26/01</div>
                        </div>

                        <div className="glass input__check">
                        <p>0x000k4654654654</p>
                            {/* <label htmlFor="radio2">0x000F2334234234
                                <input type="radio" id="radio2" name="" value="Bike" /></label> */}


                            {/* <span className="vs">vs</span>
                            <label htmlFor="radio3">0x000k46
                                <input type="radio" id="radio3" name="" value="Bike" /></label> */}

                        </div>

                        <div className="icon__input">
                        <span className="fas fa-globe" />
                        </div>
                    </div>
                </div>
                <div className="glass ipunts__box">
                    <div className="inputs__flex d-flex align-items-center">
                        <div className="datos">
                            <div className="hora">9:30</div>
                            <div className="fecha">26/01</div>
                        </div>

                        <div className="glass input__check">
                        <p>0x000k4654654654</p>
                            {/* <label htmlFor="radio4">0x000F2346546546
                                <input type="radio" id="radio4" name="" value="Bike" /></label> */}


                            {/* <span className="vs">vs</span>

                            <label htmlFor="radio5">0x000k46
                                <input type="radio" id="radio1" name="" value="Bike" /></label> */}

                        </div>

                        <div className="icon__input">
                        <span className="fas fa-globe" />
                            {/* <i className="far fa-futbol"></i> */}
                        </div>
                    </div>
                </div>

                {/* <div className="mt-3">
                            <TransactionsSwap />
                        </div> */}
            </div>



        </>
    );


}

// export default ViewBalance();