import { withPluginApi } from "discourse/lib/plugin-api";
import { cancel, next } from "@ember/runloop";
import { bind } from "discourse-common/utils/decorators";

export default {
  name: "page-loading",
  
  initialize() {
    withPluginApi("0.8.7", (api) => {
      // Remove ready state while page loading
      api.modifyClass("component:page-loading-slider", {
        pluginId: "page-loading",
        
        @bind
        stateChanged(loading) {
          if (this._deferredStateChange) {
            cancel(this._deferredStateChange);
            this._deferredStateChange = null;
          }
      
          if (loading && this.ready) {
            this.state = "loading";
          } else if (loading) {
            this.state = "loading";
            this._deferredStateChange = next(() => (this.state = "loading"));
          } else {
            this.state = "done";
          }
        }
      });
    });
  },
};
