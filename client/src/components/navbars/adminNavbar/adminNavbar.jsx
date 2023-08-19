import { useContext, useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
} from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons-react";
import logo from "../logo.svg";
import {  NavLink } from "react-router-dom";
import { UserButton } from "components/userbutton/userbutton";
import { logoutCall } from "apiCalls";
import { AuthContext } from "context/AuthContext";


const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.grape[7],
  },

  version: {
    backgroundColor: theme.fn.lighten(
      theme.colors.grape[7],
      0.1
    ),
    color: theme.white,
    fontWeight: 700,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.colors.grape[7],
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.colors.grape[7],
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.colors.grape[7],
        0.1
      ),
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(
        theme.colors.grape[7],
        0.15
      ),
      [`& .${getStylesRef('icon')}`]: {
        opacity: 0.9,
      },
    },
  },
}));

const data = [
  { link: '', label: 'Controle des utilisateurs', icon: IconBellRinging },
  { link: '', label: 'Consulter une fiche', icon: IconReceipt2 },
  { link: '', label: 'Graphes', icon: IconFingerprint },
  // { link: '', label: 'SSH Keys', icon: IconKey },
  // { link: '', label: 'Databases', icon: IconDatabaseImport },
  // { link: '', label: 'Authentication', icon: Icon2fa },
  // { link: '', label: 'Other Settings', icon: IconSettings },
];


export function AdminNavbar({style}) {
  const {user} = useContext(AuthContext)
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <NavLink to={item.link}
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        // event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Navbar
    style={style}
      height={"100vh"}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <img src={logo} className="logo" alt="logo" />

          <Code className={classes.version}>v1.0</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton className={classes.link}
          // image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name={user.username}
          email="ADMIN"
        />
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
          onClick={(event) => {event.preventDefault();logoutCall();window.location = "/"}}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
