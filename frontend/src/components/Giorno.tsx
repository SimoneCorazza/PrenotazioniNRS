import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import Attivita from './Attivita';

interface GiornoProps {
    data: DateTime;
    oggi: DateTime;
    responsabiliApertura: string[];
    responsabiliChiusura: string[];
    onClick: (data: DateTime) => void;
}

const Giorno: React.FC<GiornoProps> = ({ data, oggi, responsabiliApertura, responsabiliChiusura, onClick }) => {
    const isGiornoCorrente = useMemo<boolean>(() => data.hasSame(oggi, "day"), [data, oggi]);
    const isGiornoAttivitaOrdinaria = useMemo<boolean>(() => data.weekday === 2 || data.weekday === 5, [data]);
    const isMeseDispari = useMemo<boolean>(() => data.month % 2 === 1, [data]);

    const componenteGiornata = useMemo(() => {
        if (responsabiliApertura.length > 0 || responsabiliChiusura.length > 0) {
            return <Attivita
                responsabiliApertura={responsabiliApertura}
                responsabiliChiusura={responsabiliChiusura}/>;
        } else {
            return <></>;
        }
    }, [responsabiliApertura, responsabiliChiusura]);

    let css: string[] = ['giorno'];
    if (isGiornoAttivitaOrdinaria) {
        css.push('giorno-attivita-ordinaria');
    }

    if (isMeseDispari) {
        css.push("giorno-mese-dispari");
    }

    return <div key={data.toISODate()} className={css.join(' ')} onClick={() => onClick(data)}>
        <div className={'giorno-numero' + (isGiornoCorrente ? ' corrente' : '')}>
            <span>{data.toFormat('dd')}</span>
        </div>
        <div className='giorno-mese'>
            <span>{data.toFormat('MMMM')}</span>
        </div>
        {componenteGiornata}
    </div>;
};

export default Giorno;