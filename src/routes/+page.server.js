export const load = async () => {
	return {
		columns: [
			{
				id: 1,
				label: 'Day 1'
			},
			{
				id: 2,
				label: 'Day 2'
			},
            {
                id: 3,
                label: 'Day3'
            },
            {
                id: 4,
                label: 'Day4'
            },
            {
                id: 5,
                label: 'Day5'
            }
		],
		cards: [
			{
				column: 1,
				id: 'a',
				title: 'Arrive at Taoyuan International Airport'
			},
			{
				column: 2,
				id: 'b',
				title: 'Check into Hotel Proverbs'
			}
		]
	}
};