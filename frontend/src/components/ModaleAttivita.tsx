import React, { useCallback, useMemo, useState } from 'react';
import { Button, Modal, Alert } from 'antd';
import { DateTime } from 'luxon';
import AperturaIcon from './icons/Apertura';
import ChiusuraIcon from './icons/Chiusura';
import { getNomeUtente } from 'src/storage';
import { postAproIo, postChiudoIo, postNonAproIo, postNonChiudoIo } from 'src/api';

interface ModaleAttivitaProps {
    responsabiliApertura: string[];
    responsabiliChiusura: string[];
    giorno: DateTime;
    onCancel: () => void;
}

const ModaleAttivita: React.FC<ModaleAttivitaProps> = ({ responsabiliApertura, responsabiliChiusura, giorno, onCancel }) => {
    const [errore, setErrore] = useState<string | null>(null);

    const sonoResponsabileDellaChiusura = useMemo(() => responsabiliChiusura.indexOf(getNomeUtente() || '') !== -1, [responsabiliChiusura]);
    const sonoResponsabileDellaApertura = useMemo(() => responsabiliApertura.indexOf(getNomeUtente() || '') !== -1, [responsabiliApertura]);

    const onUpdate = useCallback(() => {
        //TODO: non fare refresh ma aggiornare lo stato
        window.location.reload();
    }, []);

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

    const onAproIo = useCallback(async () => {
        post(() => postAproIo(giorno));
    }, [giorno, post]);
    const onChiudoIo = useCallback(async () => {
        post(() => postChiudoIo(giorno));
    }, [giorno, post]);
    const onNonAproIo = useCallback(async () => {
        post(() => postNonAproIo(giorno));
    }, [giorno, post]);
    const onNonChiudoIo = useCallback(async () => {
        post(() => postNonChiudoIo(giorno));
    }, [giorno, post]);
    
    
    let bottoneApertura: JSX.Element;
    if (sonoResponsabileDellaApertura) {
        bottoneApertura = <Button variant='solid' color='danger' onClick={onNonAproIo}>Non apro io</Button>;
    } else {
        bottoneApertura = <Button variant='solid' type='primary' onClick={onAproIo}>Apro io</Button>;
    }

    let bottoneChiusura: JSX.Element;
    if (sonoResponsabileDellaChiusura) {
        bottoneChiusura = <Button variant='solid' color='danger' onClick={onNonChiudoIo}>Non chiudo io</Button>;
    } else {
        bottoneChiusura = <Button variant='solid' type='primary' onClick={onChiudoIo}>Chiudo io</Button>;
    }

    return (
        <Modal
            open={giorno !== null}
            title={`Attività di ${giorno.toFormat("cccc")} ${giorno.toFormat("dd/MM/yyyy")}`}
            onCancel={onCancel}
            footer={[]}>

            {errore && <Alert style={{ marginBottom: "10px" }} message={errore} type="error" showIcon /> }

            <div className='modale-attivita'>
                <div>
                    <div>{AperturaIcon}</div>
                    {!responsabiliApertura || responsabiliApertura.length === 0 ? <div>nessuno</div> : responsabiliApertura.map(x => <div key={x}>{x}</div>)}
                    
                </div>
                <div>
                    <div>{ChiusuraIcon}</div>
                    {!responsabiliChiusura || responsabiliChiusura.length === 0 ? <div>nessuno</div> : responsabiliChiusura.map(x => <div key={x}>{x}</div>)}
                </div>
            </div>
            <div className='modale-attivita-bottoni'>
                <div>{bottoneApertura}</div>
                <div>{bottoneChiusura}</div>
            </div>
        </Modal>
    );
};

export default ModaleAttivita;