import { DateTime } from 'luxon';
import React, { useCallback, useMemo } from 'react';
import AperturaOrdinaria from 'src/pages/AperturaOrdinaria';
import PuliziaSede from 'src/pages/PuliziaSede';
import Attivita from './Attivita';
import Pulizie from './Pulizie';

interface SettimanaProps {
    lunedi: DateTime;
    oggi: DateTime;
    attivitaOrdinarie: AperturaOrdinaria[];
    puliziaSede: PuliziaSede | undefined;
}

interface Giorno {
    data: DateTime;
    isGiornoCorrente: boolean;
    responsabiliAperura: string[];
    responsabiliChiusura: string[];
}

const Settimana: React.FC<SettimanaProps> = ({ lunedi, oggi, attivitaOrdinarie, puliziaSede }) => {
    const giorni = useMemo<Giorno[]>(() => [0, 1, 2, 3, 4, 5, 6].map(i =>
    {
        const d = lunedi.plus({ days: i });
        const a = attivitaOrdinarie.find(x => DateTime.fromFormat(x.giorno, "yyyy-MM-dd").equals(d));
        return {
            data: d,
            isGiornoCorrente: lunedi.plus({ days: i }).hasSame(oggi, 'day'),
            responsabiliAperura: a?.responsabiliApertura || [],
            responsabiliChiusura: a?.responsabiliChiusura || [],
        };
    }), [attivitaOrdinarie, lunedi, oggi]);
    const isSettimanaCorrente = useMemo(() => lunedi.weekNumber === oggi.weekNumber && lunedi.year === oggi.year, [lunedi, oggi]);

    const renderGiorno = useCallback((d: Giorno) => {
        if (d.data.weekday === 7) {
            return <Pulizie responsabiliPuliziaSede={puliziaSede?.responsabili || []} />
        } else if(d.responsabiliAperura.length > 0 && d.responsabiliChiusura.length > 0) {
            return <Attivita
                responsabiliApertura={d.responsabiliAperura}
                responsabiliChiusura={d.responsabiliChiusura}/>;
        } else {
            return <></>;
        }
    }, [puliziaSede?.responsabili])

    return (
        <div className={'settimana' + (isSettimanaCorrente ? ' corrente' : '')}>
            {giorni.map(d => 
                <div key={d.data.toISODate()} className='settimana-giorno'>
                    <div className={'settimana-giorno-numero' + (d.isGiornoCorrente ? ' corrente' : '')}>
                        <span>{d.data.toFormat('dd')}</span>
                    </div>
                    {renderGiorno(d)}
                </div>)}
        </div>
    );
};

export default Settimana;