export const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    const timeString = `${hour.toString().padStart(2, '0')}:00`;
    options.push(timeString);
  }
  return options;
};

export const formatTime = (time: string) => {
  const [hours] = time.split(':');
  return `${hours}:00`;
}; 