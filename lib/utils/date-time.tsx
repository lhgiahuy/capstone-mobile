export const formatDateTime = (dateTime: string): string => {
  const date = new Date(dateTime);

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padEnd(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes}, ${day}/${month}/${year}`;
};
export const formatDate = (dateTime: string): string => {
  const date = new Date(dateTime);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day} tháng ${month}, ${year}`;
};

export const getDay = (dateTime: string): string => {
  const date = new Date(dateTime);
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}`;
};
export const getMonth = (dateTime: string): string => {
  const date = new Date(dateTime);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `Tháng ${month}`;
};

export const AgedaDateTime = (dateTime: string): string => {
  const date = new Date(dateTime);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
