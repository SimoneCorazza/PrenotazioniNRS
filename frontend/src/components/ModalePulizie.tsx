import { Alert, Button, Modal } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import CleanIcon from './icons/Clean';
import { postNonPuliscoIo, postPuliscoIo } from 'src/api';
import { getNomeUtente } from 'src/services/LocalStorage';
import { DateTime } from 'luxon';
import useCalendarioStore from 'src/hooks/Calendar';

interface ModalePulizieProps {
    /** Lunedì di inizio settimana */
    lunedi: DateTime;
    responsabili: string[];
    onClose: () => void;
}


const ModalePulizie: React.FC<ModalePulizieProps> = ({ lunedi, responsabili, onClose }) => {
    const [errore, setErrore] = useState<string | null>(null);
    const refetch = useCalendarioStore(store => store.refetch);

    const sonoResponsabileDellePulizie = useMemo(() => responsabili.indexOf(getNomeUtente() || '') !== -1, [responsabili]);

    const sabato = useMemo<string>(() => lunedi.plus({ days: 5 }).toFormat("EEEE dd MMMM"), [lunedi]);
    const lunediProssimo = useMemo<string>(() => lunedi.plus({ days: 7 }).toFormat("EEEE dd MMMM"), [lunedi]);
    
    const onUpdate = useCallback(async () => {
        await refetch();
    }, [refetch]);

    const post = useCallback(async (fn: () => Promise<ApiResponse>) => {
        try {
            const response = await fn();
            if (response?.Errori?.length == null || response.Errori.length === 0) {
                onUpdate();
            } else {
                setErrore(response.Errori.join(", "));
            }
        }
        catch(err) {
            setErrore("Errore nella comunicazione con il server. Aggiornare la pagina e riprovare.");
        }
    }, [onUpdate, setErrore]);

    const onPuliscoIo = useCallback(() => {
        post(() => postPuliscoIo(lunedi.weekNumber, lunedi.year));
    }, [lunedi.weekNumber, lunedi.year, post]);
    const onNonPuliscoIo = useCallback(() => {
        post(() => postNonPuliscoIo(lunedi.weekNumber, lunedi.year));
    }, [lunedi.weekNumber, lunedi.year, post]);

    let bottoneApertura: JSX.Element;
    if (sonoResponsabileDellePulizie) {
        bottoneApertura = <Button key={1} variant='solid' color='danger' onClick={onNonPuliscoIo}>Non pulisco io</Button>;
    } else {
        bottoneApertura = <Button key={1} variant='solid' color='primary' onClick={onPuliscoIo}>Pulisco io</Button>;
    }

    return <Modal
        open
        title={`Pulizie della settimana n° ${lunedi.weekNumber}`}
        onCancel={onClose}
        footer={[bottoneApertura]}>

        {errore && <Alert style={{ marginBottom: "10px" }} message={errore} type="error" showIcon /> }

        <div className='modale-pulizie'>
            <div>
                <div className=''>{CleanIcon}</div>
                {!responsabili || responsabili.length === 0 ? <div>nessuno</div> : responsabili.map(x => <div key={x}>{x}</div>)}
            </div>
        </div>

        <Alert style={{ marginBottom: "10px" }} message={`Le pulizie sono da effettuarsi tra ${sabato} e ${lunediProssimo}`} type="info" showIcon />
    </Modal>;
};

export default ModalePulizie;