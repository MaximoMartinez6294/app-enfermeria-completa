import { FaCommentAlt } from "react-icons/fa";
import { MdPersonAdd, MdDashboard  } from "react-icons/md";
import { RiAccountCircleFill  } from "react-icons/ri";



const menu = [
  {
    title: "Panel",
    icon: <MdDashboard />,
    path: "/dashboard",
  },
  {
    title: "Agregar paciente",
    icon: <MdPersonAdd />,
    path: "/add-product",
  },
  {
    title: "Cuenta",
    icon: <RiAccountCircleFill />,
    childrens: [
      {
        title: "Perfil",
        path: "/profile",
      },
      {
        title: "Editar Perfil",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
