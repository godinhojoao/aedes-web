import {Fragment} from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import MapRoundedIcon from "@mui/icons-material/MapRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InfoRounded from "@mui/icons-material/InfoRounded";

export const mainListItems = (
  <Fragment>
    <ListItemButton component={Link} to="/denuncias">
      <ListItem>
        <DashboardRoundedIcon />
      </ListItem>
      <ListItemText primary="Denúncias" />
    </ListItemButton>
    {/* <ListItemButton component={Link} to="/mapa-dengue">
      <ListItem>
        <MapRoundedIcon />
      </ListItem>
      <ListItemText primary="Mapa da dengue" />
    </ListItemButton> */}
    <ListItemButton component={Link} to="/informacoes">
      <ListItem>
        <InfoRounded />
      </ListItem>
      <ListItemText primary="Informações" />
    </ListItemButton>
  </Fragment>
);
