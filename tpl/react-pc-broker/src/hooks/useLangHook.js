import { useIntl } from "react-intl";

export default function useLangHook(id) {

  const intl = useIntl();

  return intl.formatMessage({ id: id });
}