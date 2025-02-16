import { DateTime } from 'luxon';
import React, { MouseEventHandler, useCallback, useMemo, useState } from 'react';
import Giorno from './Giorno';
import ModaleAttivita from './ModaleAttivita';
import AperturaOrdinaria from 'src/api/AperturaOrdinaria';
import PuliziaSede from 'src/api/PuliziaSede';

interface SettimanaProps {
    lunedi: DateTime;
    oggi: DateTime;
    attivitaOrdinarie: AperturaOrdinaria[];
    puliziaSede: PuliziaSede | undefined;
}



const Settimana: React.FC<SettimanaProps> = ({ lunedi, oggi, attivitaOrdinarie, puliziaSede }) => {
    const [giornoSelezionato, setGiornoSelezionato] = useState<DateTime | null>(null);

    const trovaAttivitaOrdinaria = useCallback((d: DateTime): AperturaOrdinaria | undefined => {
        return attivitaOrdinarie.find(x => DateTime.fromFormat(x.giorno, "yyyy-MM-dd").equals(d));
    }, [attivitaOrdinarie]);

    const giorni = useMemo<JSX.Element[]>(() => [0, 1, 2, 3, 4, 5, 6].map(i =>
    {
        const d = lunedi.plus({ days: i });
        const a = trovaAttivitaOrdinaria(d);

        let onClick = () => {};
        if (d.weekday === 2 || d.weekday === 5) {
            onClick = () => setGiornoSelezionato(d);
        }

        return <Giorno
            key={i}
            data={d}
            oggi={oggi}
            responsabiliApertura={a?.responsabiliApertura || []}
            responsabiliChiusura={a?.responsabiliChiusura || []}
            onClick={onClick} />;
    }), [lunedi, oggi, trovaAttivitaOrdinaria]);

    const onModaleChiusa = useCallback(() => setGiornoSelezionato(null), [setGiornoSelezionato]);

    const modale = useMemo(() => {
        if (!giornoSelezionato) {
            return <></>;
        }

        const a = trovaAttivitaOrdinaria(giornoSelezionato);
        return <ModaleAttivita
            responsabiliApertura={a?.responsabiliApertura || []}
            responsabiliChiusura={a?.responsabiliChiusura || []}
            giorno={giornoSelezionato}
            onCancel={onModaleChiusa}/>;
    }, [giornoSelezionato, trovaAttivitaOrdinaria, onModaleChiusa]);

    return (
        <div className='settimana'>
            {giorni.map(d => d)}
            {modale}
        </div>
    );
};

export default Settimana;