import {Fragment} from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import MapRoundedIcon from "@mui/icons-material/MapRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

export const mainListItems = (
  <Fragment>
    <ListItemButton component={Link} to="/denuncias">
      <ListItemIcon>
        <DashboardRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Denúncias" />
    </ListItemButton>
    {/* <ListItemButton component={Link} to="/mapa-dengue">
      <ListItemIcon>
        <MapRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Mapa da dengue" />
    </ListItemButton> */}
    <ListItemButton component={Link} to="/informacoes">
      <ListItemIcon>
        <InfoRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Informações" />
    </ListItemButton>
  </Fragment>
);
