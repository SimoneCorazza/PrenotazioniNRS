import { DateTime } from 'luxon';
import React, { MouseEventHandler, useCallback, useMemo, useState } from 'react';
import Attivita from './Attivita';
import Pulizie from './Pulizie';
import ModaleAttivita from './ModaleAttivita';
import AperturaOrdinaria from 'src/api/AperturaOrdinaria';
import PuliziaSede from 'src/api/PuliziaSede';

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
    isGiornoAttivitaOrdinaria: boolean;
}

const Settimana: React.FC<SettimanaProps> = ({ lunedi, oggi, attivitaOrdinarie, puliziaSede }) => {
    const [giornoSelezionato, setGiornoSelezionato] = useState<DateTime | null>(null);

    const giorni = useMemo<Giorno[]>(() => [0, 1, 2, 3, 4, 5, 6].map(i =>
    {
        const d = lunedi.plus({ days: i });
        const a = attivitaOrdinarie.find(x => DateTime.fromFormat(x.giorno, "yyyy-MM-dd").equals(d));
        return {
            data: d,
            isGiornoCorrente: lunedi.plus({ days: i }).hasSame(oggi, 'day'),
            responsabiliAperura: a?.responsabiliApertura || [],
            responsabiliChiusura: a?.responsabiliChiusura || [],
            isGiornoAttivitaOrdinaria: d.weekday === 2 || d.weekday === 5,
        };
    }), [attivitaOrdinarie, lunedi, oggi]);

    const isSettimanaCorrente = useMemo(() => lunedi.weekNumber === oggi.weekNumber && lunedi.year === oggi.year, [lunedi, oggi]);

    const renderGiorno = useCallback((d: Giorno) => {
        if (d.data.weekday === 7) {
            return <Pulizie responsabiliPuliziaSede={puliziaSede?.responsabili || []} />
        } else if(d.responsabiliAperura.length > 0 || d.responsabiliChiusura.length > 0) {
            return <Attivita
                responsabiliApertura={d.responsabiliAperura}
                responsabiliChiusura={d.responsabiliChiusura}/>;
        } else {
            return <></>;
        }
    }, [puliziaSede?.responsabili])

    const onClickGiorno = useCallback((g: Giorno): MouseEventHandler | undefined =>  {
        if (!g.isGiornoAttivitaOrdinaria) {
            return undefined;
        }

        return () => setGiornoSelezionato(g.data);
    }, []);

    const onModaleChiusa = useCallback(() => setGiornoSelezionato(null), [setGiornoSelezionato]);

    const modale = useMemo(() => {
        if (!giornoSelezionato) {
            return <></>;
        }

        const g = giorni.find(x => x.data.weekday === giornoSelezionato.weekday);
        return <ModaleAttivita
            responsabiliApertura={g?.responsabiliAperura || []}
            responsabiliChiusura={g?.responsabiliChiusura || []}
            giorno={giornoSelezionato}
            onCancel={onModaleChiusa}/>;
    }, [giornoSelezionato, giorni, onModaleChiusa])

    return (
        <div className={'settimana' + (isSettimanaCorrente ? ' corrente' : '')}>
            {giorni.map(d => 
                <div key={d.data.toISODate()} className='settimana-giorno' onClick={onClickGiorno(d)}>
                    <div className={'settimana-giorno-numero' + (d.isGiornoCorrente ? ' corrente' : '')}>
                        <span>{d.data.toFormat('dd')}</span>
                    </div>
                    {renderGiorno(d)}
                </div>)}
            {modale}
        </div>
    );
};

export default Settimana;