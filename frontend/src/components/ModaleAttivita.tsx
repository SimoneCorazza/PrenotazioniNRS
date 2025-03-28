import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { Button, Modal, Alert } from 'antd';
import { DateTime } from 'luxon';
import AperturaIcon from './icons/Apertura';
import ChiusuraIcon from './icons/Chiusura';
import { getNomeUtente } from 'src/services/LocalStorage';
import { postAproIo, postChiudoIo, postModificaStato, postNonAproIo, postNonChiudoIo } from 'src/api';
import StatoAttivitaOrdinaria from 'src/api/StatoAttivitaOrdinaria';

interface ModaleAttivitaProps {
    responsabiliApertura: string[];
    responsabiliChiusura: string[];
    giorno: DateTime;
    stato: StatoAttivitaOrdinaria;
    onCancel: () => void;
    onUpdate: () => void;
}

const ModaleAttivita: React.FC<ModaleAttivitaProps> = ({ responsabiliApertura, responsabiliChiusura, stato, giorno, onCancel, onUpdate }) => {
    const [errore, setErrore] = useState<string | null>(null);

    const sonoResponsabileDellaChiusura = useMemo(() => responsabiliChiusura.indexOf(getNomeUtente() || '') !== -1, [responsabiliChiusura]);
    const sonoResponsabileDellaApertura = useMemo(() => responsabiliApertura.indexOf(getNomeUtente() || '') !== -1, [responsabiliApertura]);

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
    const onGiornoApertura = useCallback(async () => {
        post(() => postModificaStato(giorno, StatoAttivitaOrdinaria.Aperta));
    }, [giorno, post]);
    const onGiornoChiusura = useCallback(async () => {
        post(() => postModificaStato(giorno, StatoAttivitaOrdinaria.Chiusa));
    }, [giorno, post]);
    
    let contenutoModale: JSX.Element;
    if (stato === StatoAttivitaOrdinaria.Aperta) {
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

        contenutoModale = (<>
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
            </>);
    } else {
        contenutoModale = <div className='modale-attivita-bottone-giorno-apertura'>
                <Button variant='solid' color='primary' size='large' onClick={onGiornoApertura}>Giorno di apertura</Button>
            </div>
    }

    let titoloModale: ReactNode;
    if (stato === StatoAttivitaOrdinaria.Aperta) {
        titoloModale = (<div>
            {`Attività di ${giorno.toFormat("cccc")} ${giorno.toFormat("dd/MM/yyyy")}`}
            <Button style={{ marginLeft: "15px" }} variant='solid' color='danger' size='small' onClick={onGiornoChiusura}>Giorno di chiusura</Button>
        </div>);
    } else {
        titoloModale = `Attività di ${giorno.toFormat("cccc")} ${giorno.toFormat("dd/MM/yyyy")}`;
    }

    return (
        <Modal
            open={giorno !== null}
            title={titoloModale}
            onCancel={onCancel}
            footer={[]}>

            {errore && <Alert style={{ marginBottom: "10px" }} message={errore} type="error" showIcon /> }

            {contenutoModale}
        </Modal>
    );
};

export default ModaleAttivita;