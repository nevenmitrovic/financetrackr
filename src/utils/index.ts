import type { DataTransformNameType } from '@/types'
import dayjs from 'dayjs'

export const formatPath = (path: string): string => {
	if (path === '/') return 'Home'

	return firstLetterUppercase(path)
}

export function firstLetterUppercase(word: string) {
	if (!word) return ''
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
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

export function removeDuplicatesFromArr(arr: string[]) {
	return [...new Set(arr)]
}

export function toSnakeCase(obj: DataTransformNameType) {
	if (!obj) return undefined

	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key.replace(/([A-Z])/g, '_$1').toLowerCase(), value])
	)
}

export function toCamelCase(obj: DataTransformNameType) {
	if (!obj) return undefined

	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [
			key.replace(/_([a-z])/g, (_, g) => g.toUpperCase()),
			value,
		])
	)
}
