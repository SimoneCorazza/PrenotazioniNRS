import React from 'react';
import Responsabili from './Responsabili';

const SvgClean = (<svg fill="#000000" width="25px" height="25px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="18" width="6" height="2" transform="translate(46 38) rotate(-180)"/>
    <rect x="24" y="26" width="6" height="2" transform="translate(54 54) rotate(-180)"/>
    <rect x="22" y="22" width="6" height="2" transform="translate(50 46) rotate(-180)"/>
    <path d="M17.0029,20a4.8952,4.8952,0,0,0-2.4044-4.1729L22,3,20.2691,2,12.6933,15.126A5.6988,5.6988,0,0,0,7.45,16.6289C3.7064,20.24,3.9963,28.6821,4.01,29.04a1,1,0,0,0,1,.96H20.0012a1,1,0,0,0,.6-1.8C17.0615,25.5439,17.0029,20.0537,17.0029,20ZM11.93,16.9971A3.11,3.11,0,0,1,15.0041,20c0,.0381.0019.208.0168.4688L9.1215,17.8452A3.8,3.8,0,0,1,11.93,16.9971ZM15.4494,28A5.2,5.2,0,0,1,14,25H12a6.4993,6.4993,0,0,0,.9684,3H10.7451A16.6166,16.6166,0,0,1,10,24H8a17.3424,17.3424,0,0,0,.6652,4H6c.031-1.8364.29-5.8921,1.8027-8.5527l7.533,3.35A13.0253,13.0253,0,0,0,17.5968,28Z"/>
  </svg>);

interface PulizieProps {
    responsabiliPuliziaSede: string[];
}

const Pulizie: React.FC<PulizieProps> = ({responsabiliPuliziaSede}) => 
    (
        <div className='pulizie'>
            <div className='pulizie-icona'>{SvgClean}</div>
            <Responsabili responsabili={responsabiliPuliziaSede} />
        </div>
    );

export default Pulizie;