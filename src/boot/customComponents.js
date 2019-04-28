import Brothers from "../Brothers"
import Util from "../Util"
import BrotherSelect from "../components/BrotherSelect"
import HelpOverlay from "../components/HelpOverlay"
// leave the export, even if you don't use it
export default async ({ Vue }) => {
  Vue.component("brother-select", BrotherSelect)
  Vue.component("help-overlay", HelpOverlay)
  Vue.prototype.$brothers = Brothers;
  Vue.prototype.$util = Util;
  // something to do
}
