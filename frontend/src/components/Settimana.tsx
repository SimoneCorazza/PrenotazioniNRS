import { DateTime } from 'luxon';
import React, { useCallback, useMemo, useState } from 'react';
import Giorno from './Giorno';
import ModaleAttivita from './ModaleAttivita';
import AperturaOrdinaria from 'src/api/AperturaOrdinaria';
import PuliziaSede from 'src/api/PuliziaSede';
import Pulizie from './Pulizie';
import { message } from 'antd';
import useCalendarioStore from 'src/hooks/Calendar';
import StatoAttivitaOrdinaria from 'src/api/StatoAttivitaOrdinaria';

interface SettimanaProps {
    lunedi: DateTime;
    oggi: DateTime;
    attivitaOrdinarie: AperturaOrdinaria[];
    puliziaSede: PuliziaSede | undefined;
}

const Settimana: React.FC<SettimanaProps> = ({ lunedi, oggi, attivitaOrdinarie, puliziaSede }) => {
    const [giornoSelezionato, setGiornoSelezionato] = useState<DateTime | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const refetch = useCalendarioStore(store => store.refetch);

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
            stato={a?.stato || StatoAttivitaOrdinaria.Aperta}
            data={d}
            oggi={oggi}
            responsabiliApertura={a?.responsabiliApertura || []}
            responsabiliChiusura={a?.responsabiliChiusura || []}
            onClick={onClick} />;
    }), [lunedi, oggi, trovaAttivitaOrdinaria]);

    const onModaleChiusa = useCallback(() => setGiornoSelezionato(null), [setGiornoSelezionato]);
    const onUpdate = useCallback(async () => {
        setGiornoSelezionato(null);
        await refetch();
        messageApi.success("Attività aggiornate!");
    }, [refetch, messageApi]);

    const modale = useMemo(() => {
        if (!giornoSelezionato) {
            return <></>;
        }

        const a = trovaAttivitaOrdinaria(giornoSelezionato);
        return <ModaleAttivita
            responsabiliApertura={a?.responsabiliApertura || []}
            responsabiliChiusura={a?.responsabiliChiusura || []}
            stato={a?.stato || StatoAttivitaOrdinaria.Aperta}
            giorno={giornoSelezionato}
            onCancel={onModaleChiusa}
            onUpdate={onUpdate}/>;
    }, [giornoSelezionato, trovaAttivitaOrdinaria, onModaleChiusa, onUpdate]);

    return (
        <>
            {contextHolder}
            <div className='settimana'>
                {giorni.map(d => d)}
                {modale}
            </div>
            <Pulizie lunedi={lunedi} responsabiliPuliziaSede={puliziaSede?.responsabili || []} />
        </>
    );
};

export default Settimana;