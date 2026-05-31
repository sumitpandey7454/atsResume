export const getInitials = (name) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
  })
}

export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  return text.length > maxLength
    ? text.substring(0, maxLength) + '...'
    : text
}

export const cleanJson = (text) => {
  return text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()
}