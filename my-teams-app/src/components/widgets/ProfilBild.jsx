import React, { useEffect } from "react";
import { InitTeamsFx } from "../sso/InitTeamsFx"

const TeamsFxInitializerWidget = () => {
  useEffect(() => {
    // Hier wird deine eigene InitTeamsFx-Funktion aufgerufen
    InitTeamsFx();
  }, []);

  return null; // Das Widget selbst rendert nichts
};

export default TeamsFxInitializerWidget;
