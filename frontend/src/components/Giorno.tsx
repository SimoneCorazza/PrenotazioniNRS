import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import GiornoHeader from './GiornoHeader';
import StatoAttivitaOrdinaria from 'src/api/StatoAttivitaOrdinaria';
import GiornoBody from './GiornoBody';

interface GiornoProps {
    stato: StatoAttivitaOrdinaria;
    data: DateTime;
    oggi: DateTime;
    responsabiliApertura: string[];
    responsabiliChiusura: string[];
    onClick: (data: DateTime) => void;
}

const Giorno: React.FC<GiornoProps> = ({ data, oggi, stato, responsabiliApertura, responsabiliChiusura, onClick }) => {
    const isGiornoCorrente = useMemo<boolean>(() => data.hasSame(oggi, "day"), [data, oggi]);
    const isGiornoAttivitaOrdinaria = useMemo<boolean>(() => data.weekday === 2 || data.weekday === 5, [data]);
    const isMeseDispari = useMemo<boolean>(() => data.month % 2 === 1, [data]);

    let css: string[] = ['giorno'];
    if (isGiornoAttivitaOrdinaria) {
        css.push('giorno-attivita-ordinaria');
    }

    if (isMeseDispari) {
        css.push("giorno-mese-dispari");
    }

    return <div key={data.toISODate()} className={css.join(' ')} onClick={() => onClick(data)}>
        <div>
            <GiornoHeader data={data} isGiornoCorrente={isGiornoCorrente} />
        </div>
        <GiornoBody stato={stato} responsabiliApertura={responsabiliApertura} responsabiliChiusura={responsabiliChiusura} />
    </div>;
};

export default Giorno;