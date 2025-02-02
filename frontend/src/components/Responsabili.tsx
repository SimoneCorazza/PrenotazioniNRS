import React from 'react';

interface ResponsabiliProps {
    /** Elenco di responsabili */
    responsabili: string[] | undefined;
    limite?: number;
}

/**
 * Mostra i responsabili
 */
const Responsabili: React.FC<ResponsabiliProps> = ({ responsabili, limite }) => {
    if (!responsabili || responsabili.length === 0) {
        return <div className='responsabile'>-</div>;
    } else if (!!limite && responsabili.length > limite) {
        return (<>
            {responsabili.slice(0, limite - 1).map(x => <div key={x} className='responsabile'>{x}</div>)}
            <div className='responsabile'>{`e altri ${responsabili.length - limite + 1}`}</div>
        </>);
    } else {
        return (<>
            {responsabili.map(x => <div key={x} className='responsabile'>{x}</div>)}
        </>);
    }
};

export default Responsabili;