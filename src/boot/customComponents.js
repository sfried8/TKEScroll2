import Brothers from "../Brothers";
import Util from "../Util";
import BrotherSelect from "../components/BrotherSelect";
import HelpOverlay from "../components/HelpOverlay";
import gtm from "../gtm.js";

// leave the export, even if you don't use it
export default async ({ app }) => {
  app.component("brother-select", BrotherSelect);
  app.component("help-overlay", HelpOverlay);
  app.config.globalProperties.$brothers = Brothers;
  app.config.globalProperties.$util = Util;
  app.config.globalProperties.$gtm = gtm;
  // something to do
};
