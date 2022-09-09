export const Response200 = (res: any, json: any) => {
  return res.status(200).json({
    status: true,
    data: json,
  });
};

export const Response201 = (res: any, json: any) => {
  return res.status(201).json({
    status: true,
    data: json,
  });
};

export const Response204 = (res: any) => {
  return res.status(204).json({});
};

export const Response400 = (res: any, message: string) => {
  return res.status(400).json({
    status: false,
    message,
  });
};

export const Response401 = (res: any, message: string) => {
  return res.status(401).json({
    status: false,
    message,
  });
};

export const Response404 = (res: any, message: string) => {
  return res.status(404).json({
    status: false,
    message,
  });
};
