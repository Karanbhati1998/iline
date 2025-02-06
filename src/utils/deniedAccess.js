import { getToken } from "./getToken";

export const denyAccess = (moduleName) => {
  let isValid = false;
  const permission = getToken("ilineLogin", "askedRole");
  if (permission === "All") {
    return true;
  } else if (moduleName == "Sub-Admin Management") {
    return false;
  } else {
    const modulePermission = permission?.permission?.find(
      (item) => item.name === moduleName
    );

    if (modulePermission) {
      isValid = modulePermission.fullAccess || modulePermission.read;
    }
  }
  return isValid;
};

export const canPerformAction = (moduleName) => {
  const permission = getToken("ilineLogin", "askedRole");

  if (permission === "All") {
    return true;
  }

  const modulePermission = permission?.permission?.find(
    (item) => item.name === moduleName
  );

  return modulePermission?.fullAccess ?? false;
};
