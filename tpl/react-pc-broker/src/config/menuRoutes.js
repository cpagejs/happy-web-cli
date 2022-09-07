import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import SystemUser from "@/pages/system/user";
import SystemHoilday from "@/pages/system/hoilday";

const menuList = [
  {
    key: "system",
    label: "系统设置",
    icon: <SettingOutlined />,
    children: [
      {
        key: "/system/user",
        icon: <UserOutlined />,
        label: "用户设置",
        component: SystemUser
      },
      {
        key: "/system/holiday",
        icon: <UserOutlined />,
        label: "假期设置",
        component: SystemHoilday
      },
    ]
  },
];

export default menuList;
