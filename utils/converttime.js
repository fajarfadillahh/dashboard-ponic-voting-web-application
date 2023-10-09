function convertime(time) {
  const now = new Date();
  const dateInstance = new Date(time);

  const diffInMilliseconds = now - dateInstance;

  const daysAgo = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

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

export default convertime;
