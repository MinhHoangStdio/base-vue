export const groupByStatus = (items) => {
  const groupedData = {
    created: [],
    in_progress: [],
    done: [],
    close: [],
  };

  items.forEach((item) => {
    const { status } = item;

    if (groupedData[status]) {
      groupedData[status].push(item);
    } else {
      groupedData[status] = [item];
    }
  });

  return Object.entries(groupedData).map(([label_status, events]) => ({
    label_status,
    events,
  }));
};

export const convertDateFirebase = (createdAt) => {
  const date = new Date(
    createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
  );

  // Lấy các giá trị ngày, tháng, năm
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Tạo chuỗi ngày/tháng/năm
  const formattedDate = ` ${day}/${month}/${year} at ${hours}:${minutes} `;
  return formattedDate;
};
