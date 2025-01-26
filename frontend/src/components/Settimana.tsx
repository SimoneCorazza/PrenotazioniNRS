import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import AperturaOrdinaria from 'src/pages/AperturaOrdinaria';
import PuliziaSede from 'src/pages/PuliziaSede';

interface SettimanaProps {
    lunedi: DateTime;
    attivitaOrdinarie: AperturaOrdinaria[];
    puliziaSede: PuliziaSede | undefined;
}

const Settimana: React.FC<SettimanaProps> = ({ lunedi, attivitaOrdinarie, puliziaSede }) => {
    const date = useMemo(() => [0, 1, 2, 3, 4, 5, 6].map(i => lunedi.plus({ days: i })), [lunedi]);

    return (
        <div className='settimana'>
            {date.map((d, i) => {
                return (
                    <div key={i} className='settimana-giorno'>
                        <div className='settimana-giorno-numero'>{d.toFormat('dd')}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Settimana;