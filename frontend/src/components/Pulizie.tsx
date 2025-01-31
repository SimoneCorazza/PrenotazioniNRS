import React from 'react';
import Responsabili from './Responsabili';
import CleanIcon from './icons/Clean';

interface PulizieProps {
    responsabiliPuliziaSede: string[];
}

const Pulizie: React.FC<PulizieProps> = ({responsabiliPuliziaSede}) => 
    (
        <div className='pulizie'>
            <div className='pulizie-icona'>{CleanIcon}</div>
            <Responsabili responsabili={responsabiliPuliziaSede} limite={3} />
        </div>
    );

export default Pulizie;