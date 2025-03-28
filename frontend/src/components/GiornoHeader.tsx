import { DateTime } from 'luxon';
import React from 'react';

interface GiornoHeaderProps {
    isGiornoCorrente: boolean;
    data: DateTime;
}

const GiornoHeader: React.FC<GiornoHeaderProps> = ({ isGiornoCorrente, data }) => {
    return <>
        <div className={'giorno-numero' + (isGiornoCorrente ? ' corrente' : '')}>
            <span>{data.toFormat('dd')}</span>
        </div>
        <div className='giorno-mese'>
            <span>{data.toFormat('MMMM')}</span>
        </div>
    </>;
};

export default GiornoHeader;