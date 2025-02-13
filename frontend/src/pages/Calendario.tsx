import React, { useEffect, useMemo, useState } from 'react';
import { Spin } from 'antd';
import Settimana from 'src/components/Settimana';
import { DateTime } from 'luxon';
import CalendarioType from '../api/Calendario';
import { fetchCalendario } from '../api'

const Calendario: React.FC = () => {
	const [dati, setDati] = useState<CalendarioType | null>(null);
	const [errore, setErrore] = useState(false);
	const [from, setFrom] = useState(DateTime.local().startOf('week').plus({ weeks: -1 }));
	const [to, setTo] = useState(from.plus({ weeks: 10 }));

	const oggi = useMemo(() => DateTime.local(), []);

	const giorni = useMemo(() => {
		const g: DateTime[] = [];

		let it = from;
		while (it < to) {
			g.push(it);
			it = it.plus({ weeks: 1 });
		}
		return g;
	}, [from, to]);

	useEffect(() => {
		async function fetchMyAPI() {
			try {
				const res = await fetchCalendario(from, to);
				setDati(res);
			}
			catch {
				setErrore(true);
			}
		}

		fetchMyAPI();
	}, [from, to]);


	if (!dati && !errore) {
		return (
			<Spin size='large' fullscreen delay={200} />
		);
	} else if (errore) {
		return (
			<div className='calendario-error'>
				<h1>Calendario</h1>
				<p>Si è verificato un errore.</p>
			</div>
		);
	}

	return (
		<div className='calendario'>
			<div className='calendario-header'>
				<div className='calendario-header-giorno'>L</div>
				<div className='calendario-header-giorno'>M</div>
				<div className='calendario-header-giorno'>M</div>
				<div className='calendario-header-giorno'>G</div>
				<div className='calendario-header-giorno'>V</div>
				<div className='calendario-header-giorno'>S</div>
				<div className='calendario-header-giorno'>D</div>
			</div>
			{giorni.map(g => (<Settimana
				key={g.year + "-" + g.weekNumber}
				oggi={oggi}
				lunedi={g}
				attivitaOrdinarie={dati?.apertureOrdinarie || []}
				puliziaSede={dati?.pulizieSede?.find(x => x.numeroSettimana === g.weekNumber && x.anno === g.year)}
				/>))}
			
		</div>
		);
};

export default Calendario;