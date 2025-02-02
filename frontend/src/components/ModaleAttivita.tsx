import React, { useMemo } from 'react';
import { Button, Modal } from 'antd';
import { DateTime } from 'luxon';
import AperturaIcon from './icons/Apertura';
import ChiusuraIcon from './icons/Chiusura';
import { getNomeUtente } from 'src/storage';

interface ModaleAttivitaProps {
    responsabiliApertura: string[];
    responsabiliChiusura: string[];
    giorno: DateTime;
    onCancel: () => void;
}

const ModaleAttivita: React.FC<ModaleAttivitaProps> = ({ responsabiliApertura, responsabiliChiusura, giorno, onCancel }) => {
    const sonoResponsabileDellaChiusura = useMemo(() => responsabiliChiusura.indexOf(getNomeUtente() || '') !== -1, [responsabiliChiusura]);
    const sonoResponsabileDellaApertura = useMemo(() => responsabiliApertura.indexOf(getNomeUtente() || '') !== -1, [responsabiliApertura]);
    
    let bottoneApertura: JSX.Element;
    if (sonoResponsabileDellaApertura) {
        bottoneApertura = <Button variant='solid' color='danger'>Non apro io</Button>;
    } else {
        bottoneApertura = <Button variant='solid' type='primary'>Apro io</Button>;
    }

    let bottoneChiusura: JSX.Element;
    if (sonoResponsabileDellaChiusura) {
        bottoneChiusura = <Button variant='solid' color='danger'>Non chiudo io</Button>;
    } else {
        bottoneChiusura = <Button variant='solid' type='primary'>Chiudo io</Button>;
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