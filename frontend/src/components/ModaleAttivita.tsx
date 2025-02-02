import React from 'react';
import { Button, Modal } from 'antd';
import { DateTime } from 'luxon';
import AperturaIcon from './icons/Apertura';
import ChiusuraIcon from './icons/Chiusura';

interface ModaleAttivitaProps {
    responsabiliApertura: string[];
    responsabiliChiusura: string[];
    giorno: DateTime;
    onCancel: () => void;
}

const ModaleAttivita: React.FC<ModaleAttivitaProps> = ({ responsabiliApertura, responsabiliChiusura, giorno, onCancel }) => {
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
                <div><Button type='primary'>Apro io</Button></div>
                <div><Button type='primary'>Chiudo io</Button></div>
            </div>
        </Modal>
    );
};

export default ModaleAttivita;