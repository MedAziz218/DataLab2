import { useContext, useState } from "react";
import {
  IconLogout,
  IconCalendar,
  IconUser,
  IconClock as Iconpost,
  IconTextSize as IconTaille,
  IconArrowBack,
  IconSettings
} from "@tabler/icons-react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
  Title,
  Box,
} from "@mantine/core";

import ChangePasswordModal from "components/changepasswordModal";
import logo from "../logo.svg";
import { NavLink } from "react-router-dom";
import { UserButton } from "components/userbutton/userbutton";
import { logoutCall } from "apiCalls";
import { AuthContext } from "context/AuthContext";
import "./mainNavbar.css";
const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: "#333333",
  },

  version: {
    backgroundColor: theme.fn.lighten("white", 0.1),
    color: theme.white,
    fontWeight: 700,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      "white",
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      "white",
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten("white", 0.1),
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: "black",
      [`& .${getStylesRef("icon")}`]: {
        opacity: 0.9,
      },
    },
  },
}));

export function MainNavbar({ data, style }) {
  const { user } = useContext(AuthContext);
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");
  const posteSelection = user.isAdmin
    ? JSON.parse(localStorage.getItem("PosteSelection"))
    : null;
  const links = data.map(
    (item) =>
      !(user.isAdmin && item.link == "/validation") && (
        <NavLink
          to={(user.isAdmin ? "/viewData" : "") + item.link}
          className={({ isActive, isPending }) =>
            classes.link + " " + (isActive ? classes.linkActive : "")
          }
          key={item.label}
          onClick={(event) => {
            // event.preventDefault();
            setActive(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </NavLink>
      )
  );

  return (
    <Navbar
      id="mainNavbar"
      style={style}
      height={"100vh"}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <ChangePasswordModal/>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <img src={logo} className="logo" alt="logo" />

          <Code className={classes.version}>v1.0</Code>
        </Group>
        {links}
      </Navbar.Section>

      {posteSelection && (
        <Navbar.Section className={classes.footer}>
          <NavLink
            className={({ isActive, isPending }) =>
              classes.link + " " +  classes.linkActive
            }
            to="/consultation"
            onClick={(event) => {}}
          >
            <IconArrowBack className={classes.linkIcon} stroke={1.5} />
            <span>{"Retourner "}</span>
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              classes.link + " " 
            }
            to="#"
            onClick={(event) => {}}
          >
            <IconUser className={classes.linkIcon} stroke={1.5} />
            <span>{"Remplis par: " + posteSelection.username}</span>
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              classes.link + " " 
            }
            to="#"
            onClick={(event) => {}}
          >
            <IconCalendar className={classes.linkIcon} stroke={1.5} />
            <span>{"Date: " + posteSelection.selectedDate}</span>
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              classes.link + " " 
            }
            to="#"
            onClick={(event) => {}}
          >
            <Iconpost className={classes.linkIcon} stroke={1.5} />
            <span>{"Poste: " + posteSelection.selectedPoste}</span>
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              classes.link + " " 
            }
            to="#"
            onClick={(event) => {}}
          >
            <IconTaille className={classes.linkIcon} stroke={1.5} />
            <span>{"Taille: " + posteSelection.selectedTaille}</span>
          </NavLink>
        </Navbar.Section>
      )}
      <Navbar.Section className={classes.footer}>
        <Box sx={{display:"flex", alignItems:"center"}}>

        <UserButton
          className={classes.link}
          // image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name={user.username}
          email="utilisateur"
        />
       {!user.isAdmin && <a
        style={{marginRight:"auto"}}
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            
            
          }}
          >
        <IconSettings style={{marginRight:"auto",marginLeft:"auto"}} className={classes.linkIcon} stroke={1.5}/>
        </a>  }      
        </Box>
        {/* <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a> */}

        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            logoutCall();
            window.location = "/";
          }}
        >
          
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
