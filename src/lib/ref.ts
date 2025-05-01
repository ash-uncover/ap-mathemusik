
export const getRefCenter = (ref: HTMLElement) => {
  if (ref) {
    const rect = ref.getBoundingClientRect()
    const x = rect.x + rect.width/2
    const y = rect.y + rect.height/2
    return { x, y }
  }
  return {
    x: 0,
    y: 0
  }
}
