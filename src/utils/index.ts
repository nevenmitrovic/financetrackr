import dayjs from 'dayjs'

export const formatPath = (path: string) => {
	if (path === '/') return 'Home'

	return path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()
}

export function getCurrentMonthYear() {
	return dayjs().format('YYYY-MM')
}
