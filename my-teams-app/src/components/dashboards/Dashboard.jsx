import React from "react";
import { BaseDashboard } from "@microsoft/teamsfx-react";

import MeetingIDWidget from "../widgets/MeetingIDWidget";
import TestAuthService from "../widgets/TestAuthService";
import UserWidget from "../widgets/UserWidget";

export default class SampleDashboard extends BaseDashboard {
  layout() {
    return (
      <>
        <MeetingIDWidget />
        <TestAuthService />
        <UserWidget />
      </>
    );
  }
}
