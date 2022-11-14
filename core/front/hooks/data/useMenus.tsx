import { fetcher } from "./../../utils/fetcher";
import useSWR from "swr";

const useMenus = () => {
  const { data, error } = useSWR<{ [key: string]: MenuItem[] }>(
    `/${API_NAMESPACE}/menus`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export { useMenus };
