export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString();
};

export const formatTime = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
