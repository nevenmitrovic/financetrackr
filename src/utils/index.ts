import dayjs from 'dayjs'

export const formatPath = (path: string): string => {
	if (path === '/') return 'Home'

	return path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()
}

export function getCurrentMonthYear(): string {
	return dayjs().format('YYYY-MM')
}

export function sum(...args: number[]): number {
	return args.reduce((prev, curr) => prev + curr, 0)
}

export function getPercentageOfSum(individualSum: number, totalSum: number): number {
	return (individualSum / totalSum) * 100
}
