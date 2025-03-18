import React from 'react';
import Responsabili from './Responsabili';
import AperturaIcon from './icons/Apertura';
import ChiusuraIcon from './icons/Chiusura';

interface AttivitaProps {
    responsabiliChiusura: string[];
    responsabiliApertura: string[];
}

const Attivita: React.FC<AttivitaProps> = ({responsabiliApertura, responsabiliChiusura}) => {

    return (
        <div className='attivita'>
            <div className='attivita-icona'>{AperturaIcon}</div>
            <Responsabili responsabili={responsabiliApertura} limite={2} />
            <div className='attivita-icona'>{ChiusuraIcon}</div>
            <Responsabili responsabili={responsabiliChiusura} limite={2} />
        </div>
    );
};

export default Attivita;