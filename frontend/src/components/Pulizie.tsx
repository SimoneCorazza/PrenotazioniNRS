import React, { useCallback, useMemo, useState } from 'react';
import CleanIcon from './icons/Clean';
import ModalePulizie from './ModalePulizie';
import { DateTime } from 'luxon';
import { Button } from 'antd';
import ApriModale from './icons/ApriModale';

interface PulizieProps {
    /** Lunedì di inizio settimana */
    lunedi: DateTime;
    responsabiliPuliziaSede: string[];
}

const Pulizie: React.FC<PulizieProps> = ({lunedi, responsabiliPuliziaSede}) => {
    const [mostraModale, setMostraModale] = useState<boolean>(false);

    const responsabili = useMemo<string>(() => {
        if (!responsabiliPuliziaSede || responsabiliPuliziaSede.length === 0) {
            return '-';
        } else {
            return responsabiliPuliziaSede.join(', ');
        }
    }, [responsabiliPuliziaSede]);

    const onClick = useCallback(() => {
        setMostraModale(true);
    }, [setMostraModale]);

    return <>
        <div className='pulizie'>
            <span className='pulizie-icona'>{CleanIcon}</span>
            <span>{responsabili}</span>
            <Button style={{marginLeft: "10px"}} size='small' onClick={onClick} icon={<ApriModale/>}>
                Detaglio
            </Button>
            
            
        </div>
        {mostraModale && <ModalePulizie lunedi={lunedi} responsabili={responsabiliPuliziaSede} onClose={() => setMostraModale(false)} />}
    </>;
};

export default Pulizie;