function convertTimeCreatedAt(time) {
  const now = new Date();
  const dateInstance = new Date(time);

  const diffInMilliseconds = now - dateInstance;

  const daysAgo = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

  const year = dateInstance.getFullYear();
  const month = dateInstance.getMonth() + 1;
  const date = dateInstance.getDate();
  const hours = dateInstance.getHours();
  const minutes = dateInstance.getMinutes();

  if (daysAgo === 0) {
    return "today";
  } else if (daysAgo === 1) {
    return "1 day ago";
  } else if (daysAgo >= 7) {
    return `${date < 10 ? `0${date}` : date}/${
      month < 10 ? `0${month}` : month
    }/${year} ${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  } else {
    return daysAgo + " days ago";
  }
}

function convertTimeLastLogin(time) {
  const now = new Date();
  const dateInstance = new Date(time);

  const diffInMilliseconds = now - dateInstance;

  const minutesAgo = Math.round(diffInMilliseconds / (1000 * 60));

  const year = dateInstance.getFullYear();
  const month = dateInstance.getMonth() + 1;
  const date = dateInstance.getDate();
  const hours = dateInstance.getHours();
  const minutes = dateInstance.getMinutes();

  if (minutesAgo < 1) {
    return "now";
  } else if (minutesAgo === 1) {
    return "1 minute ago";
  } else if (minutesAgo === 2) {
    return "2 minutes ago";
  } else if (minutesAgo >= 60) {
    const hoursAgo = Math.round(minutesAgo / 60);
    if (hoursAgo === 1) {
      return "one hour ago";
    } else if (hoursAgo >= 24) {
      return `${date < 10 ? `0${date}` : date}/${
        month < 10 ? `0${month}` : month
      }/${year} ${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`;
    } else {
      return hoursAgo + " hours ago";
    }
  } else {
    return minutesAgo + " minutes ago";
  }
}

function convertTimeRooms(time) {
  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  const dateInstance = new Date(time);
  const year = dateInstance.getFullYear();
  const month = dateInstance.getMonth() + 1;
  const day = dateInstance.getDay();
  const date = dateInstance.getDate();
  const hours = dateInstance.getHours();
  const minutes = dateInstance.getMinutes();

  return `${days[day]} ${date < 10 ? `0${date}` : date}/${
    month < 10 ? `0${month}` : month
  }/${year} ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

export { convertTimeCreatedAt, convertTimeLastLogin, convertTimeRooms };
