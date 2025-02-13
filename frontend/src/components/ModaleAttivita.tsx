import React, { useCallback, useMemo } from 'react';
import { Button, Modal } from 'antd';
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
    const sonoResponsabileDellaChiusura = useMemo(() => responsabiliChiusura.indexOf(getNomeUtente() || '') !== -1, [responsabiliChiusura]);
    const sonoResponsabileDellaApertura = useMemo(() => responsabiliApertura.indexOf(getNomeUtente() || '') !== -1, [responsabiliApertura]);
    const onUpdate = useCallback(() => {
        //TODO: chiamare e fare singola chiamata onCancel();
        window.location.reload();
    }, []);

    const onAproIo = useCallback(async () => {
        await postAproIo(giorno);
        onUpdate();
    }, [giorno, onUpdate]);
    const onChiudoIo = useCallback(async () => {
        await postChiudoIo(giorno);
        onUpdate();
    }, [giorno, onUpdate]);
    const onNonAproIo = useCallback(async () => {
        await postNonAproIo(giorno);
        onUpdate();
    }, [giorno, onUpdate]);
    const onNonChiudoIo = useCallback(async () => {
        await postNonChiudoIo(giorno);
        onUpdate();
    }, [giorno, onUpdate]);
    
    
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
            <div className='modale-attivita'>
                <div>
                    <div>{AperturaIcon}</div>
                    {!responsabiliApertura || responsabiliApertura.length === 0 ? <div>nessuno</div> : responsabiliApertura.map(x => <div>{x}</div>)}
                    
                </div>
                <div>
                    <div>{ChiusuraIcon}</div>
                    {!responsabiliChiusura || responsabiliChiusura.length === 0 ? <div>nessuno</div> : responsabiliChiusura.map(x => <div>{x}</div>)}
                </div>
            </div>
            <div className='modale-bottoni'>
                <div>{bottoneApertura}</div>
                <div>{bottoneChiusura}</div>
            </div>
        </Modal>
    );
};

export default ModaleAttivita;