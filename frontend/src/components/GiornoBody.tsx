import React from 'react';
import StatoAttivitaOrdinaria from 'src/api/StatoAttivitaOrdinaria';
import Responsabili from './Responsabili';
import AperturaIcon from './icons/Apertura';
import ChiusuraIcon from './icons/Chiusura';

interface GiornoBodyProps {
    stato: StatoAttivitaOrdinaria;
    responsabiliApertura: string[];
    responsabiliChiusura: string[];
}

const GiornoBody: React.FC<GiornoBodyProps> = ({ stato, responsabiliApertura, responsabiliChiusura }) => {
    if (stato === StatoAttivitaOrdinaria.Chiusa) {
        return <div className='giorno-body-chiusura-container'>
                <span className='giorno-body-chiusura'>CHIUSURA</span>
            </div>;
    } else if (responsabiliApertura.length > 0 || responsabiliChiusura.length > 0) {
        return <>
            <div className='giorno-body'>
                <div className='giorno-body-icona'>{AperturaIcon}</div>
                <Responsabili responsabili={responsabiliApertura} limite={2} />
                <div className='giorno-body-icona'>{ChiusuraIcon}</div>
                <Responsabili responsabili={responsabiliChiusura} limite={2} />
            </div>
        </>
    } else {
        return <></>;
    }
};

export default GiornoBody;