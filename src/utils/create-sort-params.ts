import { SortOrder } from 'mongoose'

export const createSortParams = (sort: string) => {
	const [key, value] = sort.split(' ') as [string, SortOrder]

	if (key && value) {
		const sort_params = { [key]: value }
		return sort_params
	}

  return ''
}
