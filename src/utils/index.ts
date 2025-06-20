const MOBILE_BREAKPOINT = 768

export function isMobile(): boolean {
	if (typeof window === 'undefined') {
		return false
	}

	return window.innerWidth < MOBILE_BREAKPOINT
}
