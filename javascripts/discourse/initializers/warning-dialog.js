import { withPluginApi } from "discourse/lib/plugin-api";
import { inject as service } from "@ember/service";

export default {
  name: "discourse-admin-warnings",

  initialize() {
    withPluginApi("0.11.7", (api) => {
      api.modifyClass("controller:topic", {
        pluginId: "discourse-admin-warnings",
        dialog: service(),
        actions: {
          replyToPost(post, skipWarning = false) {
            if (
              (this.get("model.closed") || this.get("model.archived")) &&
              !skipWarning
            ) {
              this.dialog.yesNoConfirm({
                message: settings.reply_warning_message,
                didConfirm: () => {
                  this.send("replyToPost", post, true);
                },
              });
            } else {
              return this._super(post);
            }
          },
        },
      });
    });
  },
};
