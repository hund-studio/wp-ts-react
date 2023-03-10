import _ from "lodash";

const getServerData = (elementId: string) => {
  try {
    const dataElement = document.getElementById(elementId);

    if (!dataElement?.textContent) {
      throw `#${elementId} not found`;
    }

    return JSON.parse(dataElement.textContent);
  } catch (e) {
    if (_.isString(e)) {
      console.warn(e);
    } else {
      console.error(e);
    }

    return undefined;
  }
};

export { getServerData };
