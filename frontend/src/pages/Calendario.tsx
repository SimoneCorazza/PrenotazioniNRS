import React, { useEffect, useMemo, useState } from 'react';
import { Spin, Typography } from 'antd';
import Settimana from 'src/components/Settimana';
import { DateTime } from 'luxon';
import CalendarioHeader from 'src/components/CalendarioHeader';
import useCalendarioStore from 'src/hooks/Calendar';

const Calendario: React.FC = () => {
	const [errore, setErrore] = useState(false);
	const store = useCalendarioStore();

	const oggi = useMemo(() => DateTime.local(), []);



	const settimane = useMemo(() => {
		if (store.from === null || store.to === null) {
			return [];
		}
		
		const g: DateTime[] = [];

		let it = store.from;
		while (it < store.to) {
			g.push(it);
			it = it.plus({ weeks: 1 });
		}
		return g;
	}, [store.from, store.to]);

	useEffect(() => {
		async function fetchMyAPI() {
			const from = DateTime.local().startOf('week').plus({ weeks: -1 });
			try {
				await store.fetch(from, from.plus({ weeks: 10 }));
			}
			catch {
				setErrore(true);
			}
		}

		fetchMyAPI();
	}, []);


	if (!store.calendario && !errore) {
		return (
			<Spin size='large' fullscreen delay={200} />
		);
	} else if (errore) {
		return (
			<div className='calendario-error'>
				<Typography>Si è verificato un errore nella comunicazione con il server. Assicurarsi di essere connessi ad internet e riprovare</Typography>
			</div>
		);
	}

	return (
		<div className='calendario'>
			<CalendarioHeader />
			{settimane.map(g => (<Settimana
				key={g.year + "-" + g.weekNumber}
				oggi={oggi}
				lunedi={g}
				attivitaOrdinarie={store.calendario?.apertureOrdinarie || []}
				puliziaSede={store.calendario?.pulizieSede?.find(x => x.numeroSettimana === g.weekNumber && x.anno === g.year)}
				/>))}
			
		</div>
		);
};

export default Calendario;