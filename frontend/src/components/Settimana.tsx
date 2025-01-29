import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import AperturaOrdinaria from 'src/pages/AperturaOrdinaria';
import PuliziaSede from 'src/pages/PuliziaSede';

interface SettimanaProps {
    lunedi: DateTime;
    oggi: DateTime;
    attivitaOrdinarie: AperturaOrdinaria[];
    puliziaSede: PuliziaSede | undefined;
}

interface Giorno {
    data: DateTime;
    isGiornoCorrente: boolean;
}

const Settimana: React.FC<SettimanaProps> = ({ lunedi, oggi, attivitaOrdinarie, puliziaSede }) => {
    const giorni = useMemo<Giorno[]>(() => [0, 1, 2, 3, 4, 5, 6].map(i =>
        {return {
            data: lunedi.plus({ days: i }),
            isGiornoCorrente: lunedi.plus({ days: i }).hasSame(oggi, 'day'),
        }}), [lunedi, oggi]);
    const isSettimanaCorrente = useMemo(() => lunedi.weekNumber === oggi.weekNumber && lunedi.year === oggi.year, [lunedi, oggi]);

    return (
        <div className={'settimana' + (isSettimanaCorrente ? ' corrente' : '')}>
            {giorni.map(d => {
                return (
                    <div key={d.data.toISODate()} className='settimana-giorno'>
                        <div className={'settimana-giorno-numero' + (d.isGiornoCorrente ? ' corrente' : '')}>{d.data.toFormat('dd')}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Settimana;