import { useIntl as intlHook } from "react-intl";

export const translate = (id = "空") => {
  const intl = intlHook();
  return intl.formatMessage({ id });
};

//翻译字典枚举
export const transLateDicts = (dicts = []) => {
  return dicts.map(({ label, ...rest }) => ({ label: translate(label), ...rest }));
};