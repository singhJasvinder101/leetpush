const getDifficultyClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return 'status-easy'
    case 'medium':
      return 'status-medium'
    case 'hard':
      return 'status-hard'
    default:
      return 'bg-gray-700/50 border-gray-600 text-gray-300'
  }
}

export default getDifficultyClass
